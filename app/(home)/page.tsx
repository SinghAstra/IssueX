"use client";
import AnimationContainer from "@/components/global/animation-container";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import NonAuthLanding from "./Non-Auth-Landing";

const HomePage = () => {
  const router = useRouter();
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  const isAuthenticating = session.status === "loading";

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/projects");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticating || isAuthenticated) {
    return (
      <div className="min-h-screen mt-20">
        <AnimationContainer delay={0.2}>
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="flex flex-col items-center justify-center p-10">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="mt-4 text-lg font-medium text-gray-300">
                {isAuthenticating ? "Authenticating..." : "Redirecting..."}
              </p>
            </CardContent>
          </Card>
        </AnimationContainer>
      </div>
    );
  }

  return <NonAuthLanding />;
};

export default HomePage;
