export function getBasePath() {
  const configured = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? '';
  return configured ? `/${configured.replace(/^\/+|\/+$/g, '')}` : '';
}

export function withBasePath(path: string) {
  const basePath = getBasePath();
  if (!basePath || path === basePath || path.startsWith(`${basePath}/`)) return path;
  return path === '/' ? `${basePath}/` : `${basePath}${path}`;
}

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const value = configured || 'http://localhost:3000';
  return new URL(value.includes('://') ? value : `https://${value}`);
}

export function getAbsoluteSiteUrl(path = '') {
  const siteUrl = getSiteUrl();
  if (!siteUrl.pathname.endsWith('/')) siteUrl.pathname += '/';
  return new URL(path.replace(/^\/+/, ''), siteUrl);
}
