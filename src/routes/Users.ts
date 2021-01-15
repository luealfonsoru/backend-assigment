import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import UserDao from '@daos/User/UserDao';
import { paramMissingError, IRequestUser } from '@shared/constants';

const router = Router();
const userDao = new UserDao();
const { BAD_REQUEST, CREATED, OK, NOT_FOUND } = StatusCodes;



/******************************************************************************
 *                      Get All Users - "GET /api/users"
 ******************************************************************************/

router.get('/', async (req: Request, res: Response) => {
    const { username } = req.query
    let users
    if(username){
        users = await userDao.getOne(String(username));
    }else{
        users = await userDao.getAll();
    }
    return res.status(OK).json({ users });
});



/******************************************************************************
 *                       Add One - "POST /api/users"
 ******************************************************************************/

router.post('/', async (req: IRequestUser, res: Response) => {
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
 *                       Update - "PUT /api/users"
 ******************************************************************************/

router.put('/', async (req: IRequestUser, res: Response) => {
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
