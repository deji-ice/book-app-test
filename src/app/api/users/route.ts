import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (_: NextRequest) => {
    const filePath = path.join(process.cwd(), "src/data/users.json");
    const data = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(data);
    // Check if users array is empty
    if (!users || users.length === 0) {
        return NextResponse.json({ error: "No users found" }, { status: 404 });
    }
    return NextResponse.json(users, {
        status: 200,
    });
}