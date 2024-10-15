"use client";
import AnimationContainer from "@/components/global/animation-container";
import MaxWidthWrapper from "@/components/global/max-width-wrapper";
import { BentoCard, BentoGrid, featureCards } from "@/components/ui/bento-grid";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/Icons";
import MagicBadge from "@/components/ui/magic-badge";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { siteConfig } from "@/config/site";
import { COMPANIES } from "@/lib/constants/companies";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GetStarted from "./GetStarted";

const HomePage = () => {
  const session = useSession();
  const router = useRouter();
  const isAuthenticated = session.status === "authenticated";

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/projects");
    }
  }, [isAuthenticated, router]);

  return (
    <>
      <MaxWidthWrapper>
        <div className="flex flex-col items-center justify-center w-full text-center bg-gradient-to-t from-background mt-20">
          <AnimationContainer className="flex flex-col items-center justify-center w-full text-center">
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              className="relative inline-flex h-10 overflow-hidden rounded-full p-[1.5px] focus:outline-none select-none"
            >
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,hsl(var(--primary))_0%,hsl(var(--primary-foreground))_50%,hsl(var(--primary))_100%)]" />

              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[hsl(var(--background))] px-4 py-1 text-sm font-medium text-[hsl(var(--foreground))] backdrop-blur-3xl">
                Follow Along on twitter
                <Icons.next className="ml-2 size-6 animate-moveLeftRight" />
              </span>
            </Link>
            <h1 className="text-foreground text-center py-6 text-5xl font-medium tracking-normal text-balance sm:text-6xl md:text-7xl lg:text-8xl !leading-[1.15] w-full font-heading">
              Revolutionize Your{" "}
              <span className="text-transparent bg-gradient-to-r from-[#5daaf1] to-primary bg-clip-text inline-bloc">
                Code Reviews
              </span>
            </h1>
            <TextGenerateEffect
              className="mb-12 text-lg tracking-tight text-muted-foreground md:text-xl text-balance"
              words="Automate your GitHub PR reviews with AI-powered insights"
            />
            <div className="flex items-center justify-center gap-4">
              <GetStarted />
              <Link
                href={siteConfig.links.github}
                target="_blank"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" })
                )}
              >
                GitHub
              </Link>
            </div>
          </AnimationContainer>

          {/* <AnimationContainer
            delay={0.4}
            className="relative my-20 md:mt-32 p-2 bg-transparent w-full rounded-md lg:rounded-xl"
          >
            <BorderBeam size={400} duration={8} delay={9} />
            <Image
              src="/assets/dashboard-dark.svg"
              alt="Dashboard"
              width={1200}
              height={1200}
              quality={100}
              className="rounded-md lg:rounded-xl bg-foreground/10 ring-1 ring-border"
            />
            <div className="absolute -bottom-4 inset-x-0 w-full h-1/2 bg-gradient-to-t from-background z-40"></div>
            <div className="absolute bottom-0 md:-bottom-8 inset-x-0 w-full h-1/4 bg-gradient-to-t from-background z-50"></div>
          </AnimationContainer> */}
        </div>
      </MaxWidthWrapper>

      {/* Companies Section */}
      <MaxWidthWrapper>
        <AnimationContainer delay={0.4}>
          <div className="py-14">
            <div className="mx-auto px-4 md:px-8">
              <h2 className="text-center text-sm font-medium font-heading text-neutral-400 uppercase">
                Trusted by the best in the industry
              </h2>
              <div className="mt-8">
                <ul className="flex flex-wrap items-center gap-x-6 gap-y-6 md:gap-x-16 justify-center">
                  {COMPANIES.map((company) => (
                    <li key={company.name}>
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={80}
                        height={80}
                        quality={100}
                        className="w-28 h-auto"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </AnimationContainer>
      </MaxWidthWrapper>

      {/* Features Section */}
      <MaxWidthWrapper className="pt-10">
        <AnimationContainer delay={0.8}>
          <div className="flex flex-col w-full items-center lg:items-center justify-center py-8">
            <MagicBadge title="Features" />
            <h2 className="text-center lg:text-center text-3xl md:text-5xl !leading-[1.1] font-medium font-heading text-foreground mt-6">
              Automate Your GitHub PR Reviews
            </h2>
            <p className="mt-4 text-center lg:text-center text-lg text-muted-foreground max-w-lg">
              With our automatic PR review system, you can receive timely
              reviews, and enhance collaboration—all while ensuring code quality
              in every pull request.
            </p>
          </div>
        </AnimationContainer>
        <AnimationContainer delay={0.2}>
          <BentoGrid className="py-8">
            {featureCards.map((feature, idx) => (
              <BentoCard key={idx} {...feature} />
            ))}
          </BentoGrid>
        </AnimationContainer>
      </MaxWidthWrapper>
    </>
  );
};

export default HomePage;
