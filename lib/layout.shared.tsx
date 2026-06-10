import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Brand } from '@/components/brand';
import { githubUrl } from '@/lib/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Brand compact />,
    },
    githubUrl,
  };
}
