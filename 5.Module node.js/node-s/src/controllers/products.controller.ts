import { IncomingMessage, ServerResponse } from "http";
import productsService from "../service/products.service";
import type { Product } from '../types/products';

const productController = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  const urlParam = url?.split("/");

  const id = urlParam && urlParam[1] === "products" ? Number(urlParam[2]) : null;

  
  if (url === "/products" && method === "GET") {
      const products = productsService();
      res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "products get successfully",
        data: products,
      }),
    );
  } else if (method === "GET" && id !== null) {
     const products = productsService() 
     const product = products.find((p: Product)=> p.id === id);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "products get successfully",
        data: product,
      }),
    );
  }
};

export default productController;
