"use client";

import { AuthProvider, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

import routerProvider from "@refinedev/nextjs-router";

import { dataProvider } from "@providers/data-provider";
import "@styles/global.css";
import {
  File,
  Home,
  LayoutDashboard,
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
    return <span>loading...</span>;
  }

  const authProvider: AuthProvider = {
    login: async () => {
      signIn("auth0", {
        callbackUrl: to ? to.toString() : "/",
        redirect: true,
      });

      return {
        success: true,
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
          name: user.name,
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
              name: "home",
              list: "/",
              /**  create: "/lists/create",
              edit: "/lists/edit/:id",
              show: "/lists/show/:id", */
              meta: {
                icon: <Home />,
                canDelete: true,
              },
            },
            {
              name: "dashboard",
              list: "/dashboard",
              /**create: "/blog-posts/create",
              edit: "/blog-posts/edit/:id",
              show: "/blog-posts/show/:id", */
              meta: {
                icon: <LayoutDashboard />,
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
                icon: <File />,
                canDelete: true,
              },
            },
            {
              name: "tasks",
              list: "/tasks",
              meta: { icon: <SquareCheckBig /> },
            },
            {
              name: "members",
              list: "/members",
              meta: { icon: <Users /> },
            },
            {
              name: "settings",
              list: "/settings",
              meta: { icon: <Settings /> },
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
