import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { pool } from "../db";

const auth = async(req:Request, res:Response, next:NextFunction)=>{
  const token = req.headers.authorization;
  const decoded = jwt.verify(token as string, config.jwtSecret) as JwtPayload;
  const user = await pool.query(`
    SELECT * FROM users WHERE email=$1
    `,[decoded.email])

  if(!token){
    res.status(401).json({
        success: false,
        message: "Unauthorize Access"
    })
  };

  if(user.rowCount === 0){
    res.status(404).json({
        success: false,
        message: "user not found...!"
    })
  }else if(!user.rows[0].is_active){
    res.status(403).json({
        success: false,
        message: "forbidden"
    })
  }
  console.log(decoded);
  next()
};
export default auth;