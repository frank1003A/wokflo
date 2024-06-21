import prisma from "@lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../auth/[...nextauth]/options";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const Tasks = await prisma.task.findMany();
    return NextResponse.json(Tasks);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const newTask = await prisma.task.create({
      data: { ...data, ownerId: session.user.id },
    });
    console.log(newTask);
    return NextResponse.json(newTask);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create newTask" });
  }
}
