"use client";

import LeftBar from "@components/Bar";
import { PropsWithChildren } from "react";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="flex w-full h-screen bg-[#161719]">
      <LeftBar />
      <div className="content w-full bg-[#1f2125] rounded-tl-3xl border-l-2 border-t-2 border-[#33353b]">
        {/**<Breadcrumb /> */}
        <div>{children}</div>
      </div>
    </main>
  );
};
