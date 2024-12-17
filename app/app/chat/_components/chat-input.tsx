"use client";

import { createMessageSchema } from "@/app/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizonal } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";

interface ChatInputProps {
  chatId: string;
}

const ChatInput = ({ chatId }: ChatInputProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof createMessageSchema>>({
    resolver: zodResolver(createMessageSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (values: z.infer<typeof createMessageSchema>) => {
    try {
      const data = {
        values,
        chatId,
      };
        form.reset();
        setIsLoading(true);
      axios.post(`/api/messages`, data).then((response) => {
        if (response.data.error) {
          console.error(response.data.error);
        }
        setIsLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          autoComplete="off"
        >
          <div className="flex items-center border border-border rounded-md">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex-1 h-12">
                  <Input
                    {...field}
                    placeholder="Type a message..."
                    className="w-full h-full border-none ring-0 focus-visible:ring-0 focus-visible:border-none focus-visible:outline-none ring-offset-0 focus-visible:ring-offset-0"
                  />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="flex items-center h-12 w-12"
            >
              <SendHorizonal size={24} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChatInput;
