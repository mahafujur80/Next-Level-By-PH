import type { IncomingMessage } from "http";
import { json } from "stream/consumers";


export const bodyParser = (req:IncomingMessage):Promise<any>=>{
 

    return new Promise((resolve, reject)=>{
         let body = ""
         req.on("data", (chunk)=>{
            body = body + chunk;
         })

         req.on("end", ()=>{
            try{
            resolve(JSON.parse(body))
            }catch(error){
                reject(error)
            }
         })
    })
}