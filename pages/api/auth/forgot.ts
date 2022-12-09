import nextConnect from "next-connect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "lib/db.server";

const handler = nextConnect();

export default handler.post(async (req: any, res: any) => {
  try {
    const { email } = req.body;

    if (!email) res.status(400).json("Enter valid details");

    const user: any = await db.user.findUnique({
      where: { email },
    });

    if (user) {
      const user = await db.user.update({
        where: { email },
        data: { reset: "12345" },
      });
      res.status(201).json({
        message: { reset: "12345" },
      });
    } else res.status(400).json({ message: "Email address not in db" });
  } catch (e: any) {
    res.status(400).json({ message: e });
  }
});
