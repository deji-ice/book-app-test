import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { Book } from "@/types";

type Params = {
    // This might be a promise that resolves to an object containing the id parameter
    params: Promise<{
        id: string;
    }>;
}

export const GET = async (_: NextRequest, { params }: Params) => {
    const { id } = await params //grab id from the request 
    // Read the books.json file dynamically
    const filePath = path.join(process.cwd(), "src/data/books.json");
    const fileData = await fs.readFile(filePath, "utf-8");
    const books = JSON.parse(fileData); // Parse the JSON data
    const book = books.find((b: Book) => b.id === id); // Find the book by ID
    console.log("id:", id, "book:", book)
    if (!book) return NextResponse.json("noo book found", { status: 404 })// If no book is found, return a 404 response
    return NextResponse.json(book, { status: 200 }); // Return the found book as a JSON response
}