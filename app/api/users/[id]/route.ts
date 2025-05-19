import dbConnect from "../../../../lib/mongodb";
import { User } from "../../../../lib/models/User";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

interface ErrorResponse {
  error: string;
}

export async function GET(
  req: NextRequest,
  { params }: Params
): Promise<NextResponse<any>> {
  try {
    await dbConnect();
    const user = await User.findById(params.id);
    if (!user)
      return NextResponse.json<ErrorResponse>({ error: "User not found" }, { status: 404 });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);

    return NextResponse.json<ErrorResponse>(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
