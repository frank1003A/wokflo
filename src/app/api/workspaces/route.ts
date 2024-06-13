import prisma from "@lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const workspace = await prisma.workspace.findMany({
      where: {
        NOT: {
          name: "general",
        },
      },
    });
    console.log("Fetched workspace:", workspace);
    return NextResponse.json(workspace);
  } catch (error) {
    console.error("Error fetching workspace:", error);
    return NextResponse.json({ error: "Failed to fetch workspace" });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const workspace = await prisma.workspace.create({ data });
    console.log("Created Woworkspace:", workspace);
    return NextResponse.json(workspace);
  } catch (error) {
    console.error("Error creating workspace:", error);
    return NextResponse.json({ error: "Failed to create workspace" });
  }
}
