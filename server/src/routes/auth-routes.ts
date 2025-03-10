import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const accessToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY!, { expiresIn: '2h' });
    return res.json({ accessToken });

  } catch (error: any) {
    return res.status(500).json({ message: 'Error, try again' });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
   const user = await User.create(req.body);
    const accessToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY!, { expiresIn: '2h' });
    return res.json({ accessToken });

  } catch (error: any) {
    return res.status(500).json({ message: 'Error, try again' });
  }
};

const router = Router();
// TO DO: Create a function for sign up or registration of a user
// create route for said function
// POST /register - Register a new user

router.post('/register', register);
// POST /login - Login a user
router.post('/login', login);

export default router;
// corrections 