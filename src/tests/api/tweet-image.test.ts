import { test, expect } from "@playwright/test";

test("should return tweet image", async ({ page, request }, testInfo) => {
  const tweetImg = await request.get("/api/tweet/1234");
  expect(tweetImg.ok()).toBeTruthy();

  await page.goto("/api/tweet/1234");

  await page.screenshot({
    path: `.tests/${testInfo.project.name}/api-tweet-image.png`,
  });
});
