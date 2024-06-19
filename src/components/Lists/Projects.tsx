"use client";

import SheetNewProject from "@components/Forms/SheetNewProject";
import { Avatar, AvatarImage } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Project } from "@prisma/client";
import { HttpError, useTable } from "@refinedev/core";
import { CheckCheckIcon, CheckCircle2, Edit, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

const ProjectsList = () => {
  const { tableQueryResult, filters, setFilters } = useTable<
    Project,
    HttpError
  >();

  // Fetches the posts for the current page
  const projects = tableQueryResult?.data?.data ?? [];

  // Gets the current filter values for the fields
  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) =>
      "field" in item ? item : []
    );

    return {
      name: logicalFilters.find((item) => item.field === "name")?.value || "",
      status:
        logicalFilters.find((item) => item.field === "status")?.value || "",
    };
  }, [filters]);

  return (
    <div className="px-6 flex flex-col sticky top-0">
      <div className="flex items-center justify-start rounded-md py-3 mb-3 gap-3 w-full ">
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            className="w-full rounded-lg text-white bg-background pl-8 md:w-[200px] lg:w-[336px]"
            placeholder="Search by name"
            value={currentFilterValues.name}
            onChange={(e) => {
              setFilters([
                {
                  field: "name",
                  operator: "contains",
                  value: !!e.target.value ? e.target.value : undefined,
                },
              ]);
            }}
          />
        </div>
        <SheetNewProject>
          <Button className="ml-auto flex items-center justify-center gap-3 bg-sky-600 text-white">
            {" "}
            <Plus /> Project
          </Button>
        </SheetNewProject>
      </div>
      <Card className="border border-zinc-700 w-full bg-wokflow_bg overflow-x-auto">
        <div className="w-full h-full">
          <table className="w-full rounded-md">
            <thead>
              <tr className=" text-white border-b border-b-zinc-700">
                <th className="p-4 text-left capitalize bg-primary_hover">
                  Name
                </th>
                <th className="p-4 text-left capitalize bg-primary_hover">
                  Status
                </th>
                <th className="p-4 text-left capitalize bg-primary_hover">
                  Assignees
                </th>
                <th className="p-4 text-left capitalize bg-primary_hover">
                  Date Created
                </th>
                <th className="p-4 text-left capitalize bg-primary_hover"></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => {
                return (
                  <tr
                    key={project.id}
                    className="odd:bg-transparent even:bg-primary_hover border-b border-b-zinc-700 text-white text-left my-5 hover:bg-primary_hover"
                  >
                    <td className="p-4 text-left text-sm text-primary_text font-semibold">
                      <div className="flex items-center gap-2 justify-start">
                        <div className="text-white uppercase flex items-center justify-center min-w-6 w-6 h-6 rounded-sm bg-gradient-to-br from-white to-sky-600">
                          {project.name.at(0)}
                        </div>
                        <span className="capitalize">{project.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-left text-sm text-primary_text font-semibold">
                      <div className=" flex text-white border-none w-fit gap-2 items-center justify-start py-1">
                        {project.status === "Completed" ? (
                          <span>
                            <CheckCircle2 className="bg-green-500 border-none text-white rounded-full" />
                          </span>
                        ) : (
                          <span>
                            <CheckCheckIcon />
                          </span>
                        )}
                        {project.status}
                      </div>
                    </td>
                    <td className="p-4 text-left text-sm text-primary_text font-semibold">
                      <div className="flex -space-x-3 *:w-[30px] *:h-[30px] *:ring-2 *:ring-zinc-700">
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
                    </td>
                    <td className="p-4 text-left text-sm text-primary_text font-semibold">
                      {new Date(project.createdAt).toDateString()}
                    </td>
                    <td className="p-4 text-left text-sm text-primary_text font-semibold">
                      <div>
                        <Link href={`/projects/${project.id}`}>
                          <Button
                            variant="outline"
                            className="border-none"
                            size="icon"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ProjectsList;
