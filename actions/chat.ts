"use server";

import { db } from "@/lib/db";
import { createChatSchema } from "@/app/schemas";
import * as z from "zod";
import { auth } from "@/auth";

export const createChat = async (values: z.infer<typeof createChatSchema>) => {
    const validatedFields = createChatSchema.safeParse(values);

    const session = await auth();

    if(!session) {
        return {
            error: "You must be logged in to create a chat!"
        };
    }

    if(!session?.user?.id) {
        return {
            error: "Invalid user session!"
        };
    }

    const userId = session?.user?.id;

    if(!validatedFields.success) {
        return {
            error: "Invalid chat details!"
        };
    }

    const { name } = validatedFields.data;

    const chat = await db.chat.create({
        data: {
            name,
            userId,
        }
    });

    return {
        success: "Chat created successfully!",
        chat
    };
}

export const getAllChats = async () => {
    const session = await auth();

    if(!session) {
        return {
            error: "You must be logged in to view chats!"
        };
    }

    if(!session?.user?.id) {
        return {
            error: "Invalid user session!"
        };
    }

    const userId = session?.user?.id;

    const chats = await db.chat.findMany({
        where: {
            userId
        }
    });

    return {
        success: "Chats found!",
        chats
    };
}

export const getChat = async (id: string) => {
    const session = await auth();

    if(!session) {
        return {
            error: "You must be logged in to view a chat!"
        };
    }

    if(!session?.user?.id) {
        return {
            error: "Invalid user session!"
        };
    }

    const userId = session?.user?.id;

    const chat = await db.chat.findFirst({
        where: {
            id,
            userId
        }
    });

    if(!chat) {
        return {
            error: "Chat not found!"
        };
    }

    return {
        success: "Chat found!",
        chat
    };
}

export const getChatsByChatId = async (chatId: string) => {
    const session = await auth();

    if(!session) {
        return {
            error: "You must be logged in to view chats!"
        };
    }

    if(!session?.user?.id) {
        return {
            error: "Invalid user session!"
        };
    }

    const userId = session?.user?.id;

    const chats = await db.chat.findFirst({
        where: {
            id: chatId,
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    });

    return {
        success: "Chats found!",
        chats
    };
}

export const deleteChat = async (id: string) => {
    const session = await auth();

    if(!session) {
        return {
            error: "You must be logged in to delete a chat!"
        };
    }

    if(!session?.user?.id) {
        return {
            error: "Invalid user session!"
        };
    }

    const userId = session?.user?.id;

    const chat = await db.chat.delete({
        where: {
            id,
            userId,
            messages: {
                every: {}
            }
        },
        include: {
            messages: true
        }
    });

    return {
        success: "Chat deleted successfully!",
        chat
    };
}