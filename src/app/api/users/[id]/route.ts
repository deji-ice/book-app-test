import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/types";

type Params = {
    // This might be a promise that resolves to an object containing the id parameter
    params: Promise<{
        id: string;
    }>;
}

export const GET = async (_: NextRequest, { params }: Params) => {
    const { id } = await params //grab id from the request
    const filePath = path.join(process.cwd(), "src/data/users.json");
    const data = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(data);
    const user = users.find((user: User) => user.id === id);
    console.log("id:", id, "user:", user)

    if (!user) return NextResponse.json("no user found", { status: 404 })
    return NextResponse.json(user, { status: 200 });
}