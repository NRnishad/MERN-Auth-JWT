import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import VerificationCodeType from "../constants/verificationCodeType";
import SessionModel from "../models/session.model";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/env";
import { oneYearFromNow} from "../utils/date";
import { JWT_REFRESH_SECRET } from "../constants/env";

export type CreateAccountPrarams = {
  email: string;
    password: string;
    userAgent?: string;
}

export const createAccount = async (data: CreateAccountPrarams) => {

    //verify the email is not already in use
    const existingUser = await UserModel.exists({ email: data.email });

    if (existingUser) {
        throw new Error('Email is already in use');
    }
    //create a new user
    const user = await UserModel.create({
        email: data.email,
        password: data.password,
    })

    //create a verification code
    const verificationCode = await VerificationCodeModel.create({
        userId: user._id,
        type: VerificationCodeType.EmailVerification,

        expiresAt: oneYearFromNow(),
    })    
    //send the verification code to the user

    //create a new session
    const session = await SessionModel.create({
        userId: user._id,
        userAgent: data.userAgent,
    })

    //sign access token and refresh token
    const refreshToken = jwt.sign({
        sessionId: session._id},
        JWT_REFRESH_SECRET,
        {audience:["user"],
            expiresIn: "30d",
        })


    const accessToken = jwt.sign(
        {userId: user._id, sessionId: session._id},
        JWT_SECRET,
        {audience:["user"],
            expiresIn: "15m",
        })

    // return the user and tokens

    return {user, accessToken, refreshToken};

}
