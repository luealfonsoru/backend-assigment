import { Router } from 'express';
import UserRouter from './Users';
import IssueRouter from './Issue';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/issue', IssueRouter)

// Export the base-router
export default router;
