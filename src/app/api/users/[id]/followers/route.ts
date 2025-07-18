import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/types";

type Params = {
    params: Promise<{
        id: string;
    }>;
};

export const GET = async (_: NextRequest, { params }: Params) => {
    const { id } = await params;

    // Read users.json
    const filePath = path.join(process.cwd(), "src/data/users.json");
    const data = await fs.readFile(filePath, "utf-8");
    const users: User[] = JSON.parse(data);

    // Check if users array is empty
    if (!users || users.length === 0) {
        return NextResponse.json({ error: "No users found" }, { status: 404 });
    }
    // Find the target user
    const targetUser = users.find((u) => u.id === id);

    if (!targetUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get followers → find full user objects
    const followers = users.filter((u) => targetUser.followers?.includes(u.id));

    return NextResponse.json(followers, { status: 200 });
};
