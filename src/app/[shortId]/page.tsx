import { redirect } from "next/navigation";
import UrlModel from "@/model/Url";
import dbConnect from "@/lib/dbConnect";

// Define the type for the params
interface ShortIdPageParams {
  shortId: string;
}

export default async function ShortIdPage({ params }: { params: Promise<ShortIdPageParams> }) {
  const { shortId } = await params;

  // Connect to the database
  await dbConnect();

  // Find the URL in the database
  const urlDoc = await UrlModel.findOne({ shortId });

  // Redirect if the URL exists
  if (urlDoc) {
    redirect(urlDoc.redirectURL); // Redirects to the stored URL
  }

  // If not found, render an error page
  return (
    <div>
      <h1>404: URL Not Found</h1>
    </div>
  );
}
