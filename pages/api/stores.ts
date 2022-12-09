import db from "lib/db.server";
import nextConnect from "next-connect";
const handler = nextConnect();

export default handler.get(async (req: any, res: any) => {
  const stores = await db.store.findMany();
  res.json(stores);
});
