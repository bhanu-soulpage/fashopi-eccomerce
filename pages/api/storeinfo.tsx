import db from 'lib/db.server';
import {Prisma} from '@prisma/client';
import nextConnect from 'next-connect';
import {isAuthenticated} from 'lib/permissions';
import {ApiRequest, ApiResponse} from 'lib/utils';

const handler = nextConnect();

handler
  .use(isAuthenticated)
  .get(async (req: ApiRequest, res: ApiResponse) => {
    // get user using the id
    const id: any = req.query.id;
    const user = await db.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!user) {
      res.status(400).json({message: 'not found'});
    } else {
      res.status(200).json(user);
    }
  })

  
  .put(async (req: any, res: any) => {
    // update user using the id
    try {
      const id: any = req.query.id;
      const user = await db.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          ...req.body,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(400).json(error.meta);
      }
    }
  });

export default handler;
