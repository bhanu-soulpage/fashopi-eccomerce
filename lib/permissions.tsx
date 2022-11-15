import jwt from 'jsonwebtoken';
import nextConnect from 'next-connect';
import {ApiRequest, ApiResponse} from 'lib/utils';

const isAdmin = nextConnect();
const isSuperUser = nextConnect();
const isAuthenticated = nextConnect();

// verify user is authenticated or not
isAuthenticated.use(async (req: ApiRequest, res: ApiResponse, next: any) => {
  if (!req.headers.authorization)
    return res.status(403).send({message: 'Please provide authentication token'});

  //user token
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(403).send({message: 'No token'});
  }

  jwt.verify(token, 'soulpage', (err, decoded) => {
    if (err) return res.status(401).send({message: 'Failed to authenticate Token', status: 401});
    req.userId = decoded.id;
    req.userRole = decoded.role;

    next();
  });
});

//check user is superuser or not
isSuperUser.use(async (req: ApiRequest, res: ApiResponse, next: any) => {
  if (req.userRole !== 'super_admin') {
    return res.status(403).send({message: "You don't Have permission to Access"});
  }
  next();
});

// check user is admin or not
isAdmin.use(async (req: ApiRequest, res: ApiResponse, next: any) => {
  if (req.userRole !== 'admin') {
    return res.status(403).send({message: "You don't Have permission to Access"});
  }
  next();
});

export {isAuthenticated, isAdmin, isSuperUser};
