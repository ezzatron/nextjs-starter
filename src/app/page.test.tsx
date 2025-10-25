import { expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import HomePage from "./page";

it("works", async () => {
  render(<HomePage />);

  await page.screenshot();

  await expect.element(page.getByText("it works")).toBeVisible();
});
