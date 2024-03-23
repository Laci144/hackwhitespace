"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userPics } from "@/lib/constants";
import { toast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
const formSchema = z.object({
  username: z.string().min(2).max(50),
  pfp: z.string(),
});

type Props = {};

const page = (props: Props) => {
  const supabase = createClient();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    }
    getUser();
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      pfp: "",
    },
  });

  if (!user) {
    return (
      <main className="flex justify-center items-center -mt-20 align-top min-h-screen">
        <h1 className="text-3xl">You must be logged in to view this page</h1>
      </main>
    );
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    toast({
      title: "Profile updated",
      description: values.pfp + " " + values.username,
    });
  }

  return (
    <main className="flex justify-center items-center -mt-20 align-top min-h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="The great pretender" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pfp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile pic</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a picture" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {userPics.map((pic) => (
                      <SelectItem value={pic.alt}>
                        <Avatar>
                          <AvatarImage src={pic.src} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Select image</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center w-full">
            <Button className="" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default page;