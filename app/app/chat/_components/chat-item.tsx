"use client";

import { deleteChat } from "@/actions/chat";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface ChatItemProps {
  chat: any;
}

const ChatItem = ({ chat }: ChatItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  // handle deleting a chat
  const handleDelete = async () => {
    const res = await deleteChat(chat.id);

    if (res.error) {
      console.error(res.error);
      return;
    }

    // console.log(res.success);

    // refresh the page
    router.refresh();
    window.location.reload();
    router.replace(`${process.env.NEXT_PUBLIC_URL}/app/chat`);
  };

  // console.log(pathname);

  const isActive = pathname === `/app/chat/${chat.id}`;

  return (
    <div className="flex items-center justify-between w-full">
      <Link href={`/app/chat/${chat.id}`} className="w-full mr-2">
        <div
          className={`flex items-center w-full cursor-pointer justify-between px-4 py-2 rounded-md hover:bg-border ${
            isActive ? "bg-border " : ""
          }`}
        >
          <span>{chat.name}</span>
        </div>
      </Link>

      <Dialog>
        <DialogTrigger>
          {/* <Button variant="outline" size="icon"> */}
            <Trash2Icon size={24} className="cursor-pointer hover:text-red-500" />
          {/* </Button> */}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <span>
              Deleting this chat will permanently remove it from the system.
            </span>
          </DialogDescription>
          <DialogFooter>
            <Button variant="destructive" onClick={handleDelete} className="flex items-center gap-x-1">
              Delete <Trash2Icon size={24} />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatItem;
