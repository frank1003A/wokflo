import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import { ReactNode } from "react";
import NewTask from "./NewTask";

const SheetNewTask = ({ children }: { children: ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="bg-wokflow_bg overflow-y-auto w-full lg:w-fit border-none lg:border-l">
        <SheetHeader className="*:text-white text-left">
          <SheetTitle>New Task</SheetTitle>
          <SheetDescription>
            Create and add minimal files. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <NewTask />
      </SheetContent>
    </Sheet>
  );
};

export default SheetNewTask;
