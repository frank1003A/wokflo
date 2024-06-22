import prisma from "@lib/db";
import { NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const id = context.params.id;

  validateId(id);

  try {
    const singleProject = await prisma.project.findUnique({
      where: {
        id: id,
      },
      include: {
        tasks: true,
        files: true,
      },
    });
    return NextResponse.json(singleProject);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
export async function PATCH(request: Request, context: { params: Params }) {
  const id = context.params.id;

  validateId(id);

  const data = await request.json();

  try {
    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
        tasks: {
          create:
            data.tasks &&
            data.tasks.map((task: { title: string }) => ({
              title: task.title,
            })),
        },
      },
      include: {
        tasks: true,
      },
    });

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: { params: Params }) {
  const id = context.params.id;
  validateId(id);

  try {
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json(`Deleted project ${id}`, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}

async function validateId(id: string) {
  const idExists = await prisma.project
    .findFirst({
      where: { id: id },
    })
    .then(Boolean);

  if (!id || (typeof id !== "string" && !idExists)) {
    return NextResponse.json({ error: "Invalid or missing project ID" });
  }
}
