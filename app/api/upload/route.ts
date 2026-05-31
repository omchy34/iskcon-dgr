// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files" }, { status: 400 });
    }

    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY!;
    const authHeader = "Basic " + Buffer.from(privateKey + ":").toString("base64");

    const results: { url: string; fileId: string }[] = [];

    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("fileName", `${Date.now()}-${file.name.replace(/\s+/g, "-")}`);
      fd.append("folder", "/darshan");

      const res = await fetch("https://upload.imagekit.io/api/v2/files/upload", {
        method: "POST",
        headers: { Authorization: authHeader }, // ← server side uses Basic Auth
        body: fd,
      });

      const data = await res.json();
      if (!data.url) throw new Error(data.message || "Upload failed");
      results.push({ url: data.url, fileId: data.fileId });
    }

    return NextResponse.json(results);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}