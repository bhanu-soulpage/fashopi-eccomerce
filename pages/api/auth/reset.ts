import nextConnect from "next-connect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "lib/db.server";

const handler = nextConnect();

export default handler.post(async (req: any, res: any) => {
  try {
    const { reset, email } = req.body;
    let { password } = req.body;

    if (!reset || !email)
      res.status(400).json("Enter valid details");

    const user: any = await db.user.findUnique({
      where: { email },
    });

    if (user) {
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          try {
            password = hash;
            
            const user = await db.user.update({ where:{email},data: {password } });
 
            res.status(201).json({
              message: "Successfully Updated",
            },user);
          } catch (error: any) {
            res.status(400).json({ message: "Error Occured" });
          }
        });
      });
    } else res.status(400).json({ message: "Email address not in db" });
  } catch (e: any) {
    console.log(e);
    res.status(400).json({ message: e });
  }
});
