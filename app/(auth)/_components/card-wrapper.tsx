"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "./header";
import SocialAuth from "./social-auth";
import BackButton from "./back-button";
import Image from "next/image";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonText: string;
  backButtonHref: string;
  btnType: "login" | "register" | "none";
}

const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonText,
  btnType,
}: CardWrapperProps) => {
  return (
    <Card className="shadow-md w-[720px] sm:rounded-lg my-30 border-none">
      <CardHeader>
        <div className="sm:mx-auto sm:w-full space-y-4">
          <Image src="/logo.svg" width={44} height={44} alt="logo" className="mx-auto" />
          <Header label={headerLabel} />
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent> 
      <div className="w-full flex justify-center items-center px-8">
        <div className="h-px w-1/2 bg-border" />
          <p className="text-gray-400 mx-2">OR</p>
        <div className="h-px w-1/2 bg-border" />
      </div>
      <CardFooter className="flex flex-col items-center mt-4">
        {btnType!=="none" && <SocialAuth />}
        <BackButton href={backButtonHref} text={backButtonText} btnType={btnType} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
