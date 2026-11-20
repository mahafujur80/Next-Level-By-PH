import type { NextFunction, Request, Response } from "express";
import fs from "fs";

const logger = async (req: Request, res: Response, next: NextFunction) => {
  const log = `\n Method: ${req.method} | Url: ${req.url} | Time: ${Date.now()}`;
  fs.appendFile("logger.txt", log, (err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
};

export default logger;
