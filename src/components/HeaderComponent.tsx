"use client";
import { Bell, MessageCircleQuestion } from "lucide-react";
import Image from "next/image";
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
  return (
    <header className="w-full flex px-8 lg:px-8 py-1  text-lg text-white font-bold">
      <div className="w-full items-center justify-start flex gap-2 backdrop-blur-md">
        <div className="ml-auto flex items-center justify-end gap-4">
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
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
