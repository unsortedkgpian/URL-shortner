import { nanoid } from "nanoid";
import dbConnect from "@/lib/dbConnect";
import UrlModel from "@/model/Url";

export async function POST(req: Request) {
  await dbConnect();
  const { urlo } = await req.json();

  if (!urlo) {
    return new Response(JSON.stringify({ error: "URL is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const shortId = nanoid(8);
  const newUrl = new UrlModel({ shortId, redirectURL: urlo });
  await newUrl.save();

  return new Response(JSON.stringify({ shortId }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}