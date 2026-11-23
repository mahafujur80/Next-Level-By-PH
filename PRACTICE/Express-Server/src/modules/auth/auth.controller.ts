import type { Request, Response } from "express";
import { authService } from "./auth.service";
import sentResponse from "../../utils/sendRespons";

const loginUser = async(req:Request, res:Response)=>{
try {
    const result = await authService.logInUser(req.body)
   console.log(req.body)
    sentResponse(res, {
        statusCode:200,
        success: true,
        message: "login successfully..",
        data: result
    })
} catch (error:any) {
    sentResponse(res, {
        statusCode:500,
        success: false,
        message: error.message,
        error: error
    })
}
}

export const authController = {
    loginUser,
}