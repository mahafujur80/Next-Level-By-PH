import express, { type Application, type Request, type Response } from "express";
import { Pool, Query } from "pg";
const app: Application = express();
const port: number = 5000;
import dotenv from "dotenv";

dotenv.config()
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended: true}))

const pool = new Pool({
    connectionString: process.env.DATABASE_URL_POOLED
})

const initDB = async()=>{
    try{
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        age INT,
        is_Active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        );
        `)
        console.log("Database Connected")
    }catch(error){
        console.log(error)
    }
}

initDB()


app.get("/", (req: Request, res: Response)=>{
  res.status(200).json({
    success: true,
    message: "Hello this is express response",
    author: "munna bhai",
    data: req.body,
  })
})

app.post("/", async(req: Request, res: Response)=>{
    console.log(req.body)
    res.status(201).json(req.body)
})
app.listen(port, ()=>{
    console.log("server is running on port", port)
})