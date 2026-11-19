import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IUser } from "./user.interface";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, age } = payload;
  
  const hashPassword = await bcrypt.hash(password, 10)
  
  const queryText = `
    INSERT INTO users (name, email, password, age)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;

  const values = [name, email, hashPassword, age];
  const result = await pool.query(queryText, values);
  delete result.rows[0].password;
  return result;
};

const getAllUsersFromDB = async()=>{
  const result = await pool.query("SELECT * FROM users");
  return result;
};

const getSingleUserFromDB = async(id:number)=>{

    const queryText = "SELECT * FROM users WHERE id = $1";
    const result = await pool.query(queryText, [id]);
  return result;
};

const updateUserIntoDB = async(id: number, payload: Partial<IUser>)=>{
    const { name, password, age } = payload;
    const queryText = `
    UPDATE users
    SET 
    name = COALESCE($1, name),
    password = COALESCE($2, password),
    age = COALESCE($3, age),
    updated_at = NOW()
    WHERE id = $4
    RETURNING *
    `;
    const result = await pool.query(queryText, [
      name ?? null,
      password ?? null,
      age ?? null,
      id,
    ]);
    return result;
};

const deleteUserFromDB = async(userId: number)=>{
  const result = await pool.query(
      `DELETE FROM users WHERE id =$1 RETURNING *`,
      [userId],
    );
  return result;
}

export const userService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};
