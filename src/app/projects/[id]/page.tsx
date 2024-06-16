import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Separator } from "@components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { ChevronDown, Ellipsis, Info, PlusCircle, Star } from "lucide-react";

const Prompt = ({ prompt, ans }: { prompt: string; ans: string }) => {
  return (
    <ul className="flex items-center justify-between w-full text-xs capitalize">
      <li className="text-primary_text">{prompt}</li>
      <li className="text-white">{ans}</li>
    </ul>
  );
};

const ViewCard = ({
  icon,
  text,
  value,
}: {
  icon: React.ReactElement;
  text: string;
  value: string;
}) => {
  return (
    <Card className="flex w-full justify-between text-white bg-[#27282c] border border-zinc-700 px-2 py-3">
      <div className="flex items-center gap-2 ">
        <span>{icon}</span>
        <span className="text-sm">{text}</span>
      </div>
      <div>{value}</div>
    </Card>
  );
};

const IconButton = ({
  icon,
  tip,
}: {
  icon: React.ReactElement;
  tip?: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button className="bg-transparent p-1 rounded-sm">{icon}</button>
        </TooltipTrigger>
        <TooltipContent>{tip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const StatusSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px] rounded-full border-zinc-700">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="according_to_plan">According to plan</SelectItem>
      </SelectContent>
    </Select>
  );
};
const SingleProject = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col w-full">
      {/** Header*/}
      <div className="w-full flex px-5 py-4 sticky top-0 text-lg text-white font-bold">
        <div className="w-full items-center justify-start flex gap-2">
          <Avatar>
            <AvatarImage
              src="https://avatar.iran.liara.run/username?username=Scott+Wilson"
              alt="@shadcn"
            />
            <AvatarFallback>SW</AvatarFallback>
          </Avatar>
          <Popover>
            <PopoverTrigger className="ml-3 flex items-center justify-center">
              <span>ScrataScratch</span> <ChevronDown className="h-5 w-5" />
            </PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
          </Popover>
          <IconButton
            icon={<Info className="h-5 w-5" />}
            tip="Project Information"
          />
          <IconButton
            icon={<Star className="h-5 w-5" />}
            tip="Add to favorite"
          />

          <StatusSelect />

          <div className="ml-auto flex items-center justify-end"></div>
        </div>
      </div>
      {/** Tabbed Content*/}
      <Tabs defaultValue="account" className="w-full h-full sticky top-20 ">
        <TabsList className="px-5 bg-transparent border-b border-b-zinc-700 pt-[4px] rounded-none text-sm w-full justify-start text-primary_text">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="boards">Boards</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>
        <TabsContent className="flex w-full mt-0" value="overview">
          <div className="w-full"></div>
          <Separator className="h-full bg-zinc-700 " orientation="vertical" />
          <div className="w-[35%] h-full bg-[#1b1c20] flex flex-col px-4 py-8 text-white">
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
        </TabsContent>
        <TabsContent value="list">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default SingleProject;
