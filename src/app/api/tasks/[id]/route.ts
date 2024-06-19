import prisma from "@lib/db";
import { NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const id = context.params.id;

  validateId(id);

  try {
    const singleTask = await prisma.task.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json(singleTask);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
export async function PATCH(request: Request, context: { params: Params }) {
  const id = context.params.id;

  validateId(id);

  const data = await request.json();

  try {
    const updatedTask = await prisma.project.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error updating Task:", error);
    return NextResponse.json(
      { error: "Failed to update Task" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: { params: Params }) {
  const id = context.params.id;
  validateId(id);

  try {
    await prisma.task.delete({
      where: { id },
    });

    return NextResponse.json(`Deleted Task ${id}`, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}

async function validateId(id: string) {
  const idExists = await prisma.task
    .findFirst({
      where: { id: id },
    })
    .then(Boolean);

  if (!id || (typeof id !== "string" && !idExists)) {
    return NextResponse.json({ error: "Invalid or missing Task ID" });
  }
}
