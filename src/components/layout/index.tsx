"use client";

import LeftBar from "@components/Bar";
import { PropsWithChildren } from "react";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="flex w-full h-auto bg-[#161719]">
      <LeftBar />
      <div className="content w-full overflow-hidden pb-6 bg-[#1f2125] lg:rounded-tl-3xl lg:border-l-2 lg:border-t-0 lg:border-zinc-700">
        {children}
      </div>
    </main>
  );
};
