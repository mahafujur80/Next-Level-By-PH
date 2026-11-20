import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
import type { Role } from "../types";

const auth = (...roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      const decoded = jwt.verify(
        token as string,
        config.jwtSecret,
      ) as JwtPayload;
      const user = await pool.query(
        `
    SELECT * FROM users WHERE email=$1
    `,
        [decoded.email],
      );

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorize Access",
        });
      }

      if (user.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: "user not found...!",
        });
      } else if (!user.rows[0].is_active) {
        return res.status(403).json({
          success: false,
          message: "forbidden",
        });
      }

      if (roles.length && !roles.includes(user.rows[0].role)) {
        return res.status(401).json({
          success: false,
          message: "Unauthorize Access",
        });
      }

      req.user = decoded;
      next();
    } catch (error) {
      console.log("AUTH ERROR:", error);
      next(error);
    }
  };
};
export default auth;
