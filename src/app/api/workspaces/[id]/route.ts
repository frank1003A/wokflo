import prisma from "@lib/db";
import { NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const id = context.params.id;

  validateId(id);

  try {
    const singleWorkspace = await prisma.workspace.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json(singleWorkspace);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
export async function PATCH(request: Request, context: { params: Params }) {
  const id = context.params.id;
  validateId(id);

  const data = await request.json();
  try {
    const updatedWorkspace = await prisma.workspace.update({
      where: { id: id },
      data: {
        ...data,
        updatedAt: new Date(),
        lists: {
          create:
            data.lists &&
            data.lists.map((task: { title: string }) => ({
              title: task.title,
            })),
        },
      },
      include: {
        lists: true,
      },
    });
    console.log("updated .workspace:", updatedWorkspace);
    return NextResponse.json(updatedWorkspace);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

export async function DELETE(request: Request, context: { params: Params }) {
  const id = context.params.id;
  validateId(id);

  try {
    await prisma.workspace.delete({
      where: { id },
    });

    return NextResponse.json(`Deleted workspace ${id}`, { status: 200 });
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
