import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import { Movie } from "../../../lib/models/Movie";
import { Genre } from "../../../lib/models/Genre";

export async function GET() {
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
  await dbConnect();

  try {
    const body = await request.json();
    const { title, genreId, numberInStock, dailyRentalRate } = body;

    // Convert to numbers here
    body.numberInStock = Number(body.numberInStock);
    body.dailyRentalRate = Number(body.dailyRentalRate);

    if (!title || !genreId || !numberInStock || !dailyRentalRate) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Fetch the actual genre document using genreId
    const genre = await Genre.findById(genreId);
    if (!genre) {
      return NextResponse.json({ error: "Invalid genre ID." }, { status: 400 });
    }

    const objString = genre._id.toString();
    console.log("Genre Id", objString);
    const movie = new Movie({
      title,
      genre: {
        _id: objString, // Use the string representation of the ObjectId
        name: genre.name, // Assuming genre has a 'name' field
      },
      numberInStock,
      dailyRentalRate,
    });


    const savedMovie = await movie.save();
  console.log('Saved Movie:', savedMovie);

    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create movie." },
      { status: 500 }
    );
  }
}
