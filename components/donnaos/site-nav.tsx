import { Code2, Mail } from 'lucide-react';
import { InternalLink } from '@/components/donnaos/internal-link';
import { profile } from '@/lib/portfolio';

export function SiteNav() {
  return (
    <header className="inner-menu-bar">
      <InternalLink className="inner-brand" href="/">
        <span className="brand-drop" aria-hidden="true">DG</span>
        <strong>DonnaOS</strong>
      </InternalLink>
      <nav aria-label="Main navigation">
        <InternalLink href="/projects">Case Studies</InternalLink>
        <InternalLink href="/notes">Notes</InternalLink>
        <InternalLink href="/?app=desk">Desk</InternalLink>
        <InternalLink href="/about">About</InternalLink>
        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 /></a>
        <a href={`mailto:${profile.email}`} aria-label="Email Donna"><Mail /></a>
      </nav>
    </header>
  );
}
