import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";

const require = createRequire(
  path.join(process.env.PORTFOLIO_QA_MODULES, "package.json"),
);
const { chromium } = require("playwright");
const output =
  process.env.PORTFOLIO_QA_OUTPUT ||
  path.join(process.env.TEMP, "eranda-portfolio-qa", "scroll-results");
const url = process.env.PORTFOLIO_QA_URL || "http://127.0.0.1:3000";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const errors = [];
const report = { checks: [], viewports: [], errors };

async function settle(page) {
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
}
async function sceneAt(page, progress) {
  const geometry = await page
    .locator("#story")
    .evaluate((element) => ({
      top: element.getBoundingClientRect().top + scrollY,
      travel: element.offsetHeight - innerHeight,
    }));
  await page.evaluate(
    ({ top, travel, progress }) =>
      window.scrollTo({ top: top + travel * progress, behavior: "instant" }),
    { ...geometry, progress },
  );
  await settle(page);
  return page.evaluate(() => {
    const subject = document.querySelector(".p-story-subject");
    const matrix = new DOMMatrixReadOnly(getComputedStyle(subject).transform);
    return {
      scale: Math.hypot(matrix.m11, matrix.m12),
      stageTop: document.querySelector(".p-story-stage").getBoundingClientRect()
        .top,
      firstOpacity: Number(
        getComputedStyle(document.querySelector(".p-story-copy-one")).opacity,
      ),
      secondOpacity: Number(
        getComputedStyle(document.querySelector(".p-story-copy-two")).opacity,
      ),
      thirdOpacity: Number(
        getComputedStyle(document.querySelector(".p-story-copy-three")).opacity,
      ),
      viewport: innerWidth,
      pageWidth: document.documentElement.scrollWidth,
    };
  });
}
try {
  for (const width of [1440, 768, 390, 320]) {
    const context = await browser.newContext({
      viewport: { width, height: width < 900 ? 844 : 1000 },
      reducedMotion: "no-preference",
    });
    const page = await context.newPage();
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("response", (response) => {
      if (response.url().startsWith(url) && response.status() >= 400)
        errors.push(`${response.status()} ${response.url()}`);
    });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const start = await sceneAt(page, 0.01);
    await page
      .locator(".p-story-subject img")
      .evaluate((image) => image.decode());
    assert.ok(start.scale < 1.01);
    assert.ok(Math.abs(start.stageTop) < 2);
    assert.ok(start.firstOpacity > 0.99);
    await page.screenshot({
      path: path.join(output, `story-${width}-wide.png`),
    });

    const middle = await sceneAt(page, 0.52);
    assert.ok(
      middle.scale > 2.1,
      `Close-up not reached: ${JSON.stringify(middle)}`,
    );
    assert.ok(Math.abs(middle.stageTop) < 2, "The scene did not stay pinned");
    assert.ok(middle.secondOpacity > 0.99);
    assert.ok(middle.firstOpacity < 0.01);
    assert.equal(middle.pageWidth, width);
    await page.screenshot({
      path: path.join(output, `story-${width}-close.png`),
    });

    const end = await sceneAt(page, 0.99);
    assert.ok(end.scale < 1.01, "The camera did not pull back");
    assert.ok(end.thirdOpacity > 0.99);
    assert.equal(end.pageWidth, width);
    await page.screenshot({
      path: path.join(output, `story-${width}-pullback.png`),
    });

    const reverse = await sceneAt(page, 0.01);
    assert.ok(Math.abs(reverse.scale - start.scale) < 0.01);
    assert.ok(reverse.firstOpacity > 0.99);
    const beforeWheel = await page.evaluate(() => scrollY);
    await page.mouse.move(width / 2, 400);
    await page.mouse.wheel(0, 300);
    await page.waitForFunction((before) => scrollY > before + 100, beforeWheel);
    report.viewports.push({
      width,
      wideScale: Number(start.scale.toFixed(3)),
      closeScale: Number(middle.scale.toFixed(3)),
      pullbackScale: Number(end.scale.toFixed(3)),
      reverseScale: Number(reverse.scale.toFixed(3)),
      wheelScrolls: true,
    });
    await page.getByRole("link", { name: "Skip to work" }).click();
    await page.waitForFunction(() => location.hash === "#work");
    assert.equal(
      await page.locator(".p-project-cover").first().isVisible(),
      true,
    );
    if (width === 1440) {
      const media = page.locator(".p-project-2 .p-scroll-zoom-media");
      const bounds = await page
        .locator(".p-project-2 .p-project-cover")
        .evaluate((element) => ({
          top: element.getBoundingClientRect().top + scrollY,
          height: element.offsetHeight,
        }));
      await page.evaluate(
        ({ top }) =>
          scrollTo({ top: top - innerHeight + 50, behavior: "instant" }),
        bounds,
      );
      await settle(page);
      const enteringScale = await media.evaluate(
        (element) =>
          new DOMMatrixReadOnly(getComputedStyle(element).transform).m11,
      );
      await page.evaluate(
        ({ top, height }) =>
          scrollTo({
            top: top + height / 2 - innerHeight / 2,
            behavior: "instant",
          }),
        bounds,
      );
      await settle(page);
      const centeredScale = await media.evaluate(
        (element) =>
          new DOMMatrixReadOnly(getComputedStyle(element).transform).m11,
      );
      assert.ok(enteringScale > centeredScale + 0.08);
      report.projectZoom = { enteringScale, centeredScale };
    }
    await context.close();
  }
  report.checks.push(
    "Pinned zoom-in, pull-back, reverse scroll, native wheel scrolling, and skip link at four screen sizes",
  );
  report.checks.push("Project cover zoom follows viewport position");

  const reducedContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const reducedPage = await reducedContext.newPage();
  reducedPage.on("pageerror", (error) => errors.push(error.message));
  await reducedPage.goto(url, { waitUntil: "networkidle" });
  const reduced = await reducedPage.evaluate(() => ({
    trackHeight: document.querySelector("#story").offsetHeight,
    viewportHeight: innerHeight,
    sticky: getComputedStyle(document.querySelector(".p-story-stage")).position,
    secondPhase: getComputedStyle(document.querySelector(".p-story-copy-two"))
      .display,
    projectScale: new DOMMatrixReadOnly(
      getComputedStyle(
        document.querySelector(".p-scroll-zoom-media"),
      ).transform,
    ).m11,
  }));
  assert.equal(reduced.sticky, "relative");
  assert.equal(reduced.secondPhase, "none");
  assert.equal(reduced.projectScale, 1);
  assert.ok(reduced.trackHeight <= reduced.viewportHeight);
  report.checks.push(
    "Reduced motion removes the pinned timeline and media zoom",
  );
  report.reducedMotion = reduced;
  await reducedContext.close();
  assert.deepEqual(errors, []);
  report.passed = true;
} catch (error) {
  report.passed = false;
  report.failure = error.stack;
  process.exitCode = 1;
} finally {
  await writeFile(
    path.join(output, "scroll-report.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
}
