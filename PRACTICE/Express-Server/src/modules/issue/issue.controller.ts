import type { Request, Response } from "express";
import { issueService } from "./issue.service";
import sentResponse from "../../utils/sendRespons";

const createIssue = async(req:Request, res:Response)=>{
 try {
    if (!req.user) {
      throw new Error("Unauthorized user");
    }
    const {id} = req.user;
    const result = await issueService.createIssueIntoDB(req.body, Number(id));

     sentResponse(res, {
            statusCode:201,
            success: true,
            message: "issue create success..",
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

const getAllIssue = async(req:Request, res:Response)=>{
 try {
    const result = await issueService.getAllIssueFromDB()

    sentResponse(res, {
        statusCode: 200,
        success: true,
        message: "all issue data get",
        data: result.rows
    })
 } catch (error:any) {
    sentResponse(res, {
        statusCode: 500,
        success: false,
        message:error.message,
        error: error
    })
 }
};

const updateUserIssue = async(req:Request, res:Response)=>{
 try { 
    if(!req.user){
        throw new Error("user is not exits on request")
    }

    const {id} = req.params;
    const role = req.user.role
    
    const result = await issueService.updateUserIssueIntoDB(req.body, Number(id), role ) ;
    
    sentResponse(res, {
        statusCode: 200,
        success: true,
        message:"issue update success",
        data: result.rows[0]
    })
 } catch (error:any) {
    sentResponse(res, {
        statusCode: 500,
        success: false,
        message:error.message,
        error: error
    })
 }
};

export const issueController = {
    createIssue,
    getAllIssue,
    updateUserIssue,
}