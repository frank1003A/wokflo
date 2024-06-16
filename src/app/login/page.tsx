"use client";

import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { useLogin } from "@refinedev/core";
import { signIn } from "next-auth/react";

export default function Login() {
  const { mutate: login } = useLogin();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    login(values);
  };

  return (
    <div className="bg-gradient-to-tr from-wokflow_bg to-wokflow_bg/95 w-full h-screen flex items-center justify-center">
      <form className="flex flex-col max-w-96" onSubmit={onSubmit}>
        <label>Email</label>
        <input name="email" />
        <label>Password</label>
        <input name="password" />
        <button type="submit">Sign In</button>
        <div className="inline-flex items-center w-full ">
          <Separator className="w-full" /> OR <Separator className="w-full" />
        </div>
        <div className="inline-flex items-center">
          <Button>Sign In with Twitter</Button>
          <Button onClick={() => signIn("google")}>Sign In with Google</Button>
        </div>
        <p>
          By signing In, you agree to our <a>Terms, acceptable use</a> and{" "}
          <a>privacy policy</a>
        </p>
      </form>
    </div>
  );
}
