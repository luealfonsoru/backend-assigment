/**
 * Pre-start is where we want to place things that must run BEFORE the express server is started.
 * This is useful for environment variables, command-line arguments, and cron-jobs.
 */

import path from 'path';
import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';
import mongoose from 'mongoose';
import logger from '@shared/Logger';



(() => {
    // Setup command line options
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
})();
