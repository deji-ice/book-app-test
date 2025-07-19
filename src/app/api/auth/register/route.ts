import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/types";

export async function POST(req: NextRequest) {
    try {
        const { email, password, userName } = await req.json();

        const filePath = path.join(process.cwd(), "src/data/users.json"); // Path to the users JSON file
        const file = await fs.readFile(filePath, "utf-8"); // Read users from JSON file
        const users = JSON.parse(file);
        // Check if user with the same email or username already exists
        if (!Array.isArray(users)) {
            return NextResponse.json(
                { message: "Invalid user data" },
                { status: 500 }
            );
        }

        const existingUser = users.find(
            (user: User) => user.email === email || user.userName === userName
        );

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 409 }
            );
        }

        const newUser = {
            id: crypto.randomUUID(),
            email,
            password,
            userName,
            followers: [],
            following: [],
        };

        users.push(newUser); // Add new user to the users array

        await fs.writeFile(filePath, JSON.stringify(users, null, 2)); // Save updated users list

        return NextResponse.json(
            { message: "User registered successfully", data: newUser },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: error?.message || "Unexpected error occurred" },
            { status: 500 }
        );
    }
}
