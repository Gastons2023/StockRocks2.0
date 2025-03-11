import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {createUser} from "../controllers/user-controller.js";

import dotenv from 'dotenv';
dotenv.config();

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username },
  });

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || 'hygyugjlgjgtftfdjdtr';

  const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

  return res.json({ token });

};

const router = Router();

// POST /login - Login a user
router.post('/login', login);
router.post('/register', createUser);

export default router;
