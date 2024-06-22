import SheetNewTask from "@components/Forms/SheetNewTask";
import HeaderComponent from "@components/HeaderComponent";
import TasksView from "@components/Lists/Task";
import { ViewCard } from "@components/Shared";
import { Button } from "@components/ui/button";
import { Plus, PlusCircle } from "lucide-react";

const TasksList = () => {
  return (
    <div>
      {/** Header*/}

      <HeaderComponent />
      <main className="flex flex-col gap-4 mt-5 px-6 lg:px-24">
        <div className="w-full">
          <h1 className="text-white text-lg font-bold">
            Good morning, Jenny 😁
          </h1>
          <span className="text-primary_text text-base">
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
                className="w-full justify-start border-2 border-sky-600 text-sky-600 my-4 hover:bg-sky-600 hover:text-white"
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
