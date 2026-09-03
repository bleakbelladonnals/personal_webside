import type { AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import { getBasePath, withBasePath } from '@/lib/site';

type InternalLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
};

export function InternalLink({ href, children, ...props }: InternalLinkProps) {
  if (getBasePath()) return <a href={withBasePath(href)} {...props}>{children}</a>;
  return <Link href={href} {...props}>{children}</Link>;
}
