import prisma from "@lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const Tag = await prisma.tag.findMany();
    console.log("Fetched Tag:", Tag);
    return NextResponse.json(Tag);
  } catch (error) {
    console.error("Error fetching Tag:", error);
    return NextResponse.json({ error: "Failed to fetch Tag" });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const tag = await prisma.tag.create({ data });
    console.log("Created Tag:", tag);
    return NextResponse.json(tag);
  } catch (error) {
    console.error("Error creating tag:", error);
    return NextResponse.json({ error: "Failed to create tag" });
  }
}
