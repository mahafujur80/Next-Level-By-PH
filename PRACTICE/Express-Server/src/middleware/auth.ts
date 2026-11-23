import type { NextFunction, Request, Response } from "express";
import jwt, { decode, type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db/db";
import sentResponse from "../utils/sendRespons";
import type { Role } from "../types";

const auth = (...Roles:Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return sentResponse(res, {
          statusCode: 401,
          success: false,
          message: "Unauthorize access...",
        });
      }

      const decoded = jwt.verify(token, config.jwt_secret) as JwtPayload;
      const user = await pool.query(
        `
        SELECT * FROM users WHERE email=$1
        `,
        [decoded.email],
      );

      if (user.rowCount === 0) {
        sentResponse(res, {
          statusCode: 404,
          success: false,
          message: "user not found...",
        });
      }
      if (!user.rows[0].is_active) {
        sentResponse(res, {
          statusCode: 403,
          success: false,
          message: "access denied",
        });
      }

      if(!Roles.includes(user.rows[0].role)){
        sentResponse(res, {
          statusCode: 401,
          success:false,
          message: "unauthorize access"
        })
      }

      req.user = decoded;
      next();
    } catch (error) {
      console.log("auth error", error);
      next();
    }
  };
};

export default auth;
