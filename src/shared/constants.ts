import { IUser } from '@schemas/User';
import { Request } from 'express';


export const paramMissingError = 'One or more of the required parameters was missing.';

export interface IRequestUser extends Request {
    body: IUser;
} 

export interface IRequestIssue extends Request {
    body: {
        info: string,
        createdBy: string  
    }
} 
