import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Ellipsis } from "lucide-react";

const SingleProject = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex p-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        ScrataScratch
      </div>
      <Tabs defaultValue="account" className="w-full h-full">
        <TabsList className="bg-none rounded-none">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="board">Board</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>
        <Separator className="border-t border-t-zinc-700" />
        <TabsContent className="flex w-full h-full mt-0" value="overview">
          <div className="w-full"></div>
          <Separator className="h-full bg-zinc-700 " orientation="vertical" />
          <div className="w-[40%] h-full bg-[#1b1c20] flex flex-col px-4 py-8 text-white">
            <span className="text-sm font-bold">Responsible</span>
            <Card className="bg-[#27282c] border b border-zinc-700 p-2 mt-3">
              <div className="flex">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">
                    Rustam Mustiev
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Project Manager
                  </span>
                </div>

                <Button className="ml-auto" variant={"ghost"} size={"sm"}>
                  <Ellipsis />
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="list">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default SingleProject;
