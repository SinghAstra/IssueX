import Footer from "@/components/navigation/footer";
import Navbar from "@/components/navigation/navbar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full z-0 relative">{children}</main>
      <Footer />
    </>
  );
};

export default HomeLayout;
