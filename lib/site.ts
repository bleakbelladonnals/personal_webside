export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const value = configured || 'http://localhost:3000';
  return new URL(value.includes('://') ? value : `https://${value}`);
}
