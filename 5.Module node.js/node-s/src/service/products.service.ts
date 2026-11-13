import fs from "fs"
import path from "node:path";

const filePath = path.join(process.cwd(), "./src/database/db.json")

const productsService = ()=>{

    const result = fs.readFileSync(filePath, "utf-8")
   return JSON.parse(result);
};

export default productsService;