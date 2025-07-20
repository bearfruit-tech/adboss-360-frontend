"use client";

import { Button } from "@/components/ui/button"
import ProjectCreateDialogue from "@/components/project-create"
import ClientCreateDialogue from "@/components/client-add"
import useClientStore from "@/stores/use-client-store"
import useProjectStore from "@/stores/use-project-store"
import useCreationModalsStore from "@/stores/use-modals-store"
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { MenuItem } from "@/types/menu-items.enum";
import { Header } from "@/components/header";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { Cookies } from "@/constants/cookies";
import { APIRoutes } from "@/constants/api_routes";
import { authorizedApiRequest } from "@/api";
import { HttpMethods } from "@/constants/api_methods";
import { Skeleton } from "@/components/ui/skeleton";

interface project {
  id: string;
  name: string;
}
interface client {
  id: string;
  clientName: string;
  projects: project[];
}

export default function DashboardPage() {
  const projectCreateOpen = useCreationModalsStore((state) => state.projectreateOpen)
  const clientCreateOpen = useCreationModalsStore((state) => state.clientCreateOpen)

  const changeClientCreateOpen = useCreationModalsStore((state) => state.changeClientCreateOpen);
  const changeProjectCreateOpen = useCreationModalsStore((state) => state.changeProjectCreateOpen);
  
  const [clients, setClients] = useState<client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const client = useClientStore((state) => state.currentSelectedClient);
  const project = useProjectStore((state) => state.currentSelectedProject);
  const projectAdded = useProjectStore((state) => state.projectAdded)


  useEffect(() => {
    getOrganizationClients();
  }, [projectAdded, client]);

  const getOrganizationClients = () => {
    setLoading(true);
    const id = `${getCookie(Cookies.ORGANIZATION_ID)}`;
    const url = `${APIRoutes.ORGANIZATIONS.GET_ORGANIZATION}/${id}/clients`;
    authorizedApiRequest(HttpMethods.GET, url, {})
      .then((data) => {
        setClients(data.data);
        setLoading(false);
        // console.log(`all organization clients: `, data.data);
      })
      .catch((err) => {
        console.log(`Error getting clients`);
        console.log(err);
      });
  };

  const isClientSelected = (): boolean => {
    if (client.id == "" || client.name == "") {
      return false;
    }
    return true;
  };

  const isProjectSelected = (): boolean => {
    if (project.id == "" || project.name == "") {
      return false;
    }
    return true;
  };

  return (
    <div className="flex bg-background font-lexend">
      <DashboardSidebar activeMenuItem={MenuItem.Home} />
      <div className="flex flex-col w-full">
        <Header />
        <main className="p-6">
          <h1 className="text-3xl font-normal">Dashboard</h1>
          <ProjectCreateDialogue open={projectCreateOpen} setOpen={changeProjectCreateOpen}/>
          <ClientCreateDialogue open={clientCreateOpen} setOpen={changeClientCreateOpen}/>
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
                    className="lucide lucide-user-2"
                  >
                    <circle cx="12" cy="8" r="5" />
                    <path d="M20 21a8 8 0 1 0-16 0" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-normal">
                    {isClientSelected() ? client.name : "No client is selected"}
                  </h3>
                  <p className="text-sm text-muted-foreground">Client</p>
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
                    className="lucide lucide-folder"
                  >
                    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-normal">
                    {isProjectSelected()
                      ? project.name
                      : "No project is selected"}
                  </h3>
                  <p className="text-sm text-muted-foreground">Project</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-normal">Clients & Projects</h2>
            <div className="mt-4 flex gap-3">
              <Button onClick={() => changeClientCreateOpen(true)} className="px-4 cursor-pointer py-2 font-semibold text-white shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                style={{ background: "linear-gradient(top bottom, #E4BB90, #B7926D)" }}>Add Client</Button>
              <Button onClick={() => changeProjectCreateOpen(true)} className="cursor-pointer" variant="outline">Add Project</Button>
            </div>

            {loading ? (
              <div className="mt-4 rounded-lg border font-light text-sm">
                <div className="grid grid-cols-2 border-b px-6 py-3 font-normal">
                  <Skeleton className="h-5 w-[80px]" />
                  <Skeleton className="h-5 w-[90px]" />
                </div>
                <div className="grid grid-cols-2 border-b px-6 py-4 last:border-0">
                  <Skeleton className="h-3 w-[110px]" />
                  <Skeleton className="h-3 w-[190px]" />
                </div>
                <div className="grid grid-cols-2 border-b px-6 py-4 last:border-0">
                  <Skeleton className="h-3 w-[120px]" />
                  <Skeleton className="h-3 w-[175px]" />
                </div>
                <div className="grid grid-cols-2 border-b px-6 py-4 last:border-0">
                  <Skeleton className="h-3 w-[150px]" />
                  <Skeleton className="h-3 w-[180px]" />
                </div>
                <div className="grid grid-cols-2 border-b px-6 py-4 last:border-0">
                  <Skeleton className="h-3 w-[120px]" />
                  <Skeleton className="h-3 w-[190px]" />
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-lg border font-light text-sm">
                <div className="grid grid-cols-2 border-b px-6 py-3 font-normal">
                  <div>Client</div>
                  <div>Projects</div>
                </div>
                {clients.length > 0 &&
                  clients.map((client) => (
                    <div
                      key={client.id}
                      className="grid grid-cols-2 border-b px-6 py-4 last:border-0"
                    >
                      <div>{client.clientName}</div>
                      <div className="text-muted-foreground">
                        {client.projects.map((project, pIndex) => (
                          <span key={project.id}>
                            {project.name}
                            {pIndex < client.projects.length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

