import nextConnect from "next-connect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "lib/db.server";

const handler = nextConnect();

export default handler.post(async (req: any, res: any) => {
  try {
    const { firstName, lastName, phoneNumber, email } = req.body;
    let { password } = req.body;

    if (!firstName || !lastName || !phoneNumber || !email || !password)
      res.status(400).json("Enter valid details");

    const user: any = await db.user.findUnique({
      where: { email },
    });
    console.log(user);

    if (!user) {
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          try {
            const password_hash = hash;
            req.body.password = password_hash;
            // create new user
            const user = await db.user.create({ data: req.body });
            const token = jwt.sign({ id: user.id }, "fashopiy", {
              expiresIn: "3d",
            });
            res.status(201).json({
              id: user.id,
              token,
              user,
              message: "Successfully Signed up",
            });
          } catch (error: any) {
            res.status(400).json({ message: "Error Occured" });
          }
        });
      });
    } else res.status(400).json({ message: "Email address already taken" });
  } catch (e: any) {
    console.log(e);
    res.status(400).json({ message: e });
  }
});
