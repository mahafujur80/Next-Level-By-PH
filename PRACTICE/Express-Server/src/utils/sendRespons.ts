import type { Response } from "express";
import type { TResponse } from "../types";


const sentResponse = <T>(res:Response, data:TResponse<T>)=>{
 res.status(data.statusCode).json({
 success: data.success,
 message: data.message,
 data: data.data,
 error: data.error
 })
};

export default sentResponse;