import mongoose, { Schema, Document } from "mongoose";

// export interface VisitHistory extends Document {
// 	timestamp: number;
// }

export interface Urlo extends Document {
	shortId: string;
	redirectURL: string;
	// visitHistory: VisitHistory[];
}

// const VisitHistorySchema: Schema<VisitHistory> = new Schema({
// 	timestamp: { type: Number, required: true },
// });

// Schema for the URL model
const UrlSchema: Schema<Urlo> = new Schema(
	{
		shortId: {
			type: String,
			required: [true, "Short ID must be provided"],
		},
		redirectURL: {
			type: String,
			required: [true, "Redirect URL must be provided"],
		},
		// visitHistory: {
		// 	type: [VisitHistorySchema], // Define as an array of subdocuments
		// 	default: [],
		// },
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt
	}
);

// Prevent overwriting models during hot-reloading
const UrlModel = mongoose.models.Urlo || mongoose.model<Urlo>("Urlo", UrlSchema);

export default UrlModel;
