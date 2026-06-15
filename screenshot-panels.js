/**
 * screenshot-panels.js
 * Takes a screenshot of each EraPanel by scrolling the page to trigger
 * the GSAP horizontal scroll, then crops the right column header area
 * (RingRow + eyebrow + ringLabel) from each panel for direct comparison.
 * Also measures live bounding rects AFTER scroll position is set.
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 200 });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('http://localhost:3940', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Dismiss loader if visible
  await page.waitForTimeout(4000);

  // Scroll to the ErasTrack section first
  await page.evaluate(() => {
    const track = document.querySelector('.eras-pin');
    if (track) track.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(1000);

  const outDir = path.join(__dirname, 'panel-screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  // We'll navigate to each panel by programmatically setting scroll position
  // ErasTrack pins on scroll: each panel = 1 viewport width of scroll distance
  // The total scroll distance = track.scrollWidth - window.innerWidth
  const scrollData = await page.evaluate(() => {
    const root = document.querySelector('.eras-pin');
    const track = document.querySelector('.eras-track');
    if (!root || !track) return null;

    const rootTop = root.getBoundingClientRect().top + window.scrollY;
    const totalScroll = track.scrollWidth - window.innerWidth;
    const panelCount = document.querySelectorAll('.era-panel').length;
    return { rootTop, totalScroll, panelCount, trackScrollWidth: track.scrollWidth };
  });

  console.log('Scroll data:', scrollData);

  if (!scrollData) {
    console.error('Could not find eras-pin or eras-track');
    await browser.close();
    return;
  }

  // For each panel, scroll to the position where that panel is centered
  const results = [];

  for (let i = 0; i < scrollData.panelCount; i++) {
    // Calculate scroll position for each panel (evenly distributed)
    const scrollPerPanel = scrollData.totalScroll / scrollData.panelCount;
    const targetScroll = scrollData.rootTop + (scrollPerPanel * i) + (scrollPerPanel * 0.5);

    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), targetScroll);
    await page.waitForTimeout(800); // Wait for GSAP scrub to settle

    // Take full screenshot
    const screenshotPath = path.join(outDir, `panel-${i + 1}-full.png`);
    await page.screenshot({ path: screenshotPath });

    // Measure the live rendered positions of header elements
    const measurements = await page.evaluate((panelIndex) => {
      const panels = Array.from(document.querySelectorAll('.era-panel'));
      const panel = panels[panelIndex];
      if (!panel) return null;

      const grid = panel.querySelector('.era-grid');
      const rightCol = grid ? grid.children[1] : null;
      const ringRowWrapper = rightCol ? rightCol.children[0] : null;
      const ringRow = panel.querySelector('.ring-row');
      const headerBlock = rightCol ? rightCol.children[1] : null;
      const eyebrow = headerBlock ? headerBlock.querySelector('.eyebrow') : null;
      const ringLabel = headerBlock ? headerBlock.querySelector('.text-caption') : null;

      function rect(el) {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), height: Math.round(r.height) };
      }

      function computedTransform(el) {
        if (!el) return 'n/a';
        const t = window.getComputedStyle(el).transform;
        return t === 'none' ? 'none' : t;
      }

      const ringRowRect = rect(ringRow);
      const eyebrowRect = rect(eyebrow);
      const ringLabelRect = rect(ringLabel);

      const gap1 = (eyebrowRect && ringRowRect) ? eyebrowRect.top - ringRowRect.bottom : null;
      const gap2 = (ringLabelRect && eyebrowRect) ? ringLabelRect.top - eyebrowRect.bottom : null;

      return {
        panelTransform: computedTransform(panel),
        rightColTransform: computedTransform(rightCol),
        ringRowRect,
        eyebrowRect,
        ringLabelRect,
        gap_ringToEyebrow: gap1,
        gap_eyebrowToLabel: gap2,
        ringRowWrapperStyle: ringRowWrapper ? ringRowWrapper.getAttribute('style') : null,
        panelVisible: panel.getBoundingClientRect().left < 1440 && panel.getBoundingClientRect().right > 0,
      };
    }, i);

    results.push({ panel: i + 1, measurements });
    console.log(`\n--- Panel ${i + 1} (scroll to ${Math.round(targetScroll)}px) ---`);
    console.log(JSON.stringify(measurements, null, 2));
  }

  // Final side-by-side comparison
  console.log('\n\n=== FINAL COMPARISON ===');
  console.log('Panel | gap ring→eyebrow | gap eyebrow→label | panelTransform');
  results.forEach(r => {
    const m = r.measurements;
    if (!m) return;
    console.log(`  ${r.panel}   | ${String(m.gap_ringToEyebrow).padEnd(17)} | ${String(m.gap_eyebrowToLabel).padEnd(18)} | ${m.panelTransform}`);
  });

  console.log('\nScreenshots saved to:', outDir);
  await browser.close();
})();
