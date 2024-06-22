"use client";

import { Project } from "@prisma/client";
import { GetOneResponse } from "@refinedev/core";
import { Plus } from "lucide-react";

const Overview = ({
  project: singleProject,
}: {
  project: GetOneResponse<Project> | undefined;
}) => {
  return (
    <div className="w-full lg:w-[70%] flex flex-col gap-8 text-white px-8 lg:px-20 py-8">
      <div>
        <h1 className="font-bold">Project info</h1>
        <p className="text-sm mt-6">
          {singleProject?.data.name} - The Place to master coding
        </p>
        <p className="text-sm mt-5">{singleProject?.data.description}</p>
        <div className="flex bg-zinc-800 border border-dashed border-zinc-700 mt-4 rounded-md p-4 gap-4 text-white">
          💡
          <span className="text-base text-primary_text">
            This is a list of all task created in a project. Each tab represents
            a project with tasks created within those projects. Drag or click on
            the action button to the right to move the tasks across projects.
          </span>
        </div>
      </div>
      <div>
        <span>Files & Links</span>
        <div className="flex flex-wrap gap-3 mt-4 max-w-full">
          <button className="w-[100px] flex items-center justify-center h-14 rounded-md border border-zinc-700 border-dotted">
            <Plus />
          </button>
          {[1, 2, 3, 5].map((files) => {
            return (
              <div
                key={files}
                className="bg-[#27282c] min-w-[150px]  h-14 rounded-md border border-zinc-700 border-dotted"
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Overview;
