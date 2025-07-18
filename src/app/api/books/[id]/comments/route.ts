import fs from "fs/promises";
import path from "path";
import { Comment } from "@/types";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    params: Promise<{
        id: string;
    }>;
};

export const POST = async (req: NextRequest, { params }: Params) => {
    const { id } = await params;
    const body = await req.json();

    if (!body || !id) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "src/data/books.json");

    //  Read the current books
    const fileData = await fs.readFile(filePath, "utf-8");
    const books = JSON.parse(fileData);

    // Create the new comment
    const newComment: Comment = {
        id: crypto.randomUUID(),
        userId: body.userId,
        comment: body.comment,
        rating: body.rating,
    };

    // Find the book & add comment
    const book = books.find((b: any) => b.id === id);
    if (!book) {
        return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    book.comments.push(newComment);

    // Write back to the file
    await fs.writeFile(filePath, JSON.stringify(books, null, 2));

    console.log("New comment added:", newComment);

    return NextResponse.json({ message: "Comment added successfully", newComment }, { status: 201 });
};
