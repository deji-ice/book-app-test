import users from "@/data/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
}