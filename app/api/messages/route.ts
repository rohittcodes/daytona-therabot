import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getUserById } from "@/data/user";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { thera } from "@/actions/thera";

export async function POST(req: Request) {
    try {
        const session = await auth();
        const currentUser = session?.user;
        
        if (!currentUser?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { content, chatId } = body;

        if (!content || !chatId) {
            return new NextResponse("Invalid message details!", { status: 400 });
        }

        // Check if chat exists
        const chat = await db.chat.findUnique({
            where: { id: chatId }
        });

        if (!chat) {
            return new NextResponse("Invalid chat!", { status: 400 });
        }

        const user = await getUserById(currentUser.id);

        if (!user) {
            return new NextResponse("Invalid user!", { status: 400 });
        }

        // Create user's message
        const chatMessage = await db.message.create({
            data: {
                content,
                chatId,
                userId: user.id
            },
            include: {
                user: true
            }
        });

        // Trigger Pusher event for user's message
        await pusherServer.trigger(
            toPusherKey(chatId), 
            "therabot", 
            chatMessage
        );

        // Get previous messages with user data in a single query
        const previousMessages = await db.message.findMany({
            where: { chatId },
            orderBy: { createdAt: 'asc' },
            include: { user: true },
            take: -20
        });

        // Format conversation history
        const conversationHistory = previousMessages
            .map(message => {
                const username = message.user?.username || 'Unknown User';
                return message.isBot 
                    ? `Therabot: ${message.content}\n`
                    : `${username}: ${message.content}\n`;
            })
            .join('');

        // Get AI response
        const response = await thera(conversationHistory);

        if (!response) {
            return new NextResponse("Failed to get AI response", { status: 500 });
        }

        // Create bot message
        const botMessage = await db.message.create({
            data: {
                content: response,
                chatId,
                userId: user.id,
                isBot: true
            },
            include: {
                user: true
            }
        });

        // Trigger Pusher event for bot message
        await pusherServer.trigger(
            toPusherKey(chatId), 
            "therabot", 
            botMessage
        );

        return NextResponse.json({
            success: true,
            userMessage: chatMessage,
            botMessage
        });

    } catch (error) {
        console.error("Chat API Error:", error);
        return new NextResponse("An error occurred!", { status: 500 });
    }
}