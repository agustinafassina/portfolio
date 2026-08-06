import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const flagsDir = path.join(
  path.dirname(require.resolve('flag-icons/package.json')),
  'flags',
  '4x3',
);

const cache = new Map<string, string>();

export function flagDataUri(countryCode: string): string {
  const code = countryCode.toLowerCase();
  const cached = cache.get(code);
  if (cached) return cached;

  let svg: string;
  try {
    svg = readFileSync(path.join(flagsDir, `${code}.svg`), 'utf8');
  } catch {
    throw new Error(
      `No flag available for country code "${countryCode}". Expected flag-icons/flags/4x3/${code}.svg`,
    );
  }

  const uri = `data:image/svg+xml,${encodeURIComponent(
    svg.replace(/<\?xml[^>]*\?>/g, '').replace(/\s+/g, ' ').trim(),
  )}`;

  cache.set(code, uri);
  return uri;
}
