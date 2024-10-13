"use client";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/Icons";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const GetStarted = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";
  const isAuthenticating = status === "loading";

  const handleClick = () => {
    if (isAuthenticated) {
      router.push("/blog");
    } else if (!isAuthenticated && !isAuthenticating) {
      router.push("/auth/sign-in");
    }
  };

  return isAuthenticating ? (
    <Button variant="outline" size="lg">
      <Icons.spinner className="animate-spin mr-2" />
      Wait...
    </Button>
  ) : (
    <Button
      onClick={handleClick}
      disabled={isAuthenticating}
      className="cursor-pointer lg"
    >
      Get Started
    </Button>
  );
};

export default GetStarted;
