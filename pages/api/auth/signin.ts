import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "lib/db.server";
import { ApiRequest, ApiResponse } from "lib/utils";
import { toast } from "react-toastify";

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "GET request not allowed" });
    return;
  }

  // check user exists or not in db
  const user = await db.user.findUnique({
    where: {
      email: req.body.email,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      password: true,
    },
  });
  console.log("User", user);

  if (user) {
    const authenticated = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (authenticated) {
      const token = jwt.sign(
        { id: user.id, role: user.firstName },
        process.env.JWT_TOKEN_SECRET,
        { expiresIn: "3d" }
      );
      res
        .status(200)
        .json({ ...user, token: token, message: "Logged in Successfully" });
    } else {
      res.status(401).json({ message: "please provide valid details" });
    }
  } else {
    res.status(400).json({ message: "please provide valid details" });
  }
}
