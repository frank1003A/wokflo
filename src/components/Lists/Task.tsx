"use client";
import { IconButton } from "@components/Shared";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@components/ui/accordion";
import { Avatar, AvatarImage } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { Skeleton } from "@components/ui/skeleton";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Project, Task } from "@prisma/client";
import { AccordionItem } from "@radix-ui/react-accordion";
import { HttpError, useList } from "@refinedev/core";
import {
  ClipboardList,
  EllipsisVertical,
  GripVertical,
  Star,
} from "lucide-react";

const SingleTask = ({ task, id }: { task: Task; id: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group bg-[#27282c] border border-zinc-700 hover:shadow-2xl hover:border-dashed cursor-pointer flex items-center text-white px-2 rounded-md"
    >
      <IconButton
        {...attributes}
        {...listeners}
        icon={<GripVertical />}
        tip="Drag Task"
      />
      <Checkbox className="ml-2 h-5 w-5 bg-white border-none data-[state=checked]:bg-sky-600" />
      <div className="ml-4">
        <span>{task.title}</span>
      </div>
      <div className="ml-auto flex items-center justify-end gap-4">
        <div className="hidden lg:flex -space-x-3 *:w-[30px] *:h-[30px] *:ring-2 *:ring-zinc-700">
          <Avatar>
            <AvatarImage src="https://avatar.iran.liara.run/public/29" />
          </Avatar>
          <Avatar>
            <AvatarImage src="https://avatar.iran.liara.run/public" />
          </Avatar>
          <Avatar>
            <AvatarImage src="https://avatar.iran.liara.run/public" />
          </Avatar>
        </div>
        <span className="hidden lg:flex text-sm font-bold bg-red-100 text-red-950 p-1 rounded-sm">
          Today
        </span>
        <IconButton icon={<EllipsisVertical />} tip="Actions" />
      </div>
    </div>
  );
};

/**<Accordion type="single" collapsible>
      <AccordionItem
        value="item-1"
        className="border border-zinc-700 p-2 rounded-md bg-zinc-500/25"
      >
        <AccordionTrigger className="bg-transparent hover:*:no-underline">
          <div className="flex items-center gap-2 justify-start">
            <div className="text-white uppercase flex items-center justify-center min-w-6 w-6 h-6 rounded-sm bg-gradient-to-br from-purple-700 to-sky-300">
              S
            </div>
            <span className="capitalize text-white text-lg">Scratch</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-base flex flex-col gap-3 border-b_trans">
          <SingleTask task="Do 30min of physical excercise" />
          <SingleTask task="Do 30min of physical excercise" />
        </AccordionContent>
      </AccordionItem>
    </Accordion> */

interface ExtendProject extends Project {
  tasks: Task[];
}
const TasksView = () => {
  const { data, isLoading, isError } = useList<ExtendProject, HttpError>({
    resource: "projects",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const projects = data?.data ?? [];

  if (isLoading) {
    return (
      <>
        {[1, 2, 3, 4, 5].map((no) => {
          return (
            <Skeleton
              key={no}
              className="p-2 rounded-md w-full mb-4 h-[60px] bg-zinc-700 "
            />
          );
        })}
      </>
    );
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  /** function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  } */

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      // onDragEnd={handleDragEnd}
    >
      <div className="flex gap-3 w-full">
        <Accordion
          type="single"
          collapsible
          className="flex flex-col gap-3 w-full"
        >
          {projects.map((project, index) => {
            return (
              <AccordionItem
                key={project.name}
                value={`item-${index + 1}`}
                className="p-2 rounded-md w-full mb-4 border bg-wokflow_bg border-zinc-700 border-dashed"
              >
                <AccordionTrigger className="text-white bg-transparent border-zinc-700 py-3 px-3 rounded-tl-md rounded-tr-md hover:*:no-underline">
                  <div className="flex items-center gap-2 justify-start w-full">
                    <div className="mr-auto flex gap-2">
                      <div className="text-white uppercase flex items-center justify-center min-w-6 w-6 h-6 rounded-sm bg-sky-600">
                        {project.name.at(0)}
                      </div>
                      <span className="capitalize text-white text-lg w-32 truncate">
                        {project.name}
                      </span>
                    </div>
                    <div className="ml-auto flex gap-4 px-4">
                      <Button variant={"ghost"} size={"icon"}>
                        <Star />
                      </Button>
                      <div className="flex items-center space-x-2">
                        <ClipboardList />
                        <span className="bg-white p-2 text-black rounded-full h-6 w-6 text-sm font-bold flex items-center justify-center leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {project.tasks.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="data-[state=open]:mb-2 text-sm flex flex-col gap-3 px-3">
                  {project?.tasks.map((task, id) => {
                    return (
                      <SortableContext
                        key={task.title}
                        strategy={verticalListSortingStrategy}
                        items={project.tasks.map((task) => task.id)}
                      >
                        <SingleTask task={task} id={task.id} />
                      </SortableContext>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </DndContext>
  );
};

export default TasksView;
