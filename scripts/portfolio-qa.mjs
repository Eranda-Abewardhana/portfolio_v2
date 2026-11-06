// Run with PORTFOLIO_QA_MODULES pointing to an external QA-only node_modules.
// Keeps browser tooling out of the production application's dependency graph.
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";

const require = createRequire(
  path.join(process.env.PORTFOLIO_QA_MODULES, "package.json"),
);
const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
const output =
  process.env.PORTFOLIO_QA_OUTPUT ||
  path.join(process.env.TEMP, "eranda-portfolio-qa", "results");
const baseUrl = process.env.PORTFOLIO_QA_URL || "http://127.0.0.1:3000";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const errors = [];
const failedRequests = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
page.on("response", (response) => {
  if (response.url().startsWith(baseUrl) && response.status() >= 400)
    failedRequests.push(`${response.status()} ${response.url()}`);
});
const report = { viewports: [], checks: [], errors, failedRequests };
try {
  const response = await page.goto(baseUrl, { waitUntil: "networkidle" });
  assert.equal(response.status(), 200);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(output, "desktop-hero.png") });
  for (const width of [1440, 1920, 1366, 1024, 768, 390, 375, 320]) {
    await page.setViewportSize({ width, height: width < 650 ? 844 : 1000 });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.locator(".p-portrait img").evaluate((image) => image.decode());
    const dimensions = await page.evaluate(() => ({
      viewport: innerWidth,
      page: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));
    assert.ok(
      dimensions.page <= width + 1,
      `Horizontal overflow at ${width}px: ${JSON.stringify(dimensions)}`,
    );
    const missingImages = await page
      .locator("img")
      .evaluateAll((images) =>
        images
          .filter(
            (image) =>
              image.loading !== "lazy" &&
              (!image.complete || image.naturalWidth === 0),
          )
          .map((image) => image.src),
      );
    assert.deepEqual(missingImages, []);
    report.viewports.push({ width, ...dimensions });
    if ([1440, 768, 390, 320].includes(width))
      await page.screenshot({
        path: path.join(output, `viewport-${width}.png`),
      });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  const menu = page.getByRole("button", {
    name: "Open navigation",
    exact: true,
  });
  await menu.click();
  assert.equal(
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .isVisible(),
    true,
  );
  await page.keyboard.press("Escape");
  assert.equal(await menu.getAttribute("aria-expanded"), "false");
  await menu.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "03 Expertise" })
    .click();
  assert.equal(await menu.getAttribute("aria-expanded"), "false");
  report.checks.push("Mobile menu: open, Escape, anchor navigation, close");

  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const project of ["Yukti", "DocCraft", "YouFIRA", "SentiView"]) {
    const trigger = page.getByRole("button", {
      name: `Explore ${project} project`,
      exact: true,
    });
    await trigger.click();
    const dialog = page.getByRole("dialog");
    assert.equal(await dialog.isVisible(), true);
    assert.equal(
      await dialog.getByRole("heading", { name: project, exact: true }).count(),
      1,
    );
    const focusedInside = await page.evaluate(() =>
      document.querySelector("dialog").contains(document.activeElement),
    );
    assert.equal(focusedInside, true);
    if (["Yukti", "YouFIRA"].includes(project)) {
      await page.waitForFunction(
        () => document.querySelector("dialog video").readyState >= 1,
      );
      await dialog.locator("video").evaluate((video) => video.play());
      assert.equal(
        await dialog.locator("video").evaluate((video) => video.paused),
        false,
      );
      await dialog.locator("video").evaluate((video) => video.pause());
    }
    if (project === "DocCraft") {
      const text = await dialog.textContent();
      assert.ok(text.includes("61-ticket, four-sprint Jira plan"));
      assert.ok(text.includes("Planned Redis rate limiting"));
      assert.ok(text.includes("PayHere") && text.includes("Paddle"));
      assert.equal(await dialog.locator('a[href*="github.com"]').count(), 0);
      await page.screenshot({ path: path.join(output, "doccraft-dialog.png") });
    }
    if (project === "Yukti")
      await page.screenshot({ path: path.join(output, "project-dialog.png") });
    const dialogAudit = await new AxeBuilder({ page })
      .include("dialog")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    assert.deepEqual(
      dialogAudit.violations
        .filter((item) => ["critical", "serious"].includes(item.impact))
        .map((item) => item.id),
      [],
    );
    await page.keyboard.press("Escape");
    assert.equal(await page.getByRole("dialog").count(), 0);
    assert.equal(
      await trigger.evaluate((button) => button === document.activeElement),
      true,
    );
  }
  report.checks.push(
    "Four case studies: dialogs, focus restoration, Escape, repositories, video playback, accessibility; CV-backed DocCraft details preserve planned work",
  );
  await page
    .getByRole("button", { name: "Retrieval-augmented generation" })
    .click();
  assert.equal(await page.locator("#discipline-1").isVisible(), true);
  assert.equal(await page.locator("#discipline-0").isVisible(), false);
  await page.getByRole("button", { name: "Pause network animation" }).click();
  assert.equal(
    await page
      .getByRole("button", { name: "Resume network animation" })
      .getAttribute("aria-pressed"),
    "true",
  );
  const pixels = await page.locator("canvas").evaluate((canvas) => {
    const data = canvas
      .getContext("2d")
      .getImageData(0, 0, canvas.width, canvas.height).data;
    return data.some((value) => value !== 0);
  });
  assert.equal(pixels, true);
  report.checks.push(
    "Expertise accordion and rendered interactive network, pause control",
  );
  await page.getByRole("button", { name: "Explore the research" }).click();
  assert.equal(
    await page
      .getByRole("dialog")
      .getByRole("heading", { name: "Genomic AI" })
      .isVisible(),
    true,
  );
  await page.getByRole("button", { name: "Close project details" }).click();
  report.checks.push("Research detail dialog");
  const secondRole = page.locator(".p-experience-item").nth(1);
  await secondRole.locator("summary").click();
  assert.equal(await secondRole.getAttribute("open"), "");
  await secondRole.locator("summary").click();
  await page.locator(".p-award-detail summary").click();
  assert.equal(await page.locator(".p-award-expanded img").isVisible(), true);
  await page.locator(".p-award-detail summary").click();
  report.checks.push("Experience and award disclosures");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "Copy email address" }).click();
  assert.equal(
    await page.evaluate(() => navigator.clipboard.readText()),
    "erandasathsara@gmail.com",
  );
  assert.equal(
    await page.getByRole("status").textContent(),
    "Email address copied.",
  );
  report.checks.push("Email clipboard confirmation, email/phone/social links");
  assert.equal(await page.locator('a[href="tel:+94764874820"]').count(), 1);
  assert.equal(
    await page.locator('a[href="https://wa.me/94764874820"]').count(),
    1,
  );
  const person = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) =>
      scripts
        .map((script) => JSON.parse(script.textContent))
        .flatMap((schema) => schema["@graph"] || [schema])
        .find((schema) => schema["@type"] === "Person"),
    );
  assert.equal(person.telephone, "+94 764 874 820");
  const bodyText = await page.locator("body").innerText();
  assert.ok(bodyText.includes("English — Professional. Sinhala — Native."));
  assert.ok(
    !bodyText.includes("subhaf@uom.lk") &&
      !bodyText.includes("janith@evisionmicro.com"),
  );
  report.checks.push(
    "CV-backed contact number, structured data, language skills, and suitable professional content",
  );
  const badAnchors = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute("href"))
        .filter((href) => !document.getElementById(href.slice(1))),
    );
  assert.deepEqual(badAnchors, []);
  for (const id of [
    "work",
    "about",
    "expertise",
    "experience",
    "research",
    "contact",
  ]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.screenshot({ path: path.join(output, `${id}.png`) });
  }
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  report.accessibility = accessibility.violations.map(
    ({ id, impact, nodes, help }) => ({
      id,
      impact,
      help,
      elements: nodes.map((node) => ({
        target: node.target,
        summary: node.failureSummary,
      })),
    }),
  );
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: path.join(output, "desktop-full.png"),
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator("#expertise").scrollIntoViewIfNeeded();
  await page.waitForFunction(() => {
    const canvas = document.querySelector("canvas");
    return (
      canvas &&
      canvas
        .getContext("2d")
        .getImageData(0, 0, canvas.width, canvas.height)
        .data.some((value) => value !== 0)
    );
  });
  await page.screenshot({ path: path.join(output, "mobile-expertise.png") });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: path.join(output, "mobile-full.png"),
    fullPage: true,
  });
  const legacyResponse = await context.request.get(`${baseUrl}/legacy`);
  assert.equal(legacyResponse.status(), 200);
  assert.ok((await legacyResponse.text()).includes("Eranda"));
  report.checks.push("Original portfolio route preserved and serves HTTP 200");
  assert.equal(
    await page
      .locator(".p-marquee > div")
      .evaluate((element) => getComputedStyle(element).animationName),
    "none",
  );
  report.checks.push("Reduced motion disables the moving typography");

  const motionContext = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "no-preference",
  });
  const motionPage = await motionContext.newPage();
  motionPage.on("pageerror", (error) => errors.push(error.message));
  motionPage.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await motionPage.goto(baseUrl, { waitUntil: "networkidle" });
  await motionPage.evaluate(() => document.fonts.ready);
  await motionPage.waitForFunction(
    () =>
      !document
        .querySelector(".p-hero-copy")
        .getAnimations()
        .some((animation) => animation.playState === "running"),
  );
  report.initialLoad = await motionPage.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0];
    const resources = performance.getEntriesByType("resource");
    return {
      responseMs: Math.round(navigation.responseStart),
      loadMs: Math.round(navigation.loadEventEnd),
      transferredKB: Math.round(
        resources.reduce(
          (total, item) => total + item.encodedBodySize,
          navigation.encodedBodySize,
        ) / 1024,
      ),
      threeJsLoaded: resources.some((item) =>
        /three[_-]|fiber|drei/i.test(item.name),
      ),
    };
  });
  await motionPage.screenshot({ path: path.join(output, "final-desktop.png") });
  await motionPage.getByRole("button", { name: "Pause moving text" }).click();
  assert.equal(
    await motionPage
      .locator(".p-marquee > div")
      .evaluate((element) => getComputedStyle(element).animationPlayState),
    "paused",
  );
  await motionPage.evaluate(() =>
    window.scrollTo({ top: 260, behavior: "instant" }),
  );
  await motionPage.waitForFunction(() => {
    const transform = getComputedStyle(
      document.querySelector(".p-portrait"),
    ).transform;
    return transform !== "none" && new DOMMatrixReadOnly(transform).m42 > 5;
  });
  await motionPage.locator("#expertise").scrollIntoViewIfNeeded();
  const fingerprint = (canvas) => {
    const pixels = canvas
      .getContext("2d")
      .getImageData(0, 0, canvas.width, canvas.height).data;
    let hash = 0;
    for (let i = 0; i < pixels.length; i += 71)
      hash = (hash * 31 + pixels[i]) >>> 0;
    return hash;
  };
  const firstFrame = await motionPage.locator("canvas").evaluate(fingerprint);
  await motionPage.waitForFunction((before) => {
    const canvas = document.querySelector("canvas");
    const pixels = canvas
      .getContext("2d")
      .getImageData(0, 0, canvas.width, canvas.height).data;
    let hash = 0;
    for (let i = 0; i < pixels.length; i += 71)
      hash = (hash * 31 + pixels[i]) >>> 0;
    return hash !== before;
  }, firstFrame);
  await motionPage
    .getByRole("button", { name: "Pause network animation" })
    .click();
  await motionPage.mouse.move(0, 0);
  await motionPage.waitForTimeout(80);
  const pausedFrame = await motionPage.locator("canvas").evaluate(fingerprint);
  await motionPage.waitForTimeout(150);
  assert.equal(
    await motionPage.locator("canvas").evaluate(fingerprint),
    pausedFrame,
  );
  report.checks.push(
    "Normal motion: portrait parallax, animated network, actual paused frames, marquee pause",
  );
  await motionContext.close();
  assert.deepEqual(errors, []);
  assert.deepEqual(failedRequests, []);
  assert.deepEqual(
    report.accessibility.filter((item) =>
      ["critical", "serious"].includes(item.impact),
    ),
    [],
  );
  report.passed = true;
} catch (error) {
  report.passed = false;
  report.failure = error.stack;
  await page
    .screenshot({ path: path.join(output, "failure.png") })
    .catch(() => {});
  process.exitCode = 1;
} finally {
  await writeFile(
    path.join(output, "report.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
}
