import type { Request, Response } from "express";
import { userService } from "./user.service";
import sentResponse from "../../utils/sendRespons";

const createUser = async(req:Request, res:Response)=>{
 try {
    const result = await userService.createUserIntoDB(req.body)
    console.log(result);
    console.log(req.method, req.url)
    sentResponse(res, {
        statusCode:200,
        success: true,
        message: "user create successfully..",
        data: result.rows[0]
    })
    
 } catch (error:any) {
    sentResponse(res, {
        statusCode:500,
        success: false,
        message: error.message,
        error: error
    })
 }
};

const getAllUser = async(req:Request, res:Response)=>{
try {
    const result  = await userService.getAllUserFromDB();
    sentResponse(res, {
        statusCode:200,
        success: true,
        message: "fetch all user successfully..",
        data: result.rows
    })
} catch (error:any) {
    sentResponse(res, {
        statusCode:500,
        success: false,
        message: error.message,
        error: error
    })
}
};

const updateUser = async(req:Request, res:Response)=>{
try {
    const {id} = req.params
    const userId = Number(id)
    const result = await userService.updateUserIntoDB(userId, req.body)
    
    sentResponse(res, {
        statusCode: 200,
        message: "user update success",
        success: true,
        data: result.rows[0]
    })
} catch (error:any) {
    sentResponse(res, {
        statusCode: 500,
        success: false,
        message: error.message,
        error: error
    })
}
};

export const userController = {
    createUser,
    getAllUser,
    updateUser,
}