import SheetNewTask from "@components/Forms/SheetNewTask";
import HeaderComponent from "@components/HeaderComponent";
import TasksView from "@components/Lists/Task";
import { ViewCard } from "@components/Shared";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@components/ui/breadcrumb";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { Plus, PlusCircle } from "lucide-react";

const TasksList = () => {
  return (
    <div>
      {/** Header*/}

      <HeaderComponent />
      <Separator className="bg-zinc-700" />
      <main className="flex flex-col gap-4 mt-5 px-6 lg:px-24">
        <div className=" *:text-white my-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/reports">Reports</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Export</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="w-full">
          <h1 className="text-white text-base font-bold">
            Good morning, Jenny 😁
          </h1>
          <span className="text-primary_text text-sm">
            An aggregated view of all your data,{" "}
            <span className="underline">we&apos;d love your feedback</span>
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-4">
          <ViewCard icon={<PlusCircle />} text="completed task" value="32" />
          <ViewCard icon={<PlusCircle />} text="completed task" value="32" />
          <ViewCard icon={<PlusCircle />} text="completed task" value="32" />
        </div>
        <div className="flex bg-zinc-800 border border-dashed border-zinc-700 mt-4 rounded-md p-4 gap-4 text-white">
          💡
          <span className="text-base text-primary_text">
            This is a list of all task created in a project. Each tab represents
            a project with tasks created within those projects. Drag or click on
            the action button to the right to move the tasks across projects.
          </span>
        </div>

        <div className="sticky top-0">
          <div className="flex w-full gap-2 items-center">
            <SheetNewTask>
              <Button
                variant={"outline"}
                className="w-full justify-start border-dashed border-zinc-700 bg-zinc-300 my-4"
              >
                <Plus /> New Task
              </Button>
            </SheetNewTask>
          </div>
          <TasksView />
        </div>
      </main>
    </div>
  );
};

export default TasksList;
