import { page } from "@vitest/browser/context";
import { beforeEach, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import HomePage from "./page";

beforeEach(() => {
  render(<HomePage />);
});

it("works", async () => {
  await expect.element(page.getByText("it works")).toBeVisible();
});
