"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
// import { getCookie } from "cookies-next";
// import { Cookies } from "@/constants/cookies";
// import { authorizedApiRequest } from "@/api";
// import { HttpMethods } from "@/constants/api_methods";
// import { APIRoutes } from "@/constants/api_routes";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export function CompanyInviteForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [invites, setInvites] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const emails = new Set(invites);
    if (emails.has(values.email)) {
      toast.warning("An invitation has already been sent!");
      return;
    }

    if (!values.email) {
      return;
    }

    try {
      // setLoading(true);
      // const url = `${APIRoutes.ORGANIZATIONS.GET_ORGANIZATION}/${getCookie(
      //   Cookies.ORGANIZATION_ID
      // )}/invitation`;
      // const invitation = await authorizedApiRequest(HttpMethods.POST, url, {
      //   orgId: `${getCookie(Cookies.ORGANIZATION_ID)}`,
      //   email: values.email,
      //   userId: `${getCookie(Cookies.ID)}`,
      //   orgName: `${getCookie(Cookies.ORGANIZATION_NAME)}`,
      // });

      setLoading(false);
      setInvites([...invites, values.email]);
      form.reset({ email: "" });
      toast.success("Invitation sent successfully.");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFinish = () => {
    router.push("/dashboard");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-text-black">
            Invite your colleagues
          </h1>
          <p className="text-muted-foreground text-sm text-balance">
            Invite colleagues to organisation
          </p>
        </div>
        <div className="grid gap-6">
          <div className="flex items-end gap-1 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-3 w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {loading ? (
              <Button disabled>
                <Loader2 className="animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="bg-dark-purple">
                Invite
              </Button>
            )}
          </div>

          {invites.length > 0 && (
            <div className="space-y-2">
              {invites.map((email, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 border rounded-lg"
                >
                  <Avatar>
                    <AvatarFallback>
                      {email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="flex-1">{email}</span>
                  <Badge variant="secondary">Invite sent</Badge>
                </div>
              ))}
            </div>
          )}

          <Button type="button" onClick={handleFinish} className="w-full">
            Finish
          </Button>
        </div>
      </form>
    </Form>
  );
}
