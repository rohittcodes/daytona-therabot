"use client";

import { useEffect, useRef, useState } from "react";
import MessageView from "./message-view";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { format } from "date-fns";

interface ChatWindowProps {
  chatId: string;
  messages: any;
}

const ChatWindow = ({ chatId, messages }: ChatWindowProps) => {
  const [initialMessages, setInitialMessages] = useState(messages.messages);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    pusherClient.subscribe(toPusherKey(chatId));

    // sort messages by createdAt
    setInitialMessages((prev: any) =>
      [...prev].sort(
        (a: any, b: any) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    );

    const messageHandler = (message: any) => {
      setInitialMessages((prev: any) => [...prev, message]);

      bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    };

    pusherClient.bind("therabot", messageHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(chatId));
      pusherClient.unbind("therabot", messageHandler);
    };
  }, [chatId]);

  
  if (!initialMessages) {
    return <div>Loading...</div>;
  }

  // console.log(initialMessages);
  return (
    <div className="w-full h-screen flex flex-col overflow-y-auto">
      <div className="w-full flex flex-col items-center justify-between">
        {initialMessages.map((message: any) => (
          <MessageView key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
