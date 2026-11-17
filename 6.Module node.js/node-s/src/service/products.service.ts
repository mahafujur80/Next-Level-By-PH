import fs from "fs"
import path from "node:path";
import type { Product } from "../types/products";

const filePath = path.join(process.cwd(), "./src/database/db.json")

const productsService = ()=>{

    const result = fs.readFileSync(filePath, "utf-8")
   return JSON.parse(result);
};

export default productsService;

export const createProduct = (payload: Product[])=>{
fs.writeFileSync(filePath, JSON.stringify(payload))
};

export const updateProduct = (payload: Product[])=>{
    fs.writeFileSync(filePath, JSON.stringify(payload))
}