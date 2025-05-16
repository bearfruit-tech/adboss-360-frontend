"use client"

import { Button } from "@/components/ui/button"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { MenuItem } from "@/types/menu-items.enum"
import { Header } from "@/components/header"
import { useEffect, useState } from "react"
import ProjectCreateDialogue from "@/components/project-create"
import ClientCreateDialogue from "@/components/client-add"
import { authClient } from "@/lib/auth-client"

export default function DashboardPage() {
  const [createProjectModal, setCreateProjectModal] = useState<boolean>(false)
  const [addClientModal, setAddClientModal] = useState<boolean>(false)

  const changeCreateProjectModal = (value: boolean) => {
    setCreateProjectModal(value)
  }

  const changeAddClientModal = (value: boolean) => {
    setAddClientModal(value)
  }


  return (
    <div className="flex bg-background font-lexend">
      <DashboardSidebar activeMenuItem={MenuItem.Home} organisationName="Experience Adverts"/>
      <div className="flex flex-col w-full">
        <Header />
        <main className="p-6">
          <h1 className="text-3xl font-normal">Dashboard</h1>
          <ProjectCreateDialogue open={createProjectModal} setOpen={changeCreateProjectModal}/>
          <ClientCreateDialogue open={addClientModal} setOpen={changeAddClientModal}/>
          <section className="mt-8">
            <h2 className="text-xl font-normal">Current Selection</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center gap-4 rounded-md bg-muted/50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-folder"
                  >
                    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-normal">Campaign Launch</h3>
                  <p className="text-sm text-muted-foreground">Project</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-md bg-muted/50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-user-2"
                  >
                    <circle cx="12" cy="8" r="5" />
                    <path d="M20 21a8 8 0 1 0-16 0" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-normal">GlobalTech Solutions</h3>
                  <p className="text-sm text-muted-foreground">Client</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-normal">Clients & Projects</h2>
            <div className="mt-4 flex gap-3">
              <Button onClick={() => setAddClientModal(true)} className="px-4 cursor-pointer py-2 font-semibold text-white shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                style={{ background: "linear-gradient(top bottom, #E4BB90, #B7926D)" }}>Add Client</Button>
              <Button onClick={() => setCreateProjectModal(true)} className="cursor-pointer" variant="outline">Add Project</Button>
            </div>

            <div className="mt-4 rounded-lg border font-light text-sm">
              <div className="grid grid-cols-2 border-b px-6 py-3 font-normal">
                <div>Client</div>
                <div>Projects</div>
              </div>

              {clients.map((client, index) => (
                <div key={index} className="grid grid-cols-2 border-b px-6 py-4 last:border-0">
                  <div>{client.name}</div>
                  <div className="text-muted-foreground">
                    {client.projects.map((project, pIndex) => (
                      <span key={pIndex}>
                        {project}
                        {pIndex < client.projects.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

const clients = [
  {
    name: "TechStart Innovations",
    projects: ["Project Alpha", "Project Beta"],
  },
  {
    name: "FitLife Dynamics",
    projects: ["Project Gamma", "Project Delta"],
  },
  {
    name: "CreativeGen Studios",
    projects: ["Project Epsilon", "Project Zeta"],
  },
  {
    name: "EduTech Nexus",
    projects: ["Project Theta", "Project Eta"],
  },
  {
    name: "EcoGreen Ventures",
    projects: ["Project Iota", "Project Kappa"],
  },
]


