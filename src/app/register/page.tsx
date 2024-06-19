"use client";
import { Toaster } from "@components/ui/toaster";
import { useToast } from "@components/ui/use-toast";
import { useCreate, useLogin } from "@refinedev/core";

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
          toast({
            description: "Your message has been sent.",
            className: "border text-white",
          });
          login(values);
        },
      }
    );
  };

  return (
    <div className="bg-gradient-to-tr from-wokflow_bg flex-col to-wokflow_bg/95 w-full h-screen flex items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6 rounded border border-zinc-700 bg-wk_card p-6">
        <div className="text-white">
          <h1 className="text-xl font-bold tracking-tight">
            Create an account
          </h1>
          <p className="mt-1 text-sm ">Get started with WokFlo today.</p>
        </div>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <label
              className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="flex text-white h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required={true}
              id="email"
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
              New Password
            </label>
            <input
              className="flex text-white h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required={true}
              id="password"
              placeholder="••••••••••"
              autoComplete="current-password"
              type="password"
            />
            <p className="text-sm text-white">
              Must be at least 6 characters long.
            </p>
          </div>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-sky-600 text-primary-foreground  h-10 px-4 py-2 w-full"
            type="submit"
          >
            Create Account →
          </button>
        </form>
        <p className="text-sm text-white">
          Already have an account?{" "}
          <a className="underline" href="/login">
            Login
          </a>
        </p>
      </div>

      <Toaster />
    </div>
  );
};

export default RegisterPage;
