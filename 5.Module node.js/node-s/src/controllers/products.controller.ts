import { IncomingMessage, ServerResponse } from "http";
import productsService from '../service/products.service';

const productController = (req: IncomingMessage, res: ServerResponse) => {

    const url = req.url;
    const method = req.method;

    if(url === '/products' && method === "GET"){
      const products = productsService()
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            "message": "products get successfully",
            data: products
        }));
    }
};

export default productController;
