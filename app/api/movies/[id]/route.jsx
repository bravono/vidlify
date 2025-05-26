import dbConnect from "../../../../lib/mongodb";
import { Movie } from "../../../../lib/models/Movie";
import { NextResponse } from "next/server";

// GET /api/movies/[id]
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

// PUT /api/movies/[id]
export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = params;
  const body = await req.json();

  // Convert number fields
  if (body.numberInStock !== undefined)
    body.numberInStock = Number(body.numberInStock);
  if (body.dailyRentalRate !== undefined)
    body.dailyRentalRate = Number(body.dailyRentalRate);

  try {
    const movie = await Movie.findByIdAndUpdate(
      id,
      {
        title: body.title,
        genre: body.genreId, // Make sure your Movie schema uses ObjectId for genre
        numberInStock: body.numberInStock,
        dailyRentalRate: body.dailyRentalRate,
      },
      { new: true }
    );

    if (!movie) {
      return NextResponse.json({ error: "Movie not found." }, { status: 404 });
    }

    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

// DELETE /api/movies/[id]
export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = await params;

  try {
    const movie = await Movie.findByIdAndRemove(id);

    if (!movie) {
      return NextResponse.json({ error: "Movie not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Movie deleted successfully." });
  } catch (error) {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
