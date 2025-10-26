import { expect, test } from "../playwright";

test.beforeEach(async ({ petStoreMockClient }) => {
  await petStoreMockClient.purgeStubs();
  await petStoreMockClient.addStubs({
    service: "PetStore",
    method: "GetPets",
    input: { equals: {} },
    output: {
      data: {
        pets: [
          { id: "1", name: "Fido" },
          { id: "2", name: "Whiskers" },
        ],
      },
      error: "",
    },
  });
});

test("has a heading", async ({ page }) => {
  await page.goto("/pet-store");

  await expect(page.getByRole("heading", { name: "Pet store" })).toBeVisible();
  await expect(page).toHaveScreenshot("pet-store-page.png");
});

test("lists pets", async ({ page }) => {
  await page.goto("/pet-store");

  await expect(page.getByText("Fido")).toBeVisible();
  await expect(page.getByText("Whiskers")).toBeVisible();
});
