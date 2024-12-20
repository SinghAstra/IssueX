"use client";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGithubSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn("github", {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.log("GitHub authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full mt-5" onClick={handleGithubSignIn}>
      <Button
        variant="outline"
        className="w-full bg-background"
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.loader className="animate-spin mr-2" />
        ) : (
          <Icons.gitLogo className="mr-2 h-4 w-4" />
        )}
        Continue with Github
      </Button>
    </div>
  );
};

export default SignInPage;
