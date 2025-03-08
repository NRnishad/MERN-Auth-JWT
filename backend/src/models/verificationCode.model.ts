import mongoose from "mongoose";
import VerificationCodeType from "../constants/verificationCodeType";

export interface VerificationCodeDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    type: VerificationCodeType;
    expiresAt: Date;
    createdAt: Date;
}

const VerificationCodeSchema = new mongoose.Schema<VerificationCodeDocument>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref:"User",required: true,index:true },
    type: { type: String, required: true },
    createdAt: { type: Date, required: true ,default: Date.now},
    expiresAt: { type: Date, required: true },

})



// 55 minutes 