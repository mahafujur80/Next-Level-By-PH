import path from "node:path";
import fs from "fs"
import type { UserType } from "../types/types";
const filePath = path.join(process.cwd(), "/src/database/db.json")

export const userDataService = ()=>{

    const userData = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(userData)
};

export const createUser = (payload: UserType[])=>{
fs.writeFileSync(filePath, JSON.stringify(payload))
}