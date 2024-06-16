"use client ";
import { useGetIdentity } from "@refinedev/core";

const Home = () => {
  const { data: identity } = useGetIdentity<{ email: string }>();

  return <span>{identity?.email}</span>;
};

export default Home;
