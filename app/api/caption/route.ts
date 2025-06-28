// app/api/caption/route.ts
import { IPayloadCaption } from "@/lib/models";
import { GenerateCaption } from "@/lib/server/generate";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs"; // Ensure it's running in Node.js environment

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get("image") as File;
  const caption = formData.get("caption") as string;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");

  const payload: IPayloadCaption = {
    caption: caption,
    image: file,
    base64: base64,
  };

  const captionResult = await GenerateCaption(payload);
  return NextResponse.json(captionResult, { status: 200 });
}
