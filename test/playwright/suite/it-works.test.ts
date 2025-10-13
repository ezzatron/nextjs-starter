import { expect, test } from "../playwright";

test("works", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("it works")).toBeVisible();
});
