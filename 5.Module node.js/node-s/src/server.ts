// server.mjs
import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import routeHandler from './route/route';

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    routeHandler(req, res)
  },
);

// starts a simple http server locally on port 3000
server.listen(5000, () => {
  console.log("Listening...................");
});

// run with `node server.mjs`
