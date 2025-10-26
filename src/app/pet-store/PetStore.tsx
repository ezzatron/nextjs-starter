import type { Pet } from "@/api/gen/pet-store/v1";
import PetList from "./PetList";

type Props = {
  pets: Pet[];
};

export default function PetStore({ pets }: Props) {
  return (
    <main>
      <h1>Pet store</h1>

      <PetList pets={pets} />
    </main>
  );
}
