/**
 * Copies the locally built MagFlip demo into website/static/demo
 * so the docs site can embed a live demo that runs the LOCAL source code.
 *
 * The folder layout of the repository is preserved on purpose, so that
 * docs/examples/local/index.html keeps working without rewriting paths:
 *
 *   static/demo/
 *   ├─ docs/examples/local/index.html
 *   ├─ docs/examples/prebuild/resources/...
 *   └─ packages/minjs/magflip.min.js
 */
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const WEBSITE_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REPO_DIR = resolve(WEBSITE_DIR, '..');
const DEMO_DIR = join(WEBSITE_DIR, 'static/demo');

const FILES_TO_COPY = [
  'packages/minjs/magflip.min.js',
  'docs/examples/local/index.html',
  'docs/examples/prebuild/resources',
];

rmSync(DEMO_DIR, { recursive: true, force: true });

const bundlePath = join(REPO_DIR, FILES_TO_COPY[0]);
if (!existsSync(bundlePath)) {
  console.warn('[sync-demo] magflip.min.js not found. The live demo will show a build guide.');
  console.warn('[sync-demo] Run `npm run build:local` in the repository root to enable it.');
}

for (const relativePath of FILES_TO_COPY) {
  const source = join(REPO_DIR, relativePath);
  if (!existsSync(source)) { continue; }

  const target = join(DEMO_DIR, relativePath);
  mkdirSync(dirname(target), { recursive: true });
  cpSync(source, target, { recursive: true });
}

console.log('[sync-demo] Demo copied to website/static/demo');
