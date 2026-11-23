import bcrypt from "bcryptjs";
import { pool } from "../../db/db";
import type { User } from "./user.interface";

const createUserIntoDB = async (payload: User) => {
  const { name, email, password, role } = payload;

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
        INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, COALESCE($4, 'contributor'))
        RETURNING *
        `,
    [name, email, hashPassword, role],
  );
  delete result.rows[0].password;

  return result;
};

const getAllUserFromDB = async () => {
  const result = await pool.query(`
        SELECT * FROM users
        `);
  return result;
};

const updateUserIntoDB = async (id: number, payload: any) => {
  const { name, email, password } = payload;
  const hashPassword = password ? await bcrypt.hash(password, 10) : null;
  const result = await pool.query(
    `
  UPDATE users SET 
  name = COALESCE($1, name),
  email = COALESCE($2, email),
  password = COALESCE($3, password),
  updated_at = NOW()
  WHERE id=$4
  RETURNING*
  `,
    [name ?? null, email ?? null, hashPassword ?? null, id],
  );
delete result.rows[0].password
  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUserFromDB,
  updateUserIntoDB,
};
