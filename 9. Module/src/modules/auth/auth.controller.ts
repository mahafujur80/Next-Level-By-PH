import type { Request, Response } from "express";
import { authService } from "./auth.service";
import sentResponse from "../../utils/sendRespond";

const userLogin = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoApp(req.body);
    const {refreshToken} = result;

    res.cookie("refreshToken", refreshToken, {
      secure: false, // http -> false, https -> true / in production -> true
      httpOnly: true, // prevent xss attack
      sameSite: "lax", // "none", "strick", "lax"--> CSRF
      path: "/",
      domain: "localhost", // example.com
    })


    res.status(200).json({
      success: true,
      message: "user login successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
};


const generateToken = async (req: Request, res: Response) => {
  try {
    const result = await authService.generateAccessToken(req.cookies.refreshToken);
  //  console.log(req.cookies.refreshToken);
    sentResponse(res,{
      statusCode: 200,
      success: true,
      message: "access token generated successfully",
      data: result
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
};


export const authController = {
  userLogin,
  generateToken
};
