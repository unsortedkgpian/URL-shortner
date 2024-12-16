import dbConnect from "@/lib/dbConnect";
import UrlModel from "@/model/Url";
import { nanoid } from "nanoid";

export async function generateShortId(url: string){
	  try {
		await dbConnect(); // Ensure the database connection is awaited
		const shortId = nanoid(8);
		const newUrl = new UrlModel({
            shortId: shortId,
            redirectURL: url,

		});
		await newUrl.save();
		return shortId;
  } catch (error) {
    console.error('Error generating short ID', error);
    throw new Error('Failed to generate short ID');
  }
}
