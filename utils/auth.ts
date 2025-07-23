import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

const secret = process.env.SECRET_KEY as string;
const expiresIn = "30d";

interface TokenPayload {
  id: string;
}

export function generateToken(id: string): string {
  return jwt.sign({ id }, secret, { expiresIn });
  
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, secret) as TokenPayload;
}

export function setTokenCookie(res: NextResponse, token: string): void {
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
  });
}

export function removeTokenCookie(res: NextResponse): void {
  res.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });
}
