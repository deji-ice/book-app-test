import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/types";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    const filePath = path.join(process.cwd(), "src/data/users.json"); // Path to the users JSON file
    const file = await fs.readFile(filePath, "utf-8"); // Read users from JSON file
    const users = JSON.parse(file); // Parse users from JSON file

    const user = users.find(
        (user: User) => user.email === email && user.password === password
    );
    // Check if user exists
    if (!user) {
        return NextResponse.json(
            { message: "Invalid email or password" },
            { status: 401 }
        );
    }

    return NextResponse.json(
        { message: "Login successful", data: user },
        { status: 200 }
    );
}
