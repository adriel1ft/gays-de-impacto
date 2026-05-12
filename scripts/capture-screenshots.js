const { chromium } = require('../equidar-front/node_modules/playwright');
const { spawn } = require('child_process');
const path = require('path');

const frontDir = path.resolve(__dirname, '../equidar-front');
const outDir = path.resolve(__dirname, '../docs/artifacts');
const baseUrl = 'http://127.0.0.1:4173';

function waitForServer(url, timeoutMs = 60000) {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const check = async () => {
      try {
        const res = await fetch(url);
        if (res.ok || res.status) {
          resolve();
          return;
        }
      } catch (_) {}

      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Timeout waiting for server: ${url}`));
        return;
      }

      setTimeout(check, 1000);
    };

    check();
  });
}

async function run() {
  const vite = spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173'], {
    cwd: frontDir,
    stdio: 'ignore',
    detached: true,
  });

  try {
    await waitForServer(baseUrl);

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 2200 } });

    await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(outDir, '01-home-hero.png'), fullPage: false });

    await page.evaluate(() => {
      const el = Array.from(document.querySelectorAll('h2')).find((h) => h.textContent && h.textContent.includes('Como funciona'));
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, '02-home-como-funciona.png'), fullPage: false });

    await page.goto(`${baseUrl}/explorar`, { waitUntil: 'networkidle' });
    await page.setViewportSize({ width: 1440, height: 1800 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(outDir, '03-explorar-mapa.png'), fullPage: false });

    await page.evaluate(() => window.scrollTo(0, 1050));
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(outDir, '04-explorar-ranking.png'), fullPage: false });

    await page.getByRole('button', { name: /Ver mais/i }).first().click();
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(outDir, '05-escola-modal.png'), fullPage: false });

    await page.getByRole('button', { name: /Gerar Análise IA/i }).click();
    await page.waitForTimeout(2600);
    await page.screenshot({ path: path.join(outDir, '06-escola-analise-ia.png'), fullPage: false });

    await browser.close();
    console.log('Screenshots generated in docs/artifacts/');
  } finally {
    try {
      process.kill(-vite.pid);
    } catch (_) {}
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
