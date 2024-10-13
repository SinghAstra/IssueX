"use client";
import AnimationContainer from "@/components/global/animation-container";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import AuthLanding from "./Auth-Landing";
import NonAuthLanding from "./Non-Auth-Landing";

const HomePage = () => {
  const session = useSession();
  const isAuthenticated = session.status === "authenticated" ? true : false;
  const isAuthenticating = session.status === "loading" ? true : false;

  return (
    <div className="pt-20 overflow-x-hidden no-scrollbar size-full">
      {isAuthenticating ? (
        <div className="min-h-screen mt-20">
          <AnimationContainer delay={0.2}>
            <Card className="w-full max-w-md mx-auto">
              <CardContent className="flex flex-col items-center justify-center p-10">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="mt-4 text-lg font-medium text-gray-300">
                  Authenticating...
                </p>
              </CardContent>
            </Card>
          </AnimationContainer>
        </div>
      ) : isAuthenticated ? (
        <AuthLanding />
      ) : (
        <NonAuthLanding />
      )}
    </div>
  );
};

export default HomePage;
