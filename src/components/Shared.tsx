import { Search } from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const Prompt = ({ prompt, ans }: { prompt: string; ans: string }) => {
  return (
    <ul className="flex items-center justify-between w-full text-xs capitalize">
      <li className="text-primary_text">{prompt}</li>
      <li className="text-white">{ans}</li>
    </ul>
  );
};

interface ViewCardProps extends React.ComponentPropsWithoutRef<"div"> {
  icon: React.ReactElement;
  text: string;
  value: string;
}
export const ViewCard = ({ icon, text, value, ...rest }: ViewCardProps) => {
  return (
    <Card
      {...rest}
      className="flex overflow-hidden relative w-full justify-between text-white bg-[#27282c] border border-zinc-700 px-2 py-3"
    >
      <span className="absolute bg-sky-600 w-5 h-5 top-3 blur-xl"></span>
      <div className="flex items-center gap-2 ">
        <span>{icon}</span>
        <span className="text-sm capitalize">{text}</span>
      </div>
      <span className="p-3 h-8 w-8 bg-sky-600 rounded-full text-sm flex items-center justify-center font-bold">
        {value}
      </span>
    </Card>
  );
};

interface IconButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  icon: React.ReactElement;
  tip?: string;
}

export const IconButton = ({ icon, tip, ...rest }: IconButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger {...rest}>
          <span className="bg-transparent p-1 rounded-sm">{icon}</span>
        </TooltipTrigger>
        <TooltipContent>{tip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const StatusSelect = () => {
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

export const SearchInput = () => {
  return (
    <div className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="w-full rounded-full bg-background border border-zinc-700 pl-8 md:w-[200px] lg:w-[200px]"
      />
    </div>
  );
};
