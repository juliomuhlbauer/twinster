import { test, expect } from "@playwright/test";

const tweetId = "1556806528912560128";

test("should fetch tweet", async ({ page }, testInfo) => {
  await page.goto("/");

  await page.locator("button", { hasText: "Tweet" }).click();

  await page.locator("input").fill(tweetId);

  await page.locator("button[aria-label='search']").click();

  await expect(page).toHaveURL(`/tweet?id=${tweetId}`);

  await expect(page).toHaveTitle("Tweet | Twinster");

  await page.screenshot({
    path: `.tests/${testInfo.project.name}/tweet.png`,
  });
});
