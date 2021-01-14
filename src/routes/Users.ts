import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import UserDao from '@daos/User/UserDao';
import { paramMissingError, IRequest } from '@shared/constants';

const router = Router();
const userDao = new UserDao();
const { BAD_REQUEST, CREATED, OK, NOT_FOUND } = StatusCodes;



/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get('/', async (req: Request, res: Response) => {
    const users = await userDao.getAll();
    return res.status(OK).json({ users });
});



/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('/', async (req: IRequest, res: Response) => {
    const user = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await userDao.add(user);
    return res.status(CREATED).json({
        message: "success"
    });
});



/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/

router.put('/', async (req: IRequest, res: Response) => {
    const user = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    try {
        await userDao.update(user);
    } catch (e) {
        return res.status(NOT_FOUND).json({
            error: e,
        });
    }

    return res.status(OK).send({ message: "success" });
});



/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
