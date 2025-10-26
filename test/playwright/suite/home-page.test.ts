import { expect, test } from "../playwright";

test("has a heading", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Home" })).toBeVisible();
  await expect(page).toHaveScreenshot("home-page.png");
});
