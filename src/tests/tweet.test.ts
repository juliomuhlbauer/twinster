import { test, expect } from "@playwright/test";

test("should fetch tweet", async ({ page }) => {
  await page.goto("/");

  await page.locator("button", { hasText: "Tweet" }).click();

  await page.locator("input").fill("1556806528912560128");

  await page.locator("button[aria-label='search']").click();

  await expect(page).toHaveTitle("Tweet | Twinster");

  await page.screenshot({ path: `.tests/tweet.png` });
});
