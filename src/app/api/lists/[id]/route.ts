import prisma from "@lib/db";
import { NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const id = context.params.id;

  validateId(id);

  try {
    const singleList = await prisma.list.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json(singleList);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
export async function PATCH(request: Request, context: { params: Params }) {
  const id = context.params.id;

  validateId(id);

  const data = await request.json();

  try {
    const updatedList = await prisma.list.update({
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

    return NextResponse.json(updatedList, { status: 200 });
  } catch (error) {
    console.error("Error updating list:", error);
    return NextResponse.json(
      { error: "Failed to update list" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: { params: Params }) {
  const id = context.params.id;
  validateId(id);

  try {
    await prisma.list.delete({
      where: { id },
    });

    return NextResponse.json(`Deleted list ${id}`, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}

async function validateId(id: string) {
  const idExists = await prisma.list
    .findFirst({
      where: { id: id },
    })
    .then(Boolean);

  if (!id || (typeof id !== "string" && !idExists)) {
    return NextResponse.json({ error: "Invalid or missing list ID" });
  }
}

/**"name": "Project Alpha",
  "description": "Tasks for Project Alpha",
  "tasks": [
    {
      "title": "Design the UI"
    },
    {
      "title": "Implement the backend"
    }
  ] */
