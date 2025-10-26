import { expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import PetList from "./PetList";

it("lists pets", async () => {
  render(
    <PetList
      pets={[
        { id: 1, name: "Fido" },
        { id: 2, name: "Whiskers" },
      ]}
    />,
  );

  await expect.element(page.getByText("Fido")).toBeVisible();
  await expect.element(page.getByText("Whiskers")).toBeVisible();
});
