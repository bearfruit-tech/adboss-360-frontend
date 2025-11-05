import { create } from "zustand";
import { persist } from "zustand/middleware";

interface project {
  id: string;
  name: string;
}

interface client {
    id: string,
    name: string,
    projects: project[]
}

interface clientState {
    currentSelectedClient: client,
    clientAdded: boolean,

    clientIsAdded: () => void;
    selectCurrentClient: (client: client) => void
    getCurrentClient: () => client
}

const useClientStore = create<clientState>()(
    persist(
        (set, get) => ({
            currentSelectedClient: {
                id: "",
                name: "",
                projects: []
            },
            clientAdded: true,
            selectCurrentClient: ({ id, name, projects }) => set((state) => ({
                ...state,
                currentSelectedClient: {
                    id: id,
                    name: name,
                    projects: projects
                }
            })),
            getCurrentClient: () => get().currentSelectedClient,
            clientIsAdded: () => set((state) => ({
                ...state,
                clientAdded: !state.clientAdded
            }))
        }),
        {
            name: "current-client"
        }
    )
)

export default useClientStore;
