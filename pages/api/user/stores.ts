import db from "lib/db.server";
import nextConnect from "next-connect";
import { isAuthenticated } from "lib/permissions";
const handler = nextConnect();

export default handler.use(isAuthenticated).get(async (req: any, res: any) => {
  const stores = await db.store.findMany({
    where: { userId: req.userId },
    include: {
      tags: true,
    },
  });
  res.json(stores);
});
