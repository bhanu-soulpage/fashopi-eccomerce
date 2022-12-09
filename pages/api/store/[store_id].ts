import db from "lib/db.server";
import { isAuthenticated } from "lib/permissions";
import nextConnect from "next-connect";

const handler = nextConnect();

export default handler.use(isAuthenticated).get(async (req: any, res: any) => {  try {
  const { store_id } = req.query;
  const store = await db.store.findUnique({ where: { id: store_id } });
  res.json(store);
} catch (e) {
  res.status(400).json(e);
}});
