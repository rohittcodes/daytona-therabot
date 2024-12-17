import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateChatForm from "./create-chat";
import { getAllChats } from "@/actions/chat";
import Link from "next/link";
import ChatItem from "./chat-item";

const ChatHistory = async () => {

  const chats = await getAllChats();

  if(!chats) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  }

  if(chats.error) {
    return (
      <div>
        <span>{chats.error}</span>
        <span>Refresh the page to try again.</span>
      </div>
    );
  }

  if(!chats.chats) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="w-1/5 h-full px-2 py-2 flex flex-col rounded-md space-y-4 pr-4 border-r-[1px] border-border">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">Chat History</span>
        <Dialog>
          <DialogTrigger>
            {/* <Button variant="outline" size="icon"> */}
                <NotebookPen size={24} />
            {/* </Button> */}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                <CreateChatForm />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col space-y-2 mt-2 h-full overflow-y-auto">
        <div className="flex flex-col items-center space-y-2">
          {chats.chats.length > 0 ? (
            chats.chats.map((chat) => (
              <ChatItem key={chat.id} chat={chat} />
            ))
          ) : (
            <span>No chats found!</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
