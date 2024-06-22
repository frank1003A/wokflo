"use client";
import Overview from "@components/Lists/Overview";
import {
  Prompt,
  SearchInput,
  StatusSelect,
  ViewCard,
} from "@components/Shared";
import Loading from "@components/loading/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { KanbanBoard } from "@components/views/KanbanBoard";
import { Project } from "@prisma/client";
import { Separator } from "@radix-ui/react-separator";
import { HttpError, useOne } from "@refinedev/core";
import {
  Bell,
  Ellipsis,
  Info,
  MessageCircle,
  Plus,
  PlusCircle,
  Star,
} from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

interface PageProps {
  param: { id: string };
}

const CustomTabContent = ({
  children,
  value,
}: {
  children: ReactNode;
  value: string;
}) => {
  return (
    <TabsContent className="w-full flex mt-0" value={value}>
      {children}
    </TabsContent>
  );
};

const CustomTabTrigger = ({
  children,
  value,
}: {
  children: ReactNode;
  value: string;
}) => {
  return (
    <TabsTrigger
      className="border-b-2 border-b-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-sky-600"
      value={value}
    >
      {children}
    </TabsTrigger>
  );
};
const PageComponent = ({ param }: PageProps) => {
  const { data: singleProject, isLoading } = useOne<Project, HttpError>({
    resource: "projects",
    id: param.id,
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <main>
      <Tabs
        defaultValue="overview"
        className="w-full h-screen sticky top-[80px] "
      >
        {/** Header*/}
        <header className="w-full bg-wokflow_bg sticky top-0">
          <header className="w-full flex px-5 py-4 max-h-[65px]  text-lg text-white font-bold">
            <div className="w-full items-center justify-start flex gap-2">
              <div className="inline-flex items-center justify-center gap-0">
                <div className="text-white uppercase flex items-center justify-center min-w-6 w-6 h-6 rounded-sm bg-sky-600">
                  {singleProject?.data.name
                    ? singleProject?.data.name.at(0)
                    : "P"}
                </div>
                <span className="ml-2">{singleProject?.data.name}</span>
              </div>
              <div className="gap-2 hidden lg:inline-flex">
                <Button variant={"ghost"} size={"icon"}>
                  <Info className="h-4 w-4" />
                </Button>
                <Button variant={"ghost"} size={"icon"}>
                  <Star className="h-4 w-4" />
                </Button>

                <StatusSelect />
              </div>

              <div className="ml-auto flex items-center justify-end gap-4">
                <div className="gap-4 hidden lg:inline-flex">
                  <SearchInput />
                  <Button
                    className="rounded-full bg-purple-700 text-white"
                    size={"icon"}
                  >
                    <Plus />
                  </Button>
                  <Button variant={"ghost"} size={"icon"}>
                    <MessageCircle />
                  </Button>
                  <Popover>
                    <PopoverTrigger>
                      <Button variant={"ghost"} size={"icon"}>
                        <Bell />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <span>Notifications</span>
                    </PopoverContent>
                  </Popover>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="overflow-hidden rounded-full"
                    >
                      <Image
                        src="https://avatar.iran.liara.run/public"
                        width={36}
                        height={36}
                        alt="Avatar"
                        className="overflow-hidden rounded-full"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          <TabsList className="px-5  bg-transparent border-b border-b-zinc-700 pt-[4px] rounded-none text-sm w-full justify-start text-primary_text">
            <CustomTabTrigger value="overview">Overview</CustomTabTrigger>
            <CustomTabTrigger value="list">List</CustomTabTrigger>
            <CustomTabTrigger value="boards">Boards</CustomTabTrigger>
            <CustomTabTrigger value="calendar">Calendar</CustomTabTrigger>
            <CustomTabTrigger value="channel">Channel</CustomTabTrigger>
            <CustomTabTrigger value="files">Files</CustomTabTrigger>
          </TabsList>
        </header>

        <CustomTabContent value="overview">
          <Overview project={singleProject} />
          <Separator
            className="h-full bg-zinc-700 hidden lg:flex"
            orientation="vertical"
          />
          <div className="w-[30%] h-full bg-[#1b1c20] hidden lg:flex flex-col px-4 py-8 text-white">
            <span className="text-sm font-bold">Responsible</span>
            <Card className="bg-[#27282c] border border-zinc-700 p-2 mt-3">
              <div className="flex items-center justify-start gap-3">
                <Avatar>
                  <AvatarImage
                    src="https://avatar.iran.liara.run/username?username=Scott+Wilson"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">
                    Rustam Mustiev
                  </span>
                  <span className="text-xs text-gray-400">Project Manager</span>
                </div>

                <Button className="ml-auto" variant={"ghost"} size={"sm"}>
                  <Ellipsis className="text-gray-400" />
                </Button>
              </div>
            </Card>

            <ul className="flex flex-col mt-5 gap-2">
              <Prompt prompt="start date" ans="13 May 2021" />
              <Prompt prompt="estimated end date" ans="10 sep 2022" />
              <Prompt prompt="category" ans="coperate website" />
              <Prompt prompt="billing type" ans="fix price" />
              <Prompt prompt="project status" ans="according to plan" />
            </ul>

            <Separator className="my-8 bg-zinc-700" />

            {/** */}
            <div className="flex flex-col gap-2">
              <ViewCard
                icon={<PlusCircle />}
                text="completed task"
                value="32"
              />
              <ViewCard
                icon={<PlusCircle />}
                text="completed task"
                value="32"
              />
              <ViewCard
                icon={<PlusCircle />}
                text="completed task"
                value="32"
              />
            </div>
          </div>
        </CustomTabContent>
        <CustomTabContent value="list">
          <div className="w-full p-8">list</div>
        </CustomTabContent>
        <CustomTabContent value="boards">
          <div className="p-6 overflow-x-auto">
            <KanbanBoard />
          </div>
        </CustomTabContent>
      </Tabs>
    </main>
  );
};

export default PageComponent;
