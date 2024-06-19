"use client";
import useLayoutStore from "@zustand/store/layoutstore/store";
import clsx from "clsx";
import { Bell, MessageCircleQuestion, Text } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.png";
import { IconButton, SearchInput } from "./Shared";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const HeaderComponent = () => {
  const { isCollapsed, toggleCollapsed, expand, collapse } = useLayoutStore(
    (state) => state
  );
  return (
    <header className="w-full flex px-6 lg:px-8 py-3 lg:py-1  text-lg text-white font-bold">
      <div className="w-full items-center justify-start flex gap-2 backdrop-blur-md">
        <Link className="mr-auto lg:hidden" href={"/"}>
          <Image src={logo} alt="wokflo_logo" width={100} height={100} />
        </Link>
        <div className="ml-auto flex items-center justify-end gap-4">
          <div className="items-center gap-3 hidden lg:flex">
            <SearchInput />
            <IconButton icon={<MessageCircleQuestion />} />
            <Popover>
              <PopoverTrigger>
                <IconButton icon={<Bell />} tip="Notification" />
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
              <DropdownMenuItem>
                <button>Logout</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={toggleCollapsed}
            className={clsx(
              " hover:bg-primary_hover lg:hidden hover:text-sky-600 text-white",
              isCollapsed ? "ml-0" : "ml-auto"
            )}
          >
            <Text />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
