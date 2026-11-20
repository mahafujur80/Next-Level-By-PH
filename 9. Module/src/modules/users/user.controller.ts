import type { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "user created",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
};

const getAllUser = async(req: Request, res: Response) => {
  try {
  const result = await userService.getAllUsersFromDB()
  
  res.status(200).json({
    success: true,
    message: "user all data successfully fetch",
    data: result.rows,
  });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
};

// get single user 
const getUserById =  async (req: Request, res: Response) => {
  try {
     const {id} = req.params;
    const userId = Number(id)
    const result = await userService.getSingleUserFromDB(userId as number)
   
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Get User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
// update user

const updateUserById = async (req: Request, res: Response) => {
  try {
     const { id } = req.params;
     const userId = Number(id)
    const result = await userService.updateUserIntoDB(userId as number, req.body)
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found. Invalid ID.",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "user data update success",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.error("Get User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteUser = async(req:Request, res:Response)=>{
     try {
    const { id } = req.params;
    const userId = Number(id)
    const result = await userService.deleteUserFromDB(userId as number)

    
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "user delete successfully",
    });
  } catch (error: any) {
    console.error("Get User Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export const usersController = {
  createUser,
  getAllUser,
  getUserById,
  updateUserById,
  deleteUser,
};
