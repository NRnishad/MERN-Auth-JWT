
import catchErrors  from '../utils/catchErrors';
import { z } from 'zod';
import { createAccount } from '../services/auth.service';
import { setAuthCookies } from '../utils/cookies';
import { CREATED } from '../constants/http';



const registerSchema = z.object({
    email: z.string().email().min(6).max(100),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
    userAge: z.number().int().max(100).optional(),

}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],  // set the path to the field that should be validated   
});




export const registerHandler = catchErrors(async (req, res) => {
    // validate the request
    const request = registerSchema.parse({
        ...req.body,
    userAgent:req.headers['user-agent'],
      });
    //call the service
    const {user, accessToken, refreshToken} = await createAccount(request);



    //send the response 
    return setAuthCookies({res, accessToken, refreshToken}).status(CREATED).json(user)



}) 
