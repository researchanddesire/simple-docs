import Image from 'next/image';
import Link from 'next/link';
import { appName } from '@/lib/shared';

type BrandProps = {
  compact?: boolean;
  href?: string;
};

export function Brand({ compact = false, href = '/' }: BrandProps) {
  const content = (
    <span className={`rd-brand ${compact ? 'rd-brand--compact' : ''}`}>
      <Image
        src="/rd-mark.png"
        alt="Research and Desire mark"
        width={40}
        height={40}
        className="rd-brand__mark"
        priority
      />
      <span className="rd-brand__text">
        <span className="rd-brand__eyebrow">Research &amp; Desire</span>
        {!compact ? <span className="rd-brand__title">{appName}</span> : null}
      </span>
    </span>
  );

  return (
    <Link href={href} aria-label={appName} className="rd-brand-link">
      {content}
    </Link>
  );
}
