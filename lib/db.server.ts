import {PrismaClient} from '@prisma/client';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var db: PrismaClient | undefined;
}

const db =
  global.db ||
  new PrismaClient({
    log: ['info'],
  });

global.db = db;

export default db;