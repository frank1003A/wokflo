import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Separator } from "@components/ui/separator";

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
      <Separator className="border-t border-t-zinc-500" />
      <div className="flex w-full h-full">
        <div className="w-full"></div>
        <Separator
          className="h-full border-t border-t-zinc-500"
          orientation="vertical"
        />
        <div className="w-1/3"></div>
      </div>
    </div>
  );
};

export default SingleProject;
