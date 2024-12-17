"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import Markdown from "markdown-to-jsx";

interface MessageViewProps {
  message: any;
}

const MessageView = ({ message }: MessageViewProps) => {
  const user = useCurrentUser();

  if (!user) return null;

  return (
    <div
      className={`flex flex-col w-full items-${
        message.isBot ? "start" : "end"
      } mb-4`}
    >
      <div
        className={`${
          message.isBot ? "flex-row" : "flex-row-reverse"
        } flex items-center justify-between w-full`}
      >
        <div
          className={`flex flex-col bg-background rounded-lg w-[80%] p-1 ${
            message.isBot ? "items-start" : "items-end"
          }`}
        >
          <div className={`flex items-center space-x-2 rounded-2xl bg-muted p-2 ${message.isBot ? "items-start" : "items-end"}`}>
            {message.isBot ? (
              <Avatar>
              <AvatarFallback>Therabot</AvatarFallback>
              <AvatarImage
                src="/logo.svg"
                alt="Therabot"
              />
            </Avatar>
            ) : null }
            <Markdown options={{ forceBlock: true }}>
              {message.content}
            </Markdown>
            {!message.isBot ? (
              <Avatar>
                <AvatarFallback>{user.name}</AvatarFallback>
                <AvatarImage
                  src={user.image as string}
                  alt={user.name as string}
                />
              </Avatar>
            ) : null }
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageView;
