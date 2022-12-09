import { isAuthenticated } from "lib/permissions";
import nextConnect from "next-connect";
import db from "lib/db.server";

const handler = nextConnect();

export default handler
  .use(isAuthenticated)
  .delete(async (req: any, res: any) => {
    const deletestore = await db.store.delete({
      where: { id: Number(req.query.id) },
    });
    console.log(req.query.id);
    res.status(200).json({ message: "Store Deleted!!!💥" });
  });

// export default (async function handler2(req: any, res: any) {
//   if (req.method === "DELETE") {
//     console.log(Number(req.query.id));
//     const deletestore = await prisma.store.delete({
//       where: { id: Number(req.query.id) },
//     });
//     res.status(200).json({ message: "Success" });
//   }
// //   if (req.method === "PUT") {
// //     console.log(Number(req.query.id));
// //     const updatestore = await prisma.store.update({
// //       where: { id: Number(req.query.id) },
// //       data: { ...req.body },
// //     });
// //     res.status(200).json({ message: "Success" });
// //   }
// });
