/**
 * Pre-start is where we want to place things that must run BEFORE the express server is started.
 * This is useful for environment variables, command-line arguments, and cron-jobs.
 */

import path from 'path';
import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';
import mongoose from 'mongoose';
import logger from '@shared/Logger';
import { CronJob } from 'cron';
import UserDao from '@daos/User/UserDao';
import IssueDao from '@daos/Issue/IssueDao';

(() => {
    // Creat DAOs instances
    const userDao = new UserDao()
    const issueDao = new IssueDao()
    // Setup command line options
    let unassignedUser;
    let unassignedTask;
    const options = commandLineArgs([
        {
            name: 'env',
            alias: 'e',
            defaultValue: 'development',
            type: String,
        },
    ]);
    // Set the env file
    const result2 = dotenv.config({
        path: path.join(__dirname, `env/${options.env}.env`),
    });
    if (result2.error) {
        throw result2.error;
    }
    // Add connection to database
    mongoose.connect(`${process.env.MONGO_URI}/assignment`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        logger.info('Database connection: OK')
    })

    // cronjob to assign issues to agents
    const cronJob = new CronJob('0,30 * * * * *', async () => {
        try {
            unassignedUser = await userDao.getNotBussy()
            unassignedTask = await issueDao.getNotAssigned()
            while (unassignedUser !== null && unassignedTask !== null) {
                await userDao.assignIssue(unassignedUser.username, unassignedTask.info, unassignedTask._id)
                await issueDao.changeToAssigned(unassignedTask._id, unassignedUser.username)
                unassignedUser = await userDao.getNotBussy()
                unassignedTask = await issueDao.getNotAssigned()
            }
        } catch (e) {
            console.error(e);
        }
    });
    if (!cronJob.running) {
        cronJob.start()
    }
})();
