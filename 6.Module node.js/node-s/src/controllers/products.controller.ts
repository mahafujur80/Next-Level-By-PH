import { IncomingMessage, ServerResponse } from "http";
import productsService, { createProduct, updateProduct } from "../service/products.service";
import type { Product } from '../types/products';
import { parseBody } from '../utils/parseBody';

const productController = async(req: IncomingMessage, res: ServerResponse) => {
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
  }else if(method === "POST" && url === "/products"){
    const body = await parseBody(req)
    const newProduct = {
      id: Date.now(),
      ...body
    }

    const products = productsService();
    products.push(newProduct)

    createProduct(products)

    res.writeHead(201, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "product create success" }));
  }else if(method === "PUT" && id !== null){
    const body = await parseBody(req)
    const products = productsService();
    const index = products.findIndex((p: Product)=> p.id === id);

    if(index < 0){
       res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "product not found" }));
    }
     
    products[index] = {
      id: products[index].id,
      ...body
    }
    updateProduct(products)


    res.writeHead(201, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "product update success" }));
  
  }else if(method === "DELETE" && id !== null){
    const products = productsService();
    const filterProducts = products.filter((p:Product)=> p.id !== id)
    console.log(filterProducts)
    updateProduct(filterProducts)

    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "product delete success" }));
  }
};

export default productController;
