import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import { Movie } from "../../../lib/models/Movie";

export async function GET() {
  try {
    await dbConnect();
    const movies = await Movie.find();
    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Error fetching movies" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { title, genreId, numberInStock, dailyRentalRate } = body;

    if (!title || !genreId || !numberInStock || !dailyRentalRate) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const movie = new Movie({
      title,
      genre: genreId,
      numberInStock,
      dailyRentalRate,
    });

    await movie.save();

    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to create movie." },
      { status: 500 }
    );
  }
}
