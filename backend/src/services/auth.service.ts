import UserModel from "../models/user.model";



export type CreateAccountPrarams = {
  email: string;
    password: string;
    userAgent?: string;
}

export const createAccount = async (data: CreateAccountPrarams) => {

    //verify the email is not already in use
    const existingUser = await UserModel.UserModel.exists({ email: data.email });

    if (existingUser) {
        throw new Error('Email is already in use');
    }
    //create a new user
    const user = await UserModel.UserModel.create({
        email: data.email,
        password: data.password,
    })



    //create a verification code
    //send the verification code to the user
    //create a new session
    //sign access token and refresh token
    // return the user and tokens

}
