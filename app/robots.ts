import type { MetadataRoute } from 'next';
import { getAbsoluteSiteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: getAbsoluteSiteUrl('/sitemap.xml').toString(),
  };
}
