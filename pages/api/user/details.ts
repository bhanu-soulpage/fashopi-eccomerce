import db from "lib/db.server";
import nextConnect from "next-connect";
import { isAuthenticated } from "lib/permissions";

const handler = nextConnect();

export default handler.use(isAuthenticated).get(async (req: any, res: any) => {
  try {
    const user = await db.user.findUnique({ where: { id: req.userId } });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e)
  }
});
