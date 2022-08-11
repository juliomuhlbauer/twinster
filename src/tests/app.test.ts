import { test, expect } from "@playwright/test";

test("should have Twinster | Share your tweets anywhere title", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Twinster | Share your tweets anywhere");
});
