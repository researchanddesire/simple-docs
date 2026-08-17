import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const contentRoot = path.resolve(process.argv[2] ?? "content");
const failures = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(target)));
    else files.push(target);
  }
  return files;
}

function fail(file, message) {
  failures.push(`${path.relative(process.cwd(), file)}: ${message}`);
}

function candidateExists(fromFile, rawTarget, allowExtensionless = false) {
  const withoutSuffix = rawTarget.split(/[?#]/, 1)[0];
  if (!withoutSuffix) return true;
  let decoded;
  try {
    decoded = decodeURIComponent(withoutSuffix);
  } catch {
    return false;
  }

  // Extensionless links are application routes in Fumadocs and cannot be
  // resolved reliably without the private renderer's route manifest.
  if (!path.extname(decoded) && !allowExtensionless) return true;

  const target = path.resolve(path.dirname(fromFile), decoded);
  const targetRelative = path.relative(contentRoot, target);
  if (targetRelative.startsWith("..") || path.isAbsolute(targetRelative)) return false;
  return [
    target,
    `${target}.md`,
    `${target}.mdx`,
    path.join(target, "index.md"),
    path.join(target, "index.mdx"),
  ].some(existsSync);
}

function validateFrontmatter(file, source) {
  if (!source.startsWith("---\n") && !source.startsWith("---\r\n")) {
    fail(file, "missing YAML frontmatter");
    return;
  }
  const lines = source.split(/\r?\n/);
  const closing = lines.findIndex((line, index) => index > 0 && line.trim() === "---");
  if (closing < 0) {
    fail(file, "frontmatter is not closed");
    return;
  }
  const title = lines
    .slice(1, closing)
    .map((line) => line.match(/^\s*title\s*:\s*(.*)$/)?.[1]?.trim())
    .find((value) => value !== undefined);
  if (!title || /^(?:["']{2}|null|~)$/i.test(title)) {
    fail(file, "frontmatter must include a non-empty title");
  }
}

function validateLinks(file, source) {
  const searchable = source.replace(/```[\s\S]*?```/g, "");
  const targets = [];
  for (const match of searchable.matchAll(/!?\[[^\]]*\]\((<[^>]+>|[^\s)]+)(?:\s+["'][^"']*["'])?\)/g)) {
    targets.push(match[1].replace(/^<|>$/g, ""));
  }
  for (const match of searchable.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
    targets.push(match[1]);
  }
  for (const match of searchable.matchAll(/^\s*\[[^\]]+\]:\s*(?:<([^>]+)>|(\S+))/gm)) {
    targets.push(match[1] ?? match[2]);
  }
  for (const match of searchable.matchAll(/\bfrom\s+["'](\.[^"']+)["']/g)) {
    targets.push(match[1]);
  }

  for (const target of targets) {
    if (
      /^(?:[a-z][a-z+.-]*:|#|\/)/i.test(target) ||
      target.includes("{") ||
      target.includes("}")
    ) {
      continue;
    }
    if (!candidateExists(file, target)) fail(file, `missing local target "${target}"`);
  }
}

function validateMeta(file, source) {
  let meta;
  try {
    meta = JSON.parse(source);
  } catch (error) {
    fail(file, `invalid JSON: ${error instanceof Error ? error.message : String(error)}`);
    return;
  }

  for (const page of Array.isArray(meta.pages) ? meta.pages : []) {
    if (
      typeof page !== "string" ||
      /^(?:---|\.\.\.)/.test(page) ||
      page.includes("](")
    ) {
      continue;
    }
    if (!candidateExists(file, page, true)) fail(file, `missing page entry "${page}"`);
  }
}

if (!existsSync(contentRoot)) {
  console.error(`Content root does not exist: ${contentRoot}`);
  process.exit(1);
}

for (const file of await walk(contentRoot)) {
  const source = await readFile(file, "utf8");
  if (/\.mdx?$/.test(file)) {
    validateFrontmatter(file, source);
    validateLinks(file, source);
  } else if (path.basename(file) === "meta.json") {
    validateMeta(file, source);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Validated documentation content under ${path.relative(process.cwd(), contentRoot)}.`);
