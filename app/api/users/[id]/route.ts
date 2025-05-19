import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import { User } from "../../../../lib/models/User";

export async function GET(
  
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const user = await User.findById(params.id);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json(user);
  } catch (error) {
        console.log(error)

    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
