import { create } from "zustand";
import { persist } from "zustand/middleware";


interface project {
    id: string,
    name: string
}

interface projectState {
    currentSelectedProject: project,
    projectAdded: boolean,

    projectIsAdded: () => void,
    selectCurrentProject: (project: project) => void,
    getCurrentProject: () => project
}

const useProjectStore = create<projectState>()(
    persist(
        (set, get) => ({
            currentSelectedProject: {
                id: "",
                name: ""
            },
            projectAdded: true,
            projectIsAdded: () => set((state) => ({
                ...state,
                projectAdded: !state.projectAdded
            })),
            selectCurrentProject: ({ id, name }) => set((state) => ({
                ...state,
                currentSelectedProject: {
                    id: id,
                    name: name
                }
            })),
            getCurrentProject: () => get().currentSelectedProject
        }),
        {
            name: "current-project"
        }
    )
)

export default useProjectStore;