"use client";

import { useCallback, useState } from "react";
import axios from "axios";

export default function Home() {
  const [urlo, seturl] = useState("");
  const [shortId, setShortId] = useState("");

  const getsortid = useCallback(async () => {
    try {
      console.log("request is send");
      const response = await axios.post('/api/Urlshorting', { urlo }, {timeout: 100000});
      setShortId(response.data.shortId);
      console.log("we got the response");
      // console.log(response.data.shortId);
    } catch (error) {
      console.log("error in getting shortid", error);
      throw new Error("coudent get responce",)
    }
  }, [urlo]);
	// ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await getsortid();
  };
    const copyToClipboard = () => {
    const shortUrl = `https://url-shortner-pied-ten.vercel.app/${shortId}`;
    navigator.clipboard.writeText(shortUrl).then(() => {
      alert("Short URL copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  };

  return (
    <div className="min-h-screen flex flex-col  mx-auto items-center bg-slate-500 p-6 top-2">
      <h1 className="text-5xl font-bold mb-6 text-gray-800">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <label htmlFor="urlo" className="block text-gray-700 text-sm font-bold mb-2">
          URL:
        </label>
        <input
          type="text"
          id="urlo"
          name="urlo"
          value={urlo}
          onChange={(e) => {
            console.log(e.target.value);
            seturl(e.target.value);
          }}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
        >
          Shorten
        </button>
      </form>
      {shortId && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Short URL:</h2>
          <div className="flex items-center">
            <input
              type="text"
              value={`https://url-shortner-pied-ten.vercel.app/${shortId}`}
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onClick={(e) => e.currentTarget.select()} // Selects text on click
            />
            <button
              onClick={copyToClipboard}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
