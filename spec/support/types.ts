import { Response } from 'supertest';
import { IUser } from 'src/schemas/User';


export interface IResponse extends Response {
    body: {
        users: IUser[];
        error: string;
    };
}

export interface IReqBody {
    user?: IUser;
}
