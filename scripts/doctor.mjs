import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const pkg = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
);
let failed = false;
function report(ok, message) {
  console.log(`${ok ? 'OK' : 'ERROR'}: ${message}`);
  if (!ok) failed = true;
}
const [major, minor] = process.versions.node.split('.').map(Number);
report(
  major > 22 || (major === 22 && minor >= 13),
  `Node.js ${process.versions.node}; CI uses Node.js 22 (>=22.13)`,
);
const expected = pkg.packageManager.replace('pnpm@', '');
const actual = process.env.npm_config_user_agent?.match(/pnpm\/([^ ]+)/)?.[1];
report(
  actual === expected,
  `pnpm ${actual ?? 'unknown'}; expected ${expected}. Run with pnpm check:env.`,
);
report(
  existsSync(new URL('../node_modules/.modules.yaml', import.meta.url)),
  'Dependencies installed (pnpm install --frozen-lockfile)',
);
try {
  const branch = execFileSync('git', ['branch', '--show-current'], {
    cwd: root,
    encoding: 'utf8',
  }).trim();
  const status = execFileSync('git', ['status', '--porcelain'], {
    cwd: root,
    encoding: 'utf8',
  });
  console.log(
    `INFO: branch=${branch || '(detached HEAD)'}, changed entries=${status.split('\n').filter(Boolean).length}`,
  );
  if (branch === 'main')
    console.log('INFO: Create a task branch before editing.');
} catch {
  report(false, 'Git repository could not be inspected');
}
process.exitCode = failed ? 1 : 0;
