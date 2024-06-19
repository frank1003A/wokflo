import prisma from "@lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const Projects = await prisma.project.findMany({
      include: {
        tasks: true,
      },
    });
    console.log("Fetched Projects:", Projects);
    return NextResponse.json(Projects);
  } catch (error) {
    console.error("Error fetching Projects:", error);
    return NextResponse.json({ error: "Failed to fetch Projects" });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newProject = await prisma.project.create({ data });
    console.log("Created NewProject:", newProject);
    return NextResponse.json(newProject);
  } catch (error) {
    console.error("Error creating newProject:", error);
    return NextResponse.json({ error: "Failed to create newProject" });
  }
}
