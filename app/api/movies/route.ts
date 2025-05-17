import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import { Movie, validateMovie } from "../../../lib/models/Movie";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const movies = await Movie.find();
    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching movies" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    console.log("body", body)
    const movie = await Movie.create(body);
    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create movie" },
      { status: 400 }
    );
  }
}
