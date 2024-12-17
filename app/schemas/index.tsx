import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const registerSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  username: z.string().min(3, {
    message: "Username must be at least 3 characters long",
  }),
});

export const createChatSchema = z.object({
  name: z.string().min(1, {
    message: "Chat name is required",
  })
});

export const createMessageSchema = z.object({
  content: z.string().min(1, {
    message: "Message content is required",
  })
});