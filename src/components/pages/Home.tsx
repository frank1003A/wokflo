"use client";
import HeaderComponent from "@components/HeaderComponent";
import { Separator } from "@components/ui/separator";
import { useGetIdentity } from "@refinedev/core";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo.png";

const Home = () => {
  const { data: identity } = useGetIdentity<{
    name: string;
    id: string;
    email: string;
  }>();

  return (
    <main className="w-full flex flex-col">
      <HeaderComponent />
      <Separator className="bg-zinc-700" />
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-lg font-bold text-white">
            Welcome,{" "}
            <a className="text-sky-600 underline" href="/">
              {identity?.email}
            </a>
          </h1>
          <Link href={"/"}>
            <Image src={logo} alt="wokflo_logo" width={400} height={400} />
          </Link>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 *:max-w-[250px] *:text-center">
            <div className="bg-sky-600/80 text-white flex items-center justify-center p-3 rounded-full">
              <span>AI-Powered Task Generation</span>
            </div>
            <div className="bg-sky-600/80 text-white flex items-center justify-center p-3 rounded-full">
              <span>Voice Commands for Task Management</span>
            </div>
            <div className="bg-sky-600/80 text-white flex items-center justify-center p-3 rounded-full">
              <span>Enhancing the Project Management Space</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
