import { ErrorRequestHandler,Response } from "express";
import { INTERNAL_SERVER_ERROR,BAD_REQUEST } from "../constants/http";
import {z} from 'zod';





const handleZodError = (res:Response, error:z.ZodError) => {
  const errors = error.issues.map((err) =>({
path:err.path.join('.'),
message:err.message

  }))
  res.status(BAD_REQUEST).json({
    message:error.message,errors
  })

}

const errorHandler:ErrorRequestHandler = (err, req, res, next) => {
  console.log(`PATH ${req.path}`,err);
  if(err instanceof z.ZodError){
    return handleZodError(res,err);
  }


  res.status(INTERNAL_SERVER_ERROR).send("internal server error");
}


export default errorHandler;