"use client";

import LeftBar from "@components/Bar";
import { Button } from "@components/ui/button";
import useLayoutStore from "@zustand/store/layoutstore/store";
import { Menu } from "lucide-react";
import { signOut } from "next-auth/react";
import { PropsWithChildren } from "react";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { toggleCollapsed } = useLayoutStore((state) => state);
  return (
    <main className="flex w-full h-screen bg-[#161719]">
      <LeftBar />
      <div className="content w-full h-full overflow-y-auto bg-[#1f2125] rounded-tl-3xl border-l-2 border-t-2 border-zinc-700">
        {/**<Breadcrumb /> */}
        <div className="w-full flex p-3">
          <Button onClick={() => signOut()}>Sign Out </Button>
          <Button
            onClick={toggleCollapsed}
            className="ml-auto lg:hidden text-white text-lg"
            variant={"ghost"}
            size={"icon"}
          >
            <Menu />
          </Button>
        </div>
        {children}
      </div>
    </main>
  );
};
