import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/types";

type Params = {
    params: Promise<{
        id: string;
    }>;
};

// load users.json
const getUsers = async (): Promise<User[]> => {
    const filePath = path.join(process.cwd(), "src/data/users.json");
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
};

// save users.json
const saveUsers = async (users: User[]) => {
    const filePath = path.join(process.cwd(), "src/data/users.json");
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
};

// POST /users/:id/follow
export const POST = async (req: NextRequest, { params }: Params) => {
    const { id } = await params;
    const body = await req.json();
    const { followerId } = body;

    if (!followerId) {
        return NextResponse.json({ error: "Missing followerId" }, { status: 400 });
    }

    const users = await getUsers();
    const user = users.find((u) => u.id === id);
    const follower = users.find((u) => u.id === followerId);

    if (!user || !follower) {
        return NextResponse.json({ error: "User or follower not found" }, { status: 404 });
    }

    // Add follower if not already present
    if (!user.followers.includes(followerId)) {
        user.followers.push(followerId);
    }
    if (!follower.following.includes(id)) {
        follower.following.push(id);
    }

    await saveUsers(users);

    return NextResponse.json({ message: `User ${followerId} now follows User ${id}` });
};

// DELETE /users/:id/follow
export const DELETE = async (req: NextRequest, { params }: Params) => {
    const { id } = await params;
    const body = await req.json();
    const { followerId } = body;

    if (!followerId) {
        return NextResponse.json({ error: "Missing followerId" }, { status: 400 });
    }

    const users = await getUsers();
    const user = users.find((u) => u.id === id);
    const follower = users.find((u) => u.id === followerId);

    if (!user || !follower) {
        return NextResponse.json({ error: "User or follower not found" }, { status: 404 });
    }

    // Remove follower
    user.followers = user.followers.filter((fid) => fid !== followerId);
    follower.following = follower.following.filter((fid) => fid !== id);

    await saveUsers(users);

    return NextResponse.json({ message: `User ${followerId} no longer follows User ${id}` });
};
