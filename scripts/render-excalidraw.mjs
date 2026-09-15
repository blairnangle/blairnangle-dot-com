import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = join(__dirname, '..', 'src', 'content', 'posts', 'blog');

// The Excalidraw utils UMD bundle exposes exportToSvg on window.ExcalidrawUtils.
const EXCALIDRAW_UTILS_URL =
  'https://unpkg.com/@excalidraw/utils@0.1.2/dist/excalidraw-utils.min.js';

async function findExcalidrawFiles(dir) {
  const found = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...(await findExcalidrawFiles(full)));
    } else if (entry.name.endsWith('.excalidraw')) {
      found.push(full);
    }
  }
  return found;
}

async function main() {
  const files = await findExcalidrawFiles(POSTS_DIR);

  if (files.length === 0) {
    console.log('No .excalidraw files found under', POSTS_DIR);
    return;
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Load Excalidraw's export utils into a blank page context.
  await page.setContent('<!DOCTYPE html><html><head></head><body></body></html>');
  await page.addScriptTag({ url: EXCALIDRAW_UTILS_URL });
  await page.waitForFunction('window.ExcalidrawUtils && window.ExcalidrawUtils.exportToSvg');

  let rendered = 0;

  for (const file of files) {
    const raw = await readFile(file, 'utf8');
    let scene;
    try {
      scene = JSON.parse(raw);
    } catch (e) {
      console.error(`Skipping ${file}: not valid JSON (${e.message})`);
      continue;
    }

    const svgString = await page.evaluate(async (sceneData) => {
      const svg = await window.ExcalidrawUtils.exportToSvg({
        elements: sceneData.elements || [],
        appState: {
          ...(sceneData.appState || {}),
          exportBackground: true,
          exportWithDarkMode: false,
        },
        files: sceneData.files || null,
      });
      return svg.outerHTML;
    }, scene);

    const outPath = join(
      dirname(file),
      `${basename(file, '.excalidraw')}.excalidraw.svg`,
    );
    // Excalidraw embeds an @font-face pointing at excalidraw.com for its
    // hand-drawn "Virgil" font. Strip that remote dependency so the rendered
    // SVG is self-contained; the text falls back to a generic system font.
    const selfContained = svgString.replace(
      /<style[^>]*>[\s\S]*?<\/style>/g,
      (block) => (block.includes('@font-face') ? '' : block),
    );
    await writeFile(outPath, `${selfContained}\n`, 'utf8');
    rendered += 1;
    console.log(`Rendered ${file} -> ${outPath}`);
  }

  await browser.close();
  console.log(`\nDone. Rendered ${rendered}/${files.length} diagram(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
