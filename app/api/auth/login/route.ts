import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import {User} from '@/lib/models/User';
import { generateToken, setTokenCookie } from '@/utils/auth';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password } = await request.json();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken(user._id.toString());

    // Create response
    const response = NextResponse.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }, { status: 200 });

    // Set cookie
    setTokenCookie(response, token);

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}