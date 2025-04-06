import mongoose from "mongoose";
import { thirtyDaysFromNow } from "../utils/date";
export interface SessionDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    userAgent?: string;
   
    createdAt: Date;
    exipresAt: Date;
}

const SessionSchema = new mongoose.Schema<SessionDocument>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref:"User",required: true,index:true },
    userAgent: { type: String },
    createdAt: { type: Date, required: true ,default: Date.now},
    exipresAt: { type: Date, default:thirtyDaysFromNow() },
})

const SessionModel = mongoose.model<SessionDocument>("Session", SessionSchema,"sessions");
export default SessionModel;