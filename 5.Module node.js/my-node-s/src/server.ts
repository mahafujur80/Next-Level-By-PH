import { createServer, IncomingMessage, ServerResponse } from "http";
import routeHandler from "./route/route";

const server = createServer((req:IncomingMessage, res:ServerResponse)=>{
     routeHandler(req, res)
})


server.listen(5001, ()=>{
    console.log("server is listening.......!")
})