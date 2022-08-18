import { test, expect } from "@playwright/test";

test("should return tweet image", async ({ page }, testInfo) => {
  await page.goto("/api/tweet/1234");

  expect(page.locator("img")).toBeTruthy();

  await page.screenshot({
    path: `.tests/${testInfo.project.name}/api-tweet-image.png`,
  });
});
