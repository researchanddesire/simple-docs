import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const contentRoot = resolve(process.argv[2] ?? resolve(scriptDirectory, '../content'));
const errors = [];
let documentCount = 0;
let imageCount = 0;

for (const file of await walk(contentRoot)) {
  if (!/\.mdx?$/.test(file)) continue;
  documentCount += 1;
  const source = await readFile(file, 'utf8');
  const displayPath = relative(contentRoot, file);

  for (const match of source.matchAll(
    /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi,
  )) {
    errors.push(
      `Unsupported raw image in ${displayPath}:${lineForOffset(source, match.index)}: ${match[1]}. Use Markdown image syntax so Fumadocs imports the asset.`,
    );
  }

  for (const match of source.matchAll(
    /!\[[^\]]*\]\(\s*(?:<([^>\n]+)>|([^\s)\n]+))/g,
  )) {
    const target = match[1] ?? match[2];
    if (/^(?:[a-z][a-z\d+.-]*:|#)/i.test(target)) continue;

    imageCount += 1;
    if (target.startsWith('/')) {
      errors.push(
        `Root-relative image in ${displayPath}:${lineForOffset(source, match.index)}: ${target}. Use a content-relative path so Fumadocs imports the asset.`,
      );
      continue;
    }

    let decodedTarget;
    try {
      decodedTarget = decodeURIComponent(target.split(/[?#]/, 1)[0]);
    } catch {
      errors.push(
        `Invalid image path in ${displayPath}:${lineForOffset(source, match.index)}: ${target}`,
      );
      continue;
    }

    const assetPath = resolve(dirname(file), decodedTarget);
    const assetRelativePath = relative(contentRoot, assetPath);
    if (
      assetRelativePath === '..' ||
      assetRelativePath.startsWith(`..${sep}`) ||
      isAbsolute(assetRelativePath)
    ) {
      errors.push(
        `Image escapes the synced content tree in ${displayPath}:${lineForOffset(source, match.index)}: ${target}`,
      );
      continue;
    }

    try {
      if (!(await stat(assetPath)).isFile()) throw new Error('not a file');
    } catch {
      errors.push(
        `Missing image in ${displayPath}:${lineForOffset(source, match.index)}: ${target}`,
      );
    }
  }
}

if (errors.length > 0) {
  process.stderr.write(`${errors.join('\n')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(
    `Verified ${imageCount} local image references across ${documentCount} documentation pages.\n`,
  );
}

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

function lineForOffset(source, offset) {
  return source.slice(0, offset).split('\n').length;
}
