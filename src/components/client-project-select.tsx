import useCreationModalsStore from "@/stores/use-modals-store";
import ProjectCreateDialogue from "./project-create";
import ClientCreateDialogue from "./client-add";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import useClientStore from "@/stores/use-client-store";
import useProjectStore from "@/stores/use-project-store";
import { getCookie, hasCookie } from "cookies-next";
import { Cookies } from "@/constants/cookies";
import { APIRoutes } from "@/constants/api_routes";
import { authorizedApiRequest } from "@/api";
import { HttpMethods } from "@/constants/api_methods";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ChevronDown, Folder, UserIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface project {
  id: string;
  name: string;
}
interface client {
  id: string;
  clientName: string;
  organisationId: string;
  projects: project[];
}

const ClientProjectSelect = () => {
  const [clients, setClients] = useState<client[]>([]);
  const [projects, setProjects] = useState<project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const projectCreateOpen = useCreationModalsStore(
    (state) => state.projectreateOpen
  );

  const clientCreateOpen = useCreationModalsStore(
    (state) => state.clientCreateOpen
  );

  const changeClientCreateOpen = useCreationModalsStore(
    (state) => state.changeClientCreateOpen
  );

  const changeProjectCreateOpen = useCreationModalsStore(
    (state) => state.changeProjectCreateOpen
  );

  const selectCurrentClient = useClientStore(
    (state) => state.selectCurrentClient
  );

  const selectCurrentProject = useProjectStore(
    (state) => state.selectCurrentProject
  );

  const client = useClientStore((state) => state.currentSelectedClient);
  const project = useProjectStore((state) => state.currentSelectedProject);
  const clientAdded = useClientStore((state) => state.clientAdded);

  useEffect(() => {
    if (hasCookie(Cookies.ORGANIZATION_ID)) {
      getOrganizationClients();
    }
  }, [clientAdded]);

  const getOrganizationClients = async () => {
    const id = `${getCookie(Cookies.ORGANIZATION_ID)}`;
    const url = `${APIRoutes.ORGANIZATIONS.GET_ORGANIZATION}/${id}/clients`;
    authorizedApiRequest(HttpMethods.GET, url, {})
      .then((data) => {
        setClients(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(`Error getting clients`);
        console.log(err);
        setLoading(false);
      });
  };

  const getClientProjects = async (clientID: string) => {
    if (clientID == "") {
      console.log("clientID is empty");
      return;
    }
    const currentClient: client = clients.filter(
      (client: { id: string }) => client.id == clientID
    )[0];
    if (currentClient == null) {
      console.log("Selected client is null!");
      return;
    }

    selectCurrentClient({
      id: currentClient.id,
      name: currentClient.clientName,
      projects: currentClient.projects,
    });

    selectCurrentProject({ id: "", name: "" });

    if (currentClient.projects) {
      setProjects(currentClient.projects);
    }
  };

  const onProjectSelect = (id: string) => {
    if (id == "") {
      console.log(`projectID is empty!`);
      return;
    }
    const project: project = projects.filter(
      (project: { id: string; name: string }) => project.id == id
    )[0];
    if (project == null) {
      console.log("selected project is null!");
      return;
    }
    selectCurrentProject({ id: project.id, name: project.name });
  };

  const canSelectAProject = (): boolean => {
    if (client.id == "" || client.name == "") {
      return false;
    }
    return true;
  };

  return (
    <>
      <ProjectCreateDialogue
        open={projectCreateOpen}
        setOpen={changeProjectCreateOpen}
      />
      <ClientCreateDialogue
        open={clientCreateOpen}
        setOpen={changeClientCreateOpen}
      />

      {loading ? (
        // show on clients loading
        <>
          <Skeleton className="h-8 w-[180px]" />
          <Skeleton className="h-8 w-[180px]" />
        </>
      ) : (
        // show when clients loaded
        <>
          {clients.length > 0 ? (
            // show when have clients
            <>
              <Select
                onValueChange={(value) => getClientProjects(value)}
                defaultValue={client.id && client.id}
              >
                <SelectTrigger className="w-[180px]">
                  <UserIcon />
                  <SelectValue placeholder="Select Client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.length &&
                    clients.map(
                      (client: { id: string; clientName: string }) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.clientName}
                        </SelectItem>
                      )
                    )}
                </SelectContent>
              </Select>

              {canSelectAProject() ? (
                // when have current client selected
                <>
                  {client.projects.length ? (
                    // show when current client selected have projects
                    <Select
                      disabled={!canSelectAProject()}
                      onValueChange={(value) => onProjectSelect(value)}
                      defaultValue={project.id && project.id}
                    >
                      <SelectTrigger className="w-[180px]">
                        <Folder />
                        <SelectValue placeholder="Select Project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map(
                          (project: { id: string; name: string }) => (
                            <SelectItem key={project.id} value={project.id}>
                              {project.name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  ) : (
                    // show when current selected client have no projects
                    <Button
                      onClick={() => changeProjectCreateOpen(true)}
                      className="cursor-pointer"
                      variant="outline"
                    >
                      Add Project
                    </Button>
                  )}
                </>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className=" text-gray-500" variant="outline">
                        <Folder />
                        Select Project
                        <ChevronDown />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select a project client first</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </>
          ) : (
            // show when have no clients
            <>
              <Button
                className="px-4 cursor-pointer py-2 font-semibold text-white shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                style={{
                  background: "linear-gradient(top bottom, #E4BB90, #B7926D)",
                }}
                onClick={() => changeClientCreateOpen(true)}
              >
                Add Client
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="cursor-pointer" variant="outline">
                      Add Project
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select a project client first</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ClientProjectSelect;
