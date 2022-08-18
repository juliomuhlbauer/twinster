import { test, expect } from "@playwright/test";

test("should twinster logo ve visible", async ({ page }) => {
  await page.goto("/");

  // await expect(page).toHaveTitle("Twinster | Share your tweets anywhere");

  await expect(page.locator("h2", { hasText: "twinster" })).toBeVisible();
});
