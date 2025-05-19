import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import { Genre } from "../../../lib/models/Genre";

export async function GET() {
  try {
    await dbConnect();
    const genres = await Genre.find();
    return NextResponse.json(genres);
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      { error: "Failed to fetch genres" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    console.log("body", body);
    const genre = await Genre.create(body);
    return NextResponse.json(genre, { status: 201 });
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      { error: "Failed to create genre" },
      { status: 400 }
    );
  }
}
