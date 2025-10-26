import { createPetStoreClient } from "@/api/pet-store/client";
import PetStore from "./PetStore";

export const dynamic = "force-dynamic";

export default async function PetStorePage() {
  const client = createPetStoreClient();
  const { pets } = await client.getPets({});

  return <PetStore pets={pets} />;
}
