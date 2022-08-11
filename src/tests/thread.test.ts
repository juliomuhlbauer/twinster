import { test, expect } from "@playwright/test";

test("should fetch thread", async ({ page }) => {
  await page.goto("/");

  await page.locator("button", { hasText: "Thread" }).click();

  await page.locator("input").fill("1557674101652824065");

  await page.locator("button[aria-label='search']").click();

  await expect(page).toHaveTitle("Thread | Twinster");

  await page.screenshot({ path: `.tests/thread.png` });
});
