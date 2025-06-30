import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "movies.json");

  try {
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const movies = JSON.parse(jsonData);
    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to load movie data", error },
      { status: 500 }
    );
  }
}
