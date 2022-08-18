import chromium from "chrome-aws-lambda";
import playwright from "playwright-core";

export async function getOptions() {
  const isDev = !process.env.AWS_REGION;
  let options;

  if (isDev) {
    options = {
      args: [],
      executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      headless: true,
    };
  } else {
    options = {
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    };
  }

  return options;
}

export async function getScreenshot(
  html: string,
  { width, height }: { width: number; height: number }
) {
  const options = await getOptions();

  const browser = await playwright.chromium.launch(options);

  const page = await browser.newPage();

  await page.setViewportSize({ width, height });
  await page.setContent(html);

  const file = await page.screenshot({ type: "png" });

  await browser.close();

  return file;
}
