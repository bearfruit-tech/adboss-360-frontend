"use client";

import { z } from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { authorizedApiRequest } from "@/api";
import { HttpMethods } from "@/constants/api_methods";
import { APIRoutes } from "@/constants/api_routes";
import { getCookie, hasCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { Cookies } from "@/constants/cookies";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Loader2 } from "lucide-react";
import useClientStore from "@/stores/use-client-store";
import useProjectStore from "@/stores/use-project-store";

const formSchema = z.object({
  name: z.string({ message: "The name is required" }).max(100).min(1),
  description: z.string({ message: "The description is required" }).max(100).min(1),
  client: z.string({ required_error: "client is required" }),
});

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

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

const ProjectCreateDialogue = ({ open, setOpen }: Props) => {
  const [clients, setClients] = useState<client[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const selectCurrentClient = useClientStore(
    (state) => state.selectCurrentClient
  );

  const selectCurrentProject = useProjectStore(
    (state) => state.selectCurrentProject
  );
  const client = useClientStore((state) => state.currentSelectedClient);
  const clientAdded = useClientStore((state) => state.clientAdded);
  const clientIsAdded = useClientStore((state) => state.clientIsAdded);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      client: "",
    },
  });

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
        // console.log(`all organization clients: `, data.data);
      })
      .catch((err) => {
        console.log(`Error getting clients`);
        console.log(err);
      });
  };

  const onClientChange = (value: string) => {
    const currentClient: client = clients.filter(
      (client: { id: string }) => client.id == value
    )[0];
    if (currentClient == null) {
      console.log("Selected client is null!");
      return;
    }
    selectCurrentClient({
      id: currentClient.id,
      name: currentClient.clientName,
      projects: currentClient.projects
    });
    selectCurrentProject({ id: "", name: "" });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {

    setLoading(true);
    authorizedApiRequest(
      HttpMethods.POST,
      `${APIRoutes.ORGANIZATIONS.CREATE_PROJECT}/${client.id}/projects`,
      { name: values.name, description: values.description }
    )
      .then(() => {
        setOpen(false);
        form.reset({ name: "", client: "", description: "" });
        clientIsAdded();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>
              {`Please type the name and description of the Project below and save when you're done.`}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="client"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <Select
                      onValueChange={(v: string) => {
                        onClientChange(v);
                      }}
                      defaultValue={client.id ? client.id : field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a client" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients.map((client: client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.clientName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-4">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-4">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Description here"
                        className=""
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-5">
                {loading ? (
                  <Button disabled>
                    <Loader2 className="animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button   className="cursor-pointer" type="submit">
                    Add Project
                  </Button>
                )}
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCreateDialogue;
