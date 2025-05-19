import dbConnect from "../../../../lib/mongodb";
import { Movie } from "../../../../lib/models/Movie";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return NextResponse.json({ error: "Movie not found." }, { status: 404 });
    }
    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
