import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import {User} from '@/lib/models/User';
import { verifyToken } from '@/utils/auth';

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 401 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}