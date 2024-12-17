import { Separator } from "@/components/ui/separator";
import ChatHistory from "./_components/chat-history";

const ChatLayout = (
    { children }: { children: React.ReactNode }
) => {
    return (
        <div className="flex h-full w-full space-x-1">
            <ChatHistory />
            {children}
        </div>
    );
}
 
export default ChatLayout;