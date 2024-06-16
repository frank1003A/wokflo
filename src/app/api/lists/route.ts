import prisma from "@lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const Lists = await prisma.list.findMany({
      where: {
        workspaceId: undefined,
      },
      include: {
        tasks: true,
      },
    });
    console.log("Fetched Lists:", Lists);
    return NextResponse.json(Lists);
  } catch (error) {
    console.error("Error fetching Lists:", error);
    return NextResponse.json({ error: "Failed to fetch Lists" });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const list = await prisma.list.create({ data });
    console.log("Created List:", list);
    return NextResponse.json(list);
  } catch (error) {
    console.error("Error creating list:", error);
    return NextResponse.json({ error: "Failed to create list" });
  }
}
