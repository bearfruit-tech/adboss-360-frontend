"use client"

import { z } from "zod";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { apiRequest, authorizedApiRequest } from "@/api";
import { HttpMethods } from "@/constants/api_methods";
import { APIRoutes } from "@/constants/api_routes";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Cookies } from "@/constants/cookies";

const formSchema = z.object({
    clientName: z.string({message: "The name is required"})
        .max(100),
    description: z.string({message: "The description is required"})
        .max(100),
    websiteUrl: z.string({message: "websiteUrl is required"}).url({message: "The Url link must be valid."}),
    contactPerson: z.string({message: "Contact person is required"})
})

interface IUseListOrganization {
    id: string,
    name: string,
    slug: string,
    createdAt: Date
}

interface Props {
    open: boolean,
    setOpen: (value: boolean) => void
}

const ClientCreateDialogue = ({open, setOpen}: Props) => {
    const [organisationId, setOrganisationId] = useState<string>("");    

    useEffect(() => {
        getfullOrganization()
      }, [])
    
      async function getfullOrganization() {
      const getOrganization = await authClient.organization.getFullOrganization({
          query: {
              organizationId: "O3M1z5LxPuXyVaRNVXqp9Kwf7ep2qdS4",
              organizationSlug: ""
          }
      })
      if(!getOrganization.error){
        setOrganisationId(getOrganization.data.id);
      }
      console.log("active : ", getOrganization.data)
    }


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          clientName: "",
          description: "",
          websiteUrl: "",
          contactPerson: ""
        },
      })

      const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
        setOpen(false)
        const orgId = getCookie(Cookies.ORGANIZATION_ID);
        const url = `${APIRoutes.ORGANIZATIONS.GET_ORGANIZATION}/${orgId}/clients`;
        authorizedApiRequest(HttpMethods.POST, url,
            {clientName: values.clientName,
            description: values.description,
            websiteUrl: values.websiteUrl,
            contactPerson: values.contactPerson})
            .then(response => {
                console.log("respone ,", response);
            })
            .catch(error => {
                console.log("err ", error)
            })
      }

    return (
        <>
            <Dialog open={open} onOpenChange={() => setOpen(!open)}>
                <DialogContent className="sm:max-w-[425px] md:max-w-[525px]">
                    <DialogHeader>
                    <DialogTitle>Add a Client</DialogTitle>
                    <DialogDescription>
                        {`Please fill in the required fields below for the client and save when done.`}
                    </DialogDescription>
                    </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="clientName"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>ClientName</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ClientName" {...field} />
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
                            <FormField
                                control={form.control}
                                name="contactPerson"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className="mt-4">Contact Person</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contact Person..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            <FormField
                                control={form.control}
                                name="websiteUrl"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className="mt-4">Website URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Website URL..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            <DialogFooter className="mt-5">
                                <Button className="cursor-pointer" type="submit">Save Client</Button>
                            </DialogFooter>
                            </form>
                        </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ClientCreateDialogue;