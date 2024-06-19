"use client";
import { useGetIdentity } from "@refinedev/core";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo.png";

const Home = () => {
  const { data: identity } = useGetIdentity<{ name: string; id: string }>();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Link href={"/"}>
        <Image src={logo} alt="wokflo_logo" width={400} height={400} />
      </Link>
    </div>
  );
};

export default Home;
