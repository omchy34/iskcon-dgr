// app/api/darshan/route
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Darshan } from "@/lib/model/darshan";

// GET → public website fetches all folders
export async function GET() {
  await connectDB();
  const folders = await Darshan.find().sort({ createdAt: -1 });
  return NextResponse.json(folders);
}

// POST → admin creates a new folder
export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const folder = await Darshan.create(body);
  return NextResponse.json(folder);
}