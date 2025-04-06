import AppErrorCode from '../constants/appErrorCode';
import { HttpStatusCode } from '../constants/http';
import AppError from './AppError';
import assert from 'node:assert'


type AppAssert = (
    conditon:any,
    httpStatusCode:HttpStatusCode,
    message:string,
    appErrorCode?:AppErrorCode
)=> asserts conditon


// Asserts a condition and throws an error if the condition is false.


const appAssert: AppAssert = (
    condition,
    httpStatusCode,
    message,
    appErrorCode
) => assert(condition, new AppError(httpStatusCode, message, appErrorCode)) 


export default appAssert;