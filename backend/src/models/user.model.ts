import mongoose from "mongoose";
import { hashValue,compareValue } from "../utils/bcrypt";
export interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(value:string):Promise<boolean>;
}


const UserSchema = new mongoose.Schema<UserDocument>({
    email: { type: String, unique: true ,required:true},
    password: { type: String, required: true },
    verified: { type: Boolean, default: false,required:true },
}, { timestamps: true });


UserSchema.pre("save", async function (next) {
    
        this.password = await hashValue(this.password);
    
    next();
})


UserSchema.methods.comparePassword = async function (value: string) {
    return await compareValue(value, this.password);
}



const UserModel = mongoose.model<UserDocument>("User", UserSchema);
export default UserModel;