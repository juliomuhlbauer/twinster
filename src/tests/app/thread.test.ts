import { test, expect } from "@playwright/test";

const threadId = "1557674101652824065";

test("should fetch thread", async ({ page }, testInfo) => {
  await page.goto("/");

  await page.locator("button", { hasText: "Thread" }).click();

  await page.locator("input").fill(threadId);

  await page.locator("button[aria-label='search']").click();

  await expect(page).toHaveURL(`/thread?id=${threadId}`);

  // await expect(page).toHaveTitle("Thread | Twinster");

  await page.screenshot({
    path: `.tests/${testInfo.project.name}/thread.png`,
  });
});
