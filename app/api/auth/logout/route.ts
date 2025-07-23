import { NextResponse } from 'next/server';
import { removeTokenCookie } from '@/utils/auth';

export async function POST() {
  const response = NextResponse.json(
    { message: 'Logged out successfully' },
    { status: 200 }
  );
  
  removeTokenCookie(response);
  return response;
}