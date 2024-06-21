import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import { ReactNode } from "react";
import NewProject from "./NewProject";

const SheetNewProject = ({ children }: { children: ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="bg-wokflow_bg overflow-y-auto w-full lg:w-fit border-none lg:border-l">
        <SheetHeader className="*:text-white text-left">
          <SheetTitle>New Project</SheetTitle>
          <SheetDescription>
            Create and add minimal files. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>

        <NewProject />
      </SheetContent>
    </Sheet>
  );
};

export default SheetNewProject;
