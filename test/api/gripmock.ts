export interface GripmockClient {
  addStubs: (stubs: GripmockStub | GripmockStub[]) => Promise<string[]>;
  purgeStubs: () => Promise<void>;
}

export interface GripmockStub {
  service: string;
  method: string;
  input: GripmockStubInput;
  output: GripmockStubOutput;
}

export interface GripmockStubInput {
  equals?: Record<string, unknown>;
}

export interface GripmockStubOutput {
  data?: object;
  error?: string;
}

export function createGripmockClient(adminURL: string): GripmockClient {
  return {
    addStubs: async (stubs) => {
      const response = await fetch(new URL("/api/stubs", adminURL), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stubs),
      });

      return response.json() as Promise<string[]>;
    },

    purgeStubs: async () => {
      await fetch(new URL("/api/stubs", adminURL), { method: "DELETE" });
    },
  };
}
