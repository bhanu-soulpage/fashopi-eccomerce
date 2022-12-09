import db from "lib/db.server";
import nextConnect from "next-connect";
import { isAuthenticated } from "lib/permissions";

const handler = nextConnect();

export default handler
  .use(isAuthenticated)
  .post(async (req: any, res: any) => {
    //create new store
    try {
      const { tags, ...rest } = req.body;

      const store = await db.store.create({
        data: { ...rest, userId: req.userId },
      });
      // add tags to store
      await Promise.all(
        tags.map(async (tagId) => {
          return await db.tagsonStores.create({
            data: { tagId, storeId: store.id },
          });
        })
      );

      res.json({ message: "store created" });
    } catch (e) {
      res.status(400).json({ message: e });
    }
  })
  .put(async (req: any, res: any) => {
    try {
      const { store_id } = req.query;
      const store = await db.store.update({
        where: { id: store_id },
        data: req.body,
      });
      res.json(store);
    } catch (e) {
      res.status(400).json(e);
    }
  });
