import jwt from "jsonwebtoken";
import nextConnect from "next-connect";
import { ApiRequest, ApiResponse } from "lib/utils";

const isAuthenticated = nextConnect();

// verify user is authenticated or not
isAuthenticated.use(async (req: ApiRequest, res: ApiResponse, next: any) => {
  if (!req.headers.authorization)
    return res
      .status(403)
      .send({ message: "Please provide authentication token" });

  //user token
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).send({ message: "No token" });
  }

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .send({ message: "Failed to authenticate Token", status: 401 });
    req.userId = decoded.id;

    next();
  });
});

export { isAuthenticated };
