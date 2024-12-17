"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full h-full space-y-4">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-bold">Welcome to TheraBot!</h1>
        <p className="text-lg">Please login to start using the app.</p>
      </div>
      <Link href="/auth/login">
        <Button variant="outline">
          Login
        </Button>
      </Link>
    </main>
  );
}
