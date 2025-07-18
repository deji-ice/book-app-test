import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const GET = async (req: NextRequest) => {
    const filePath = path.join(process.cwd(), "src/data/books.json");
    const data = await fs.readFile(filePath, "utf-8");
    const books = JSON.parse(data);

    if (!books || books.length === 0) {
        return NextResponse.json({ error: "No books found" }, { status: 404 });
    }

    // Read page and limit from query params
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1"); // Default to page 1
    const limit = parseInt(searchParams.get("limit") || "10"); // Default to 10 items per page

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedBooks = books.slice(startIndex, endIndex);

    return NextResponse.json(
        {
            books: paginatedBooks,
            total: books.length,
            page,
            limit,
        },
        {
            status: 200,
        }
    );
};
