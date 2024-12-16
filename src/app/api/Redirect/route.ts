import dbConnect from "@/lib/dbConnect";
import UrlModel from "@/model/Url";

export async function POST(req: Request) {
  await dbConnect();

//   if (!urlo) {
//     return new Response(JSON.stringify({ error: "URL is required" }), {
//       status: 400,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   const shortId = nanoid(8);
//   const newUrl = new UrlModel({ shortId, redirectURL: urlo });
    //   await newUrl.save();
    

  try {
      const { shortId } = await req.json();
      const redirectUrl = await UrlModel.findOne({ shortId })
      
      if (redirectUrl) {
          const fullUrl = redirectUrl.redirectURL
          return new Response(JSON.stringify({ fullUrl }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        })
      }else{
          return  Response.json( {
            status: 550
        }) 
      }
  } catch (error) {
    console.log(error,"error")
  }
}
