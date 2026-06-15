/**
 * inspect-panels.js
 * Uses Playwright to navigate to each EraPanel and measure:
 * - The RingRow wrapper computed marginBottom
 * - The eyebrow <p> computed margin (all sides)
 * - The ring-label <p> computed margin (all sides)
 * - The bounding rects of: ring-row, eyebrow, ring-label
 * - Any GSAP inline transforms on the .era-panel and right column
 * - The gap between: bottom of ring-row → top of eyebrow
 *                    bottom of eyebrow → top of ring-label
 */

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('http://localhost:3940', { waitUntil: 'networkidle' });

  // Wait for the horizontal eras track to be in the DOM
  await page.waitForSelector('.era-panel', { timeout: 10000 });

  // Disable GSAP scrub so panels are in natural layout position
  // We evaluate JS to force all era-panels to be visible for inspection
  const results = await page.evaluate(() => {
    const panels = Array.from(document.querySelectorAll('.era-panel'));

    function getRect(el) {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, left: r.left, right: r.right, height: r.height, width: r.width };
    }

    function getComputed(el, ...props) {
      if (!el) return null;
      const style = window.getComputedStyle(el);
      const out = {};
      props.forEach(p => out[p] = style.getPropertyValue(p));
      return out;
    }

    function getInlineTransform(el) {
      if (!el) return 'none';
      return el.style.transform || window.getComputedStyle(el).transform || 'none';
    }

    return panels.map((panel, i) => {
      // Move panel into view temporarily for measurement
      const originalTransform = panel.style.transform;
      const originalVisibility = panel.style.visibility;

      // Right column (2nd child of era-grid)
      const grid = panel.querySelector('.era-grid');
      const rightCol = grid ? grid.children[1] : null;

      // RingRow wrapper (first div in right column)
      const ringRowWrapper = rightCol ? rightCol.children[0] : null;
      const ringRow = panel.querySelector('.ring-row');

      // Header block wrapper (second div in right column)
      const headerBlock = rightCol ? rightCol.children[1] : null;
      const eyebrow = headerBlock ? headerBlock.querySelector('.eyebrow') : null;
      const ringLabel = headerBlock ? headerBlock.querySelector('.text-caption') : null;

      const ringRowWrapperStyles = ringRowWrapper ? getComputed(ringRowWrapper,
        'margin-bottom', 'margin-top', 'padding-bottom', 'padding-top') : null;

      const eyebrowStyles = eyebrow ? getComputed(eyebrow,
        'margin-top', 'margin-bottom', 'padding-top', 'padding-bottom',
        'line-height', 'font-size') : null;

      const ringLabelStyles = ringLabel ? getComputed(ringLabel,
        'margin-top', 'margin-bottom', 'padding-top', 'padding-bottom',
        'line-height', 'font-size') : null;

      const headerBlockStyles = headerBlock ? getComputed(headerBlock,
        'margin-bottom', 'margin-top', 'padding', 'display', 'gap') : null;

      const rightColStyles = rightCol ? getComputed(rightCol,
        'display', 'flex-direction', 'gap', 'padding-top', 'margin-top',
        'transform', 'align-items') : null;

      // Measure pixel gaps via getBoundingClientRect
      // (only meaningful when the panel is visible/translated to x=0)
      const panelRect = getRect(panel);
      const ringRowRect = getRect(ringRow);
      const eyebrowRect = getRect(eyebrow);
      const ringLabelRect = getRect(ringLabel);

      const gapRingToEyebrow = (eyebrowRect && ringRowRect)
        ? (eyebrowRect.top - ringRowRect.bottom).toFixed(2)
        : 'n/a (off-screen)';

      const gapEyebrowToRingLabel = (ringLabelRect && eyebrowRect)
        ? (ringLabelRect.top - eyebrowRect.bottom).toFixed(2)
        : 'n/a (off-screen)';

      return {
        panel: i + 1,
        id: panel.dataset.era,
        panelTransform: getInlineTransform(panel),
        rightColTransform: rightCol ? getInlineTransform(rightCol) : 'n/a',
        ringRowWrapperInlineStyle: ringRowWrapper ? ringRowWrapper.getAttribute('style') : 'none',
        headerBlockInlineStyle: headerBlock ? headerBlock.getAttribute('style') : 'none',
        eyebrowInlineStyle: eyebrow ? eyebrow.getAttribute('style') : 'none',
        ringLabelInlineStyle: ringLabel ? ringLabel.getAttribute('style') : 'none',
        ringRowWrapperStyles,
        eyebrowStyles,
        ringLabelStyles,
        headerBlockStyles,
        rightColStyles,
        gapRingToEyebrow,
        gapEyebrowToRingLabel,
        rightColChildCount: rightCol ? rightCol.children.length : 0,
        eyebrowClass: eyebrow ? eyebrow.className : 'not found',
        ringLabelClass: ringLabel ? ringLabel.className : 'not found',
      };
    });
  });

  // Print results for each panel
  results.forEach(r => {
    console.log('\n' + '='.repeat(60));
    console.log(`PANEL ${r.panel} — ${r.id}`);
    console.log('='.repeat(60));
    console.log(`panel transform:        ${r.panelTransform}`);
    console.log(`right col transform:    ${r.rightColTransform}`);
    console.log(`right col children:     ${r.rightColChildCount}`);
    console.log('');
    console.log(`ringRow wrapper inline: ${r.ringRowWrapperInlineStyle}`);
    console.log(`header block inline:    ${r.headerBlockInlineStyle}`);
    console.log(`eyebrow inline:         ${r.eyebrowInlineStyle}`);
    console.log(`ringLabel inline:       ${r.ringLabelInlineStyle}`);
    console.log('');
    console.log('RingRow wrapper computed:');
    console.log(JSON.stringify(r.ringRowWrapperStyles, null, 2));
    console.log('');
    console.log('Eyebrow <p> computed:');
    console.log(JSON.stringify(r.eyebrowStyles, null, 2));
    console.log('');
    console.log('Ring label <p> computed:');
    console.log(JSON.stringify(r.ringLabelStyles, null, 2));
    console.log('');
    console.log('Header block computed:');
    console.log(JSON.stringify(r.headerBlockStyles, null, 2));
    console.log('');
    console.log(`GAPS (pixel distances):`);
    console.log(`  ring-row bottom → eyebrow top:    ${r.gapRingToEyebrow}px`);
    console.log(`  eyebrow bottom  → ring-label top: ${r.gapEyebrowToRingLabel}px`);
    console.log(`eyebrow class:    ${r.eyebrowClass}`);
    console.log(`ringLabel class:  ${r.ringLabelClass}`);
  });

  await browser.close();
})();
