"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
import { PageRoutes } from "@/constants/page_routes";
import { setCookie } from "cookies-next";
import { Cookies } from "@/constants/cookies";
import { authorizedApiRequest } from "@/api";
import { HttpMethods } from "@/constants/api_methods";
import { APIRoutes } from "@/constants/api_routes";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const response = await signIn.email({
      email: values.email,
      password: values.password,
    });

    if (response.error) {
      toast.error(response.error.message, {
        description: response.error.message,
      });
      console.log(response.error);
      setLoading(false);
      return;
    } else if (response.data) {
      setCookie(Cookies.ID, response.data.user.id);
      setCookie(Cookies.NAME, response.data.user.name);
      authorizedApiRequest(
        HttpMethods.GET,
        `${APIRoutes.ORGANIZATIONS.GET_ORGANIZATION}/${response.data.user.id}`,
        {}
      )
        .then((data) => {
          if (data.data[0]) {
            setCookie(Cookies.ORGANIZATION_ID, data.data[0].id);
            setCookie(Cookies.ORGANIZATION_NAME, data.data[0].name);

            toast.success("Logged in successfully");
            setLoading(false);
            router.push(PageRoutes.DASHBOARD);
            return;
          }
          toast.error("Login unsuccessful");
          setLoading(false);
          return;
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  const signInWithSocial = async () => {
    // toast.info('Coming soon');
    // return;

    signIn.social(
      {
        provider: "google",
        callbackURL: "/auth/callback",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: async (ctx) => {
          setLoading(false);
          console.log({ ctx });

          const { response } = ctx;

          if (!response.body) {
            toast.error(
              "ReadableStream not supported or response has no body."
            );
            throw new Error(
              "ReadableStream not supported or response has no body."
            );
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let result = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            result += decoder.decode(value, { stream: true });
          }

          // Final chunk
          // result += decoder.decode();

          const parsedResult: { data: { url: string; redirect: boolean } } =
            JSON.parse(result);

          // router.push(parsedResult.data.url);
          window.open(parsedResult.data.url, "_blank");
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@domain.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormDescription>
                  <a
                    href="#"
                    className="text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </FormDescription>
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
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          )}
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>
          <div
            className={cn(
              "w-full gap-2 flex items-center",
              "justify-between flex-col"
            )}
          >
            <Button
              type="button"
              variant="outline"
              className={cn("w-full gap-2")}
              disabled={loading}
              onClick={signInWithSocial}
            >
              <img src="/google.svg" alt="signin with google" />
              Sign in with Google
            </Button>
          </div>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
