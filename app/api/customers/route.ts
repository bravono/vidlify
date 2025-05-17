import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import { Customer, validateCustomer } from "../../../lib/models/Customer";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const customers = await Customer.find();
    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching customers" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const customer = await Customer.create(body);
    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create customer" },
      { status: 500 }
    );
  }
}
