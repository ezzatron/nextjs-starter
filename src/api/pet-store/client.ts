import { createChannel, type Channel } from "nice-grpc";
import { petStoreAddress } from "../../env";
import { clientFactory } from "../client-factory";
import { PetStoreDefinition, type PetStoreClient } from "../gen/pet-store/v1";

export function createPetStoreClient(): PetStoreClient {
  return clientFactory.create(PetStoreDefinition, getPetStoreChannel());
}

function getPetStoreChannel(): Channel {
  return (global.petStoreChannel ??= createChannel(
    `${petStoreAddress.value().host}:${petStoreAddress.value().port}`,
  ));
}

declare global {
  var petStoreChannel: Channel | undefined;
}
