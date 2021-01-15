import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import IssueDao from '@daos/Issue/IssueDao';
import UserDao from '@daos/User/UserDao';
import { paramMissingError, IRequestIssue } from '@shared/constants';
import { userInfo } from 'os';

const router = Router();
const issueDao = new IssueDao();
const userDao = new UserDao();
const { BAD_REQUEST, CREATED, OK, NOT_FOUND } = StatusCodes;



/******************************************************************************
 *                      Get All Issues - "GET /api/issues"
 ******************************************************************************/

router.get('/', async (req: Request, res: Response) => {

    const issues = await issueDao.getAll();

    return res.status(OK).json({ issues });
});



/******************************************************************************
 *                       Add One - "POST /api/issues"
 ******************************************************************************/

router.post('/', async (req: IRequestIssue, res: Response) => {
    const issue = req.body;
    let user;
    if (!issue) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }

    try {
        user = await userDao.getOne(issue.createdBy)
        if(user.role !== 'default'){
            return res.status(BAD_REQUEST).json({
                error: 'El usuario no tiene los roles adecuados, solo los usuarios con rol "default" pueden reportar problemas en la plataforma :/',
            });
        }
    } catch (e) {
        return res.status(BAD_REQUEST).json({
            error: e,
        });
    }
    
    await issueDao.add({
        info: issue.info,
        assigned: false,
        createdBy: issue.createdBy
    });
    return res.status(CREATED).json({
        message: "success"
    });
});



/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;