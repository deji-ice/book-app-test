import users from "@/data/users";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const { email, password, userName } = await req.json();
    const existingUser = users.find(user => user.email === email || user.userName === userName);
    // Check if user already exists
    if (existingUser) {
        return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    // If user doesn't exist, create a new user
    const newUser = {
        id: (users.length + 1).toString(),
        email,
        password,
        userName,
        followers: [],
        following: [],
    };
    users.push(newUser);

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
}