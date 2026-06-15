/**
 * crop-panels.js
 * Manually translates the eras-track to center each panel,
 * then crops just the right-column header area (circles + season + label).
 * This bypasses the GSAP scrub and shows the raw rendered layout.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('http://localhost:3940', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000); // let GSAP init and loader dismiss

  const outDir = path.join(__dirname, 'panel-crops');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  // Get track info
  const trackInfo = await page.evaluate(() => {
    const track = document.querySelector('.eras-track');
    const panels = Array.from(document.querySelectorAll('.era-panel'));
    if (!track || !panels.length) return null;

    return {
      panelCount: panels.length,
      panelPositions: panels.map(p => ({
        id: p.dataset.era,
        naturalLeft: p.getBoundingClientRect().left + window.scrollX
      }))
    };
  });

  console.log('Track info:', JSON.stringify(trackInfo, null, 2));

  // For each panel, manually set the track translateX so the panel is at x=0
  for (let i = 0; i < (trackInfo?.panelCount ?? 0); i++) {
    const panelId = trackInfo.panelPositions[i].id;

    await page.evaluate((idx) => {
      const track = document.querySelector('.eras-track');
      const panels = Array.from(document.querySelectorAll('.era-panel'));
      const panel = panels[idx];
      if (!track || !panel) return;

      // Get the panel's natural x offset within the track
      // (before any GSAP transform)
      const trackRect = track.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();

      // Current transform on track
      const currentTranslateX = new DOMMatrix(window.getComputedStyle(track).transform).m41;

      // Natural (untranslated) position of panel
      const naturalLeft = panelRect.left - currentTranslateX;

      // We want the panel at x=0, so set track translateX = -naturalLeft
      track.style.transform = `translateX(${-naturalLeft}px)`;
    }, i);

    await page.waitForTimeout(300);

    // Measure exact positions of ring-row, eyebrow, ring-label for this panel
    const measures = await page.evaluate((idx) => {
      const panels = Array.from(document.querySelectorAll('.era-panel'));
      const panel = panels[idx];
      if (!panel) return null;

      const grid = panel.querySelector('.era-grid');
      const rightCol = grid ? grid.children[1] : null;
      const ringRow = panel.querySelector('.ring-row');
      const headerBlock = rightCol ? rightCol.children[1] : null;
      const eyebrow = headerBlock ? headerBlock.querySelector('.eyebrow') : null;
      const ringLabel = headerBlock ? headerBlock.querySelector('.text-caption') : null;

      function r(el) {
        if (!el) return null;
        const b = el.getBoundingClientRect();
        return { top: Math.round(b.top * 10) / 10, bottom: Math.round(b.bottom * 10) / 10, left: Math.round(b.left * 10) / 10, height: Math.round(b.height * 10) / 10 };
      }

      const rr = r(ringRow);
      const er = r(eyebrow);
      const lr = r(ringLabel);

      return {
        ringRow: rr,
        eyebrow: er,
        ringLabel: lr,
        gap_ringToEyebrow: er && rr ? Math.round((er.top - rr.bottom) * 10) / 10 : null,
        gap_eyebrowToLabel: lr && er ? Math.round((lr.top - er.bottom) * 10) / 10 : null,
        rightColHeight: rightCol ? Math.round(rightCol.getBoundingClientRect().height) : null,
        leftColHeight: grid ? Math.round(grid.children[0].getBoundingClientRect().height) : null,
        gridHeight: grid ? Math.round(grid.getBoundingClientRect().height) : null,
      };
    }, i);

    console.log(`\n--- Panel ${i + 1} (${panelId}) ---`);
    console.log(JSON.stringify(measures, null, 2));

    // Take full screenshot
    await page.screenshot({ path: path.join(outDir, `panel-${i + 1}-full.png`) });

    // Crop just the right-column header area: from top of ring-row to bottom of ring-label
    // Give 20px padding on each side
    if (measures && measures.ringRow && measures.ringLabel) {
      const cropX = Math.max(0, Math.round(measures.ringRow.left) - 20);
      const cropY = Math.max(0, Math.round(measures.ringRow.top) - 20);
      const cropW = 700;
      const cropH = Math.round(measures.ringLabel.bottom - measures.ringRow.top) + 40;

      await page.screenshot({
        path: path.join(outDir, `panel-${i + 1}-crop.png`),
        clip: { x: cropX, y: cropY, width: cropW, height: cropH }
      });
    }
  }

  // Restore track transform
  await page.evaluate(() => {
    const track = document.querySelector('.eras-track');
    if (track) track.style.transform = '';
  });

  console.log('\nScreenshots saved to:', outDir);
  await browser.close();
})();
