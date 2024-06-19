"use client";

import LeftBar from "@components/Bar";
import useLayoutStore from "@zustand/store/layoutstore/store";
import { PropsWithChildren } from "react";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { toggleCollapsed } = useLayoutStore((state) => state);
  return (
    <main className="flex w-full h-auto bg-[#161719]">
      <LeftBar />
      <div className="content w-full pb-6 bg-[#1f2125] rounded-tl-3xl border-l-2 border-t-2 border-zinc-700">
        {children}
      </div>
    </main>
  );
};
