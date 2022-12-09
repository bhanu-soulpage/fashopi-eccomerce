import db from "lib/db.server";
import nextConnect from "next-connect";

const handler = nextConnect();
export default handler.post(async (req: any, res: any) => {
  try {
    const { tags, ...rest } = req.body;
    const storeCreated = await db.store.create({ data: rest });
    const store_tags = await Promise.all(
      tags.map(async (e: any) => {
        const created_tag = await db.tagsonStores.create({
          data: { storeId: storeCreated.id, tagId: e },
        });
        return created_tag;
      })
    );
    console.log(store_tags);

    res
      .status(201)
      .send({ message: "Store created sucessfully 🙂", storeCreated });
  } catch (e) {
    res.status(401).send({ message: "Error" });
  }
})

// export default async function handler(req: ApiRequest, res: ApiResponse) {

// }
