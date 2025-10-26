import type { Pet } from "@/api/gen/pet-store/v1";

type Props = {
  pets: Pet[];
};

export default function PetList({ pets }: Props) {
  return (
    <ul>
      {pets.map((pet) => (
        <li key={pet.id}>{pet.name}</li>
      ))}
    </ul>
  );
}
