"use client"

import { z } from "zod";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { apiRequest } from "@/api";
import { HttpMethods } from "@/constants/api_methods";
import { APIRoutes } from "@/constants/api_routes";
import { getCookie } from "cookies-next";

const formSchema = z.object({
    name: z.string({message: "The name is required"})
        .max(100),
    description: z.string({message: "The description is required"})
        .max(100),
})

interface Props {
    open: boolean,
    setOpen: (value: boolean) => void
}

const ProjectCreateDialogue = ({open, setOpen}: Props) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          description: ""
        },
      })

      const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
        const clientId = getCookie('id');
        apiRequest(HttpMethods.POST, `${APIRoutes.ORGANIZATIONS.CREATE_PROJECT}/${clientId}/projects`,
            {name: values.name, description: values.description})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            })
      }

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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Name</FormLabel>
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
                        <Button type="submit">Save Project</Button>
                        </DialogFooter>
                        </form>
                    </Form>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default ProjectCreateDialogue;