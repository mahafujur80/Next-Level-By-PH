import { IncomingMessage, ServerResponse } from "http";
import productController from '../controllers/products.controller';
const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "hello this is json data" }));
  } else if (url?.startsWith("/products")) {
       productController(req, res)
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid route" }));
  }
};

export default routeHandler;
