'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { authClient } from '@/lib/auth-client';
import { getCookie } from 'cookies-next';
import { Cookies } from '@/constants/cookies';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export function CompanyInviteForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const router = useRouter();
  const [invites, setInvites] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.email) {
      setInvites([...invites, values.email]);
      alert(getCookie(Cookies.BEARER_TOKEN))
      await authClient.organization.inviteMember({
        organizationId: "rv9V2Lr9qJUQWctSUjXWvkNaHFl4wWhe",
        email: values.email,
        role: "admin", //this can also be an array for multiple roles (e.g. ["admin", "sale"])

        fetchOptions: {
          onSuccess: ()=>{
            toast.success('Invite sent successfully from onSuccess');
          },
          onError: ()=>{
            toast.success('Invite was unsuccessful');
          },
          credentials: 'include',
          auth: {
            type:"Bearer",
            token: () => {
              return getCookie(Cookies.BEARER_TOKEN) || ""
            }
          }
        }
      })
      form.reset({ email: '' });
      toast.success('Invite sent successfully');
    }
  };

  const handleFinish = () => {
    router.push('/dashboard');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('flex flex-col gap-6', className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-text-black">Invite your colleagues</h1>
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
            <Button type="submit" className="bg-dark-purple">
              Invite
            </Button>
          </div>

          {invites.length > 0 && (
            <div className="space-y-2">
              {invites.map((email, index) => (
                <div key={index} className="flex items-center gap-3 p-2 border rounded-lg">
                  <Avatar>
                    <AvatarFallback>{email.charAt(0).toUpperCase()}</AvatarFallback>
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
