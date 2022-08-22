import playwright from "playwright-aws-lambda";

export async function getScreenshot(
  html: string,
  { width, height }: { width: number; height: number }
) {
  const browser = await playwright.launchChromium();
  const context = await browser.newContext();

  const page = await context.newPage();

  await page.setViewportSize({ width, height });
  await page.setContent(html);

  const file = await page.screenshot({ type: "png" });

  return file;
}
