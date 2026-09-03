import type { MetadataRoute } from 'next';
import { notes } from '@/lib/notes';
import { cases } from '@/lib/portfolio';
import { getAbsoluteSiteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/', '/projects', '/notes', '/about', ...cases.map((project) => `/projects/${project.slug}`)];
  const noteRoutes = notes.map((note) => ({ route: `/notes/${note.slug}`, updatedAt: note.updatedAt }));

  return [
    ...routes.map((route) => ({
      url: getAbsoluteSiteUrl(route).toString(),
      lastModified: new Date('2026-09-02'),
      changeFrequency: route === '/' || route === '/notes' ? 'monthly' as const : 'yearly' as const,
      priority: route === '/' ? 1 : route === '/projects' || route === '/notes' ? 0.9 : 0.7,
    })),
    ...noteRoutes.map(({ route, updatedAt }) => ({
      url: getAbsoluteSiteUrl(route).toString(),
      lastModified: new Date(updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
