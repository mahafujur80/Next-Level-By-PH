import type { IncomingMessage, ServerResponse } from "http";
import { createUser, userDataService } from "../service/user.service";
import type { UserType } from "../types/types";
import { bodyParser } from "../utils/parseUser";

const userController = async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  const urlParam = url?.split("/");
  console.log(urlParam);
  const id = urlParam && urlParam[1] === "users" ? urlParam[2] : null;

  if (url === "/users" && method === "GET") {
    const users = userDataService();

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "user data fetch",
        data: users,
      }),
    );
  } else if (method === "GET" && id !== null) {
    const users = userDataService();
    const wanted = users.find((u: UserType) => u.id === Number(id));
    console.log(wanted);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(wanted));
  } else if (method === "POST" && url === "/users") {
    const users = userDataService();
    const body = await bodyParser(req);
    const newUser = {
      id: users.length + 1,
      ...body,
    };
    users.push(newUser);
    createUser(users);
  } else if (method === "PUT" && id !== null) {
    const users = userDataService();
    const body = await bodyParser(req);

    const userIndex = users.findIndex((u: UserType)=> u.id === Number(id))
    users[userIndex] = {
        id: users[userIndex].id, ...body
    }
    createUser(users)
  }
};

export default userController;
