"use client";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";
import { Toaster } from "@components/ui/toaster";
import { useToast } from "@components/ui/use-toast";
import { useCreate, useNavigation } from "@refinedev/core";
import clsx from "clsx";

type IIdentity = {
  id: number;
  name: string;
  email: string;
};

const NewProject = () => {
  const { toast } = useToast();
  const { mutate: mutateProject } = useCreate();
  const { list } = useNavigation();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = {
      name: e.currentTarget.projectname.value,
      description: e.currentTarget.projectdesc.value,
    };

    mutateProject(
      {
        resource: "/projects",
        values: {
          name: values.name,
          description: values.description,
        },
        successNotification: (data, values, resource) => {
          return {
            message: `${data?.data.id} Successfully fetched.`,
            description: "Success with no errors",
            type: "success",
          };
        },
      },
      {
        onSuccess: (data, variables, context) => {
          toast({
            description: `Project ${values.name} Created `,
            className: "border text-white bg-green-700 left-12",
          });
          list("/projects");
        },
      }
    );
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <form
      action="post"
      className="flex flex-col gap-2 mt-6 *:text-white"
      onSubmit={onSubmit}
    >
      <Label htmlFor="projectname">Project Name</Label>
      <Input
        id="projectname"
        type="text"
        name="projectname"
        placeholder="project name"
        className="placeholder:text-primary_text placeholder:capitalize mt-2"
      />
      <div className="mt-6">
        <Label htmlFor="projectdesc">Project Description</Label>
        <Textarea
          id="projectdesc"
          name="projectdesc"
          placeholder="project description"
          className="placeholder:text-primary_text placeholder:capitalize mt-2"
        />
      </div>
      <div className="flex flex-col mt-6">
        <span className="font-semibold">Files: </span>
        <label
          htmlFor="dropzone-file"
          className={clsx(
            "flex flex-col mt-2 items-center justify-center w-full border rounded-md border-zinc-700 border-dashed  cursor-pointer bg-zinc-800 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-zinc-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          )}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {/** ICON */}
            <span className="h-12 w-12 mb-4 rounded-full bg-sky-900 text-white flex items-center justify-center">
              <svg
                className="w-8 h-8 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
            </span>

            {/** TEXT */}
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>

            {/** SUB TEXT */}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>

          {/** PRIMARY INPUT */}
          <input
            id="dropzone-file"
            type="file"
            className="hidden disabled:cursor-not-allowed"
          />
        </label>
      </div>

      <Button
        className="bg-sky-600 hover:bg-sky-600 mt-6 text-white"
        type="submit"
      >
        add project
      </Button>
      <Toaster />
    </form>
  );
};

export default NewProject;
