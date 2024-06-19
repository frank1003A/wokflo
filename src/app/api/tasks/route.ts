import prisma from "@lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const Tasks = await prisma.task.findMany();
    console.log("Fetched Tasks:", Tasks);
    return NextResponse.json(Tasks);
  } catch (error) {
    console.error("Error fetching Tasks:", error);
    return NextResponse.json({ error: "Failed to fetch Tasks" });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newTask = await prisma.task.create({ data });
    console.log("Created NewTask:", newTask);
    return NextResponse.json(newTask);
  } catch (error) {
    console.error("Error creating newTask:", error);
    return NextResponse.json({ error: "Failed to create newTask" });
  }
}
