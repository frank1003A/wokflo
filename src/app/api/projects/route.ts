import prisma from "@lib/db";
import { NextRequest, NextResponse } from "next/server";

/**export async function getUserData(req: any) {
    const session = await getSession({ req });
    if (!session) {
      return { user: null };
    }
  
    const userEmail = session.user?.email;
  
    // Fetch user data
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail as string,
      },
      include: {
        ownedProjects: {
          include: {
            tasks: true,
            files: true,
            users: {
              include: {
                user: true,
              },
            },
          },
        },
        projects: {
          include: {
            project: {
              include: {
                tasks: true,
                files: true,
              },
            },
          },
        },
        tasks: true,  // Fetch tasks owned by the user
        taskAssignees: {
          include: {
            task: true,
          },
        },
      },
    });
} */

export async function GET(request: NextRequest) {
  try {
    const Projects = await prisma.project.findMany({
      include: {
        tasks: true,
        files: true,
        users: true,
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
