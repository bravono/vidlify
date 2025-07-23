import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import { generateToken, setTokenCookie } from "@/utils/auth";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { firstName, lastName, email, phone, password } =
      await request.json();

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
    });

    // Generate token
    const token = generateToken(user._id.toString());

    // Create response
    const response = NextResponse.json(
      {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
      },
      { status: 201 }
    );

    // Set cookie
    setTokenCookie(response, token);

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
