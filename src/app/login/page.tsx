"use client";

import { Toaster } from "@components/ui/toaster";
import { useToast } from "@components/ui/use-toast";
import { useLogin } from "@refinedev/core";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo.png";

export default function Login() {
  const { mutate: login } = useLogin();
  const { toast } = useToast();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    login(values, {
      onSuccess(data, variables, context) {
        toast({
          description: "Successful Login",
          className: "border text-white",
        });
      },
    });
  };

  return (
    <div className="bg-gradient-to-tr from-wokflow_bg to-wokflow_bg/95 w-full h-screen flex flex-col gap-3 items-center justify-center">
      <Link href={"/"}>
        <Image src={logo} alt="wokflo_logo" width={100} height={40} />
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6 rounded border border-zinc-700 bg-wk_card p-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Login</h1>
          <p className="mt-1 text-sm text-white">
            Enter your details below to login
          </p>
        </div>
        <form className="grid gap-4" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <label
              className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="flex h-10 w-full text-white rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required={true}
              id="email"
              name="email"
              autoComplete="username"
              placeholder="team@mynaui.com"
              type="email"
            />
          </div>
          <div className="grid gap-2">
            <label
              className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="flex h-10 w-full text-white rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required={true}
              id="password"
              name="password"
              placeholder="••••••••••"
              autoComplete="current-password"
              type="password"
            />
          </div>
          <button
            className="inline-flex items-center hover:bg-sky-600 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-sky-600 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            type="submit"
          >
            Login
          </button>
          <button className="inline-flex items-center text-white justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full">
            Login with Google
          </button>
        </form>
        <div className="flex flex-col gap-4 text-sm text-white">
          <p>
            Don&apos;t have an account?{" "}
            <a className="underline" href="/register">
              Sign up
            </a>
          </p>
          <a className="underline" href="#">
            Forgot your password?
          </a>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
