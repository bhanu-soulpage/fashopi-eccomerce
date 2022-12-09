import { isAuthenticated } from "lib/permissions";
import nextConnect from "next-connect";
import db from "lib/db.server";

const handler = nextConnect();

export default handler.use(isAuthenticated).put(async (req: any, res: any) => {

  const id = (Number(req.query.id));
  const updatestore = await db.store.update({
    where: { id: Number(req.query.id) },
    data: { ...req.body },
  });
  console.log(updatestore)
  res.status(200).json({ message: "Success"  });
});
