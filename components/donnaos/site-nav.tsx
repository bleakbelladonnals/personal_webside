import Link from 'next/link';
import { Code2, Mail } from 'lucide-react';
import { profile } from '@/lib/portfolio';

export function SiteNav() {
  return (
    <header className="inner-menu-bar">
      <Link className="inner-brand" href="/">
        <span className="brand-drop" aria-hidden="true">DG</span>
        <strong>DonnaOS</strong>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/projects">Case Studies</Link>
        <Link href="/about">About</Link>
        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 /></a>
        <a href={`mailto:${profile.email}`} aria-label="Email Donna"><Mail /></a>
      </nav>
    </header>
  );
}
