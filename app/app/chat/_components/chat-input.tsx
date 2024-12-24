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

type FormData = z.infer<typeof createMessageSchema>;

const ChatInput = ({ chatId }: ChatInputProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(createMessageSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    setIsLoading(true);

    try {
      const response = await axios.post('/api/messages', {
        content: values.content,
        chatId,
      });

      if (response.data.error) {
        console.error('API Error:', response.data.error);
        return;
      }

      form.reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.response?.data || error.message);
        // You could also show a toast notification here
      } else {
        console.error('Unexpected error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
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
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Type a message..."
                      disabled={isLoading}
                      onKeyDown={handleKeyDown}
                      className="w-full h-full border-none ring-0 focus-visible:ring-0 focus-visible:border-none focus-visible:outline-none ring-offset-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              disabled={isLoading}
              className="flex items-center justify-center h-12 w-12"
            >
              <SendHorizonal 
                size={24} 
                className={isLoading ? "opacity-50 animate-pulse" : ""}
              />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChatInput;