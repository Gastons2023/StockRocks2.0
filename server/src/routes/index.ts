import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);
// TODO: Add authentication to the API routes
router.use('/api', apiRoutes);

const router2 = Router();

router2.get("/hello", async (req:any, res:any) => {
  res.status(200).json({
    'hello': 'world!2'
  })
})

router2.get("/hello2", async (req:any, res:any) => {
  res.status(200).json({
    'hello': 'oaisdoasoidoaisoados'
  })
})

router.use('/test', router2)

export default router;

// localhost:3001/test/hello
// localhost:3001/test/hello2