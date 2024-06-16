"use client";
import { Button } from "@components/ui/button";
import { Toaster } from "@components/ui/toaster";
import { useToast } from "@components/ui/use-toast";
import { Separator } from "@radix-ui/react-separator";
import { useCreate, useLogin } from "@refinedev/core";
import Link from "next/link";

type FormVariables = {
  email: string;
  password: string;
};

const RegisterPage = () => {
  const { toast } = useToast();
  const { mutate: register, isSuccess } = useCreate();
  const { mutate: login } = useLogin<FormVariables>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    register(
      {
        resource: "/auth/register",
        values: {
          email: values.email,
          password: values.password,
        },
        successNotification: (data, values, resource) => {
          return {
            message: `${data?.data.id} Successfully fetched.`,
            description: "Success with no errors",
            type: "success",
          };
        },
      },
      {
        onSuccess: (data, variables, context) => {
          login(values);
          toast({
            description: "Your message has been sent.",
            className: "border text-white",
          });
        },
      }
    );
  };

  return (
    <div className="bg-gradient-to-tr from-wokflow_bg flex-col to-wokflow_bg/95 w-full h-screen flex items-center justify-center">
      <div className="flex flex-col">
        <h1>Create a wokflo account</h1>
        <p className="text-xs">
          Already have an account? <Link href={"/login"}>Log In</Link>
        </p>
      </div>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <label>Email</label>
        <input name="email" />
        <label>Password</label>
        <input name="password" />
        <button type="submit">create account</button>
        <div className="inline-flex items-center w-full">
          <Separator /> OR <Separator />
        </div>
        <div className="inline-flex items-center">
          <Button>Sign up with Twitter</Button>
          <Button>Sign up with Google</Button>
        </div>
        <p>
          By signing up, you agree to our <a>Terms, acceptable use</a> and{" "}
          <a>privacy policy</a>
        </p>
      </form>
      <Toaster />
    </div>
  );
};

export default RegisterPage;
