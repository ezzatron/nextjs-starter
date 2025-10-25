import { beforeEach, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import HomePage from "./page";

beforeEach(() => {
  render(<HomePage />);
});

it("works", async () => {
  await page.screenshot();

  await expect.element(page.getByText("it works")).toBeVisible();
});
