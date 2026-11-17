import { pool } from "../../db";
import type { IUser } from "./user.interface";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, age } = payload;
  const queryText = `
    INSERT INTO users (name, email, password, age)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;

  const values = [name, email, password, age];
  const result = await pool.query(queryText, values);
  return result;
};

export const userService = {
  createUserIntoDB,
};
