import ProjectsList from "@components/Lists/Projects";
import { TabsTrigger } from "@components/ui/tabs";

import HeaderComponent from "@components/HeaderComponent";
import { ViewCard } from "@components/Shared";
import { Separator } from "@components/ui/separator";
import { PlusCircle } from "lucide-react";
import { ReactNode } from "react";
const CustomTabTrigger = ({
  children,
  value,
  count,
}: {
  children: ReactNode;
  count: number;
  value: string;
}) => {
  return (
    <TabsTrigger
      className="rounded-md  data-[state=active]:bg-purple-900 data-[state=active]:text-white"
      value={value}
    >
      {children} <span>{count}</span>
    </TabsTrigger>
  );
};

const ProjectsPage = () => {
  return (
    <main className="flex flex-col w-full ">
      <HeaderComponent />
      <Separator className="bg-zinc-700" />
      <div className="h-full w-full flex flex-col px-6 lg:px-20">
        <div className="w-full my-5 lg:px-5">
          <div>
            <h1 className="text-white text-base font-bold">
              Good morning, Jenny
            </h1>
            <span className="text-primary_text text-sm">
              An aggregated view of all your data,{" "}
              <span className="underline">we&apos;d love your feedback</span>
            </span>
          </div>
          <div className="flex mt-6 bg-zinc-800 border border-dashed border-zinc-700 rounded-md p-4 gap-4 text-white">
            💡
            <span className="text-base text-primary_text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, fugit
              ipsam delectus sunt hic culpa. Ipsa doloremque laboriosam et
              delectus dolore tempora dicta modi consequatur! Repellendus
              commodi voluptas minima neque?
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-6">
            <ViewCard
              icon={<PlusCircle />}
              text="completed project"
              value="32"
            />
            <ViewCard
              icon={<PlusCircle />}
              text="rejected project"
              value="32"
            />
            <ViewCard
              icon={<PlusCircle />}
              text="reassigned project"
              value="32"
            />
          </div>
        </div>

        <ProjectsList />
      </div>
    </main>
  );
};

export default ProjectsPage;
