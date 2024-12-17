"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createChatSchema } from "@/app/schemas";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { createChat } from "@/actions/chat";
import { useRouter } from "next/navigation";

const CreateChatForm = () => {

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const router = useRouter();
    
    const form = useForm<z.infer<typeof createChatSchema>>({
        resolver: zodResolver(createChatSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof createChatSchema>) => {
        startTransition(() => {
            setError("");
            setSuccess("");
        
            // console.log(values); 
            createChat(values).then((response) => {
                setError(response?.error);
                setSuccess(response?.success);
                if(response?.success) {
                    router.push(`/app/chat/${response?.chat?.id}`);
                    router.refresh();
                    window.location.reload();
                }
            });
        });
    }

    return ( 
        <div>
            <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Chat Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Enter a name for the chat"
                      className="block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isPending} className="w-full" variant="outline">
            {isPending ? "Loading..." : "Create Chat"}
          </Button>
        </form>
      </Form>
        </div>
     );
}
 
export default CreateChatForm;