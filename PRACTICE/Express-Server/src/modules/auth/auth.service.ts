import bcrypt from "bcryptjs";
import { pool } from "../../db/db";
import type { logInUser } from "./auth.interface";
import jwt from "jsonwebtoken"
import config from "../../config";

const logInUser = async(payload:logInUser)=>{
const {email, password} = payload
const user = await pool.query(`
    SELECT * FROM users WHERE email=$1
    `,[email]);

    if(user.rowCount === 0){
        throw new Error("invalid credential")
    };

    const matchPassword = await bcrypt.compare(password, user.rows[0].password);

    if(!matchPassword){
        throw new Error("invalid password")
    };

    if(!user.rows[0].is_active){
        throw new Error("access denied")
    };

    const jwtPayload = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        role: user.rows[0].role
    };

    const accessToken = jwt.sign(jwtPayload, config.jwt_secret,{
        expiresIn: "1d"
    });

return {accessToken, user: user.rows[0]};
};


export const authService = {
    logInUser,
}