import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, FilePenLine, ScrollText } from 'lucide-react';
import { Brand } from '@/components/brand';

const cards = [
  {
    href: '/docs',
    icon: ScrollText,
    title: 'Read the docs',
    description: 'Browse product guides, hardware references, and setup walkthroughs.',
  },
  {
    href: '/docs/contributors/contributing',
    icon: FilePenLine,
    title: 'Start contributing',
    description: 'Open the writer-friendly contributor guide and jump straight into edits.',
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16 sm:px-10">
      <div className="max-w-4xl">
        <div className="mb-6">
          <Brand />
        </div>
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance text-black sm:text-6xl">
          Product docs that are easy to read and easy to improve.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-black/70">
          This branch ports the site to Fumadocs while keeping the actual writing workflow simple:
          open the repo, run one script, edit files in <code>docs/</code>, and keep moving.
        </p>
      </div>

      <div className="mt-10 flex items-center gap-4 rounded-[2rem] border border-black/10 bg-white/75 p-4 shadow-[0_18px_50px_rgba(90,72,45,0.08)] backdrop-blur sm:w-fit">
        <div className="relative size-16 overflow-hidden rounded-2xl border border-black/8 bg-[#eafafc]">
          <Image
            src="/rd-mark.png"
            alt="Research and Desire mark"
            fill
            sizes="64px"
            className="object-contain p-1"
            priority
          />
        </div>
        <p className="max-w-md text-sm leading-6 text-black/70 sm:text-base">
          The docs now use the same simple R+D mark as the main brand system, so the experience
          feels more connected to the rest of the site.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {cards.map(({ href, icon: Icon, title, description }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-3xl border border-black/10 bg-white/85 p-6 shadow-[0_18px_60px_rgba(90,72,45,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(90,72,45,0.14)]"
          >
            <Icon className="mb-5 size-8 text-[#8a4f2b]" />
            <h2 className="text-2xl font-semibold text-black">{title}</h2>
            <p className="mt-3 text-base leading-7 text-black/70">{description}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#8a4f2b]">
              Open
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
