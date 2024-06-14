"use client";

import LeftBar from "@components/Bar";
import useLayoutStore from "@zustand/store/layoutstore/store";
import { PropsWithChildren } from "react";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { toggleCollapsed } = useLayoutStore((state) => state);
  return (
    <main className="flex w-full h-screen bg-[#161719]">
      <LeftBar />
      <div className="content w-full h-full bg-[#1f2125] rounded-tl-3xl border-l-2 border-t-2 border-[#33353b]">
        {/**<Breadcrumb /> */}
        {/**<div className="w-full flex p-3">
          <Button
            onClick={toggleCollapsed}
            className="ml-auto lg:hidden text-white text-lg"
            variant={"ghost"}
            size={"icon"}
          >
            <Menu />
          </Button>
        </div> */}
        {children}
      </div>
    </main>
  );
};
