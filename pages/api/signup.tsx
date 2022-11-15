import type { NextApiRequest, NextApiResponse } from "next";
import db from "lib/db.server";

import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { ApiRequest, ApiResponse } from "lib/utils";
import { toast } from "react-toastify";

export default async function handler(req: ApiRequest, res: ApiResponse) {
  //Check whether it is post request or not
  if (req.method !== "POST") {
    res.status(405).send({ message: "GET request not allowed" });
    return;
  }

  // check email exists or not in db
  const user: any = await db.user.findUnique({
    where: {
      email: req.body.email,
    },
    select: {
      id: true,
    },
  });

  // user && res.status(400).json({message :"Invalid details or user already exists"})

  if (!user) {
    //create new user
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(req.body.password, salt, async function (err, hash) {
        try {
          // hash the raw password
          const password_hash = hash;
          req.body.password = password_hash;
          // create new user
          const user = await db.user.create({
            data: req.body,
          });
          res.status(201).json({ message: "Account Created Successfully" });
        } catch (error) {
          if (error instanceof Prisma.PrismaClientValidationError) {
            res.status(400).json({ message: "Error Occured" });
          }
        }
      });
    });
  } else {
    res.status(400).json({ message: "Email address already taken" });
  }
}
