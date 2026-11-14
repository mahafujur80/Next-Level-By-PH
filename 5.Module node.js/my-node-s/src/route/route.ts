import type { IncomingMessage, ServerResponse } from "http";
import userController from "../controller/user.controller";

const routeHandler = (req: IncomingMessage, res: ServerResponse)=>{
    const url = req.url;
    const method = req.method;

    console.log(url, method)

    if(url === "/" && method === "GET"){
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({"message": "this is home route"}))
    }else if(url?.startsWith("/users")){
        userController(req, res)
    }
    else{
         res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({"message": "this route is not define"}))
    }
  
};

export default routeHandler;