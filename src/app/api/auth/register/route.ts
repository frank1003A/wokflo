import { hashPassword } from "@lib/auth";
import prisma from "@lib/db";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.email || !data.password) {
      return NextResponse.json(
        { error: "Email and Password Required" },
        { status: 400 }
      );
    }

    const userExist = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExist) {
      return NextResponse.json(
        { error: "Email already exists, please login" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(data.password);
    const newUser = await prisma.user.create({
      data: { email: data.email, passwordHash: hashedPassword },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating newUser:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
