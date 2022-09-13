import puppeteer, { Page } from "puppeteer-core";
import chrome from "chrome-aws-lambda";

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
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    };
  }

  return options;
}

let _page: Page | null;
async function getPage(): Promise<Page> {
  if (_page) {
    return _page;
  }

  const options = await getOptions();
  const browser = await puppeteer.launch(options);

  _page = await browser.newPage();

  return _page;
}

export async function getScreenshot(
  html: string,
  {
    width,
    height,
    encoding,
  }: { width: number; height: number; encoding?: "base64" | "binary" }
) {
  const page = await getPage();

  await page.setViewport({ width, height });
  await page.setContent(html);

  const file = await page.screenshot({ type: "png", encoding });

  return file;
}
