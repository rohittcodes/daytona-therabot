import { getChatsByChatId } from "@/actions/chat";
import ChatInput from "../_components/chat-input";
import ChatWindow from "../_components/chat-window";
import { redirect } from "next/navigation";

const ChatBotPage = async ({ params } : { params: { chat: string } }) => {
    const chatId = params.chat;

    const messages = await getChatsByChatId(chatId);

    if(messages.error) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <span>{messages.error}</span>
            </div>
        );
    }
    
    if(!messages){
        redirect("/app/chat");
    }

    if(!messages.chats) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <span>No messages found!</span>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-between">
            <ChatWindow chatId={chatId} messages={messages.chats} />
            <ChatInput chatId={chatId} />
        </div>
    )
}

export default ChatBotPage;