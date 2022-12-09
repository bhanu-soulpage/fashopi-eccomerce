import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const tags = [
  { name: "Ethnic wear" },
  { name: "Sarees" },
  { name: "Footwear" },
];
const users = [
  {
    firstName: "Bhanu",
    lastName: "Prakash",
    phoneNumber: "943439845",
    email: "b@g.com",
    password: "$2b$10$EmXe3QQleRQ3g3sIlOTAUuSRDlGa5yF/tTW9EmqfKJB6fzeTuSOae",
  },
];

export const main = async () => {
  for (const i of tags) {
    try {
      await prisma.tag.create({ data: i });
    } catch (e) {
      console.log("Error", i);
    }
  }
  for (const i of users) {
    try {
      await prisma.user.create({ data: i });
    } catch (e) {
      console.log("Error", i);
    }
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
