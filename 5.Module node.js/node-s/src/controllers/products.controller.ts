import { IncomingMessage, ServerResponse } from "http";

const productController = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify({ products: "this is products array of object" }));
};

export default productController;
