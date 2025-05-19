import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import { Rental } from "../../../lib/models/Rental";

export async function GET() {
  try {
    await dbConnect();
    const rentals = await Rental.find();
    return NextResponse.json(rentals, { status: 200 });
  } catch (error) {
        console.log(error)

    return NextResponse.json(
      { error: "Failed to fetch rentals" },
      { status: 500 }
    );
  }
};

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    console.log("body", body);
    const rental = await Rental.create(body);
    return NextResponse.json(rental, { status: 201 });
  } catch (error) {
        console.log(error)

    return NextResponse.json(
      { error: "Failed to create rental" },
      { status: 400 }
    );
  }
}
