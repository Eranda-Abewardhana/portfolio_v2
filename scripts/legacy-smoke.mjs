import { createRequire } from "node:module";
import path from "node:path";
const require = createRequire(
  path.join(process.env.PORTFOLIO_QA_MODULES, "package.json"),
);
const { chromium } = require("playwright");
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
await page.goto(
  (process.env.PORTFOLIO_QA_URL || "http://127.0.0.1:3000") + "/legacy",
  { waitUntil: "networkidle" },
);
await page.waitForTimeout(6000);
console.log(
  JSON.stringify(
    { heading: await page.locator("h1").allTextContents(), errors },
    null,
    2,
  ),
);
await page.screenshot({
  path: path.join(process.env.TEMP, "eranda-portfolio-qa/results/legacy.png"),
});
await browser.close();
if (errors.length) process.exitCode = 1;
