import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { pool } from "./db";
const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Hello this is express response",
    author: "munna bhai",
    data: req.body,
  });
});

app.post("/api/v1/users", async (req: Request, res: Response) => {
  const { name, email, password, age, is_Active } = req.body;
  const queryText = `
    INSERT INTO users (name, email, password, age, is_Active)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `;

  try {
    const values = [name, email, password, age, is_Active];
    const result = await pool.query(queryText, values);

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
});

// user get api
app.get("/api/v1/users", async (req: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM users");

  res.status(200).json({
    success: true,
    message: "user all data successfully fetch",
    data: result.rows,
  });
});

// get 1 user form all user

app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const queryText = "SELECT * FROM users WHERE id = $1";
    const result = await pool.query(queryText, [id]);

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
});
// update user

app.patch("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, password, age, is_Active } = req.body;
    const queryText = `
    UPDATE users
    SET 
    name = COALESCE($1, name),
    password = COALESCE($2, password),
    age = COALESCE($3, age),
    is_Active = COALESCE($4, is_Active),
    updated_at = NOW()
    WHERE id = $5
    RETURNING *
    `;
    const result = await pool.query(queryText, [
      name ?? null,
      password ?? null,
      age ?? null,
      is_Active ?? null,
      id,
    ]);

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
});

// delete user form users table
app.delete("/api/v1/users/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      `DELETE FROM users WHERE id =$1 RETURNING *`,
      [userId],
    );
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
});


export default app;