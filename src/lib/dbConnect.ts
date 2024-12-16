import mongoose from "mongoose";

type ConnectionObject = {
	isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
	if (connection.isConnected) {
		console.log("Already connected to database");
		return;
	}

	try {
		const db = await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://theadityakumar2810:QmRtnzse2eEJpF9t@cluster0.pvqli.mongodb.net/", {});

		connection.isConnected = db.connections[0].readyState;

		console.log("DB connected successfully");
	} catch (error) {
		console.log("DB connection failed", error);
	}
}

export default dbConnect;
