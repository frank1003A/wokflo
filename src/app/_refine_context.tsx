"use client";

import { AuthProvider, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

import routerProvider from "@refinedev/nextjs-router";

import Loading from "@components/loading/Loading";
import { dataProvider } from "@providers/data-provider";
import "@styles/global.css";
import {
  FolderOpenDot,
  LayoutGrid,
  Settings,
  SquareCheckBig,
  Users,
} from "lucide-react";

type RefineContextProps = {};

export const RefineContext = (
  props: React.PropsWithChildren<RefineContextProps>
) => {
  return (
    <SessionProvider>
      <App {...props} />
    </SessionProvider>
  );
};

type AppProps = {};

const App = (props: React.PropsWithChildren<AppProps>) => {
  const { data, status } = useSession();
  const to = usePathname();

  if (status === "loading") {
    return <Loading />;
  }

  const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
      const res = await signIn("credentials", {
        redirect: false,
        callbackUrl: to ? to.toString() : "/",
        email,
        password,
      });
      if (res?.error) {
        return Promise.reject(res.error);
      }
      return {
        success: true,
        redirectTo: "/",
        successNotification: {
          message: "Login Successful",
          description: "You have successfully logged in.",
        },
      };
    },

    logout: async () => {
      signOut({
        redirect: true,
        callbackUrl: "/login",
      });

      return {
        success: true,
      };
    },
    onError: async (error) => {
      if (error.response?.status === 401) {
        return {
          logout: true,
        };
      }

      return {
        error,
      };
    },
    check: async () => {
      if (status === "unauthenticated") {
        return {
          authenticated: false,
          redirectTo: "/login",
        };
      }

      return {
        authenticated: true,
      };
    },
    getPermissions: async () => {
      return null;
    },
    getIdentity: async () => {
      if (data?.user) {
        const { user } = data;
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.image,
        };
      }

      return null;
    },
  };

  return (
    <>
      <RefineKbarProvider>
        <Refine
          routerProvider={routerProvider}
          dataProvider={{
            default: dataProvider,
          }}
          authProvider={authProvider}
          resources={[
            {
              name: "dashboard",
              list: "/dashboard",
              /**  create: "/lists/create",
              edit: "/lists/edit/:id", */
              //show: "/lists/show/:id",
              meta: {
                icon: <LayoutGrid className="h-5 w-5" />,
                canDelete: true,
              },
            },
            {
              name: "projects",
              list: "/projects",
              /** create: "/categories/create",
              edit: "/categories/edit/:id",
              show: "/categories/show/:id", */
              meta: {
                icon: <FolderOpenDot className="h-5 w-5" />,
                canDelete: true,
              },
            },
            {
              name: "tasks",
              list: "/tasks",
              meta: { icon: <SquareCheckBig className="h-5 w-5" /> },
            },
            {
              name: "members",
              list: "/members",
              meta: { icon: <Users className="h-5 w-5" /> },
            },
            {
              name: "settings",
              list: "/settings",
              meta: { icon: <Settings className="h-5 w-5" /> },
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            useNewQueryKeys: true,
          }}
        >
          {props.children}
          <RefineKbar />
        </Refine>
      </RefineKbarProvider>
    </>
  );
};
