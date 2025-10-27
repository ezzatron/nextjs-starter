import { expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import HomePage from "./page";

it("has a heading", async () => {
  await render(<HomePage />);

  await expect
    .element(page.getByRole("heading", { name: "Home" }))
    .toBeVisible();

  await page.screenshot();
});
