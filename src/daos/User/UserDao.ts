import { User, IUser} from '@schemas/User';
import {v4 as uuidv4} from 'uuid'

export interface IUserDao {
    getOne: (username: string) => Promise<any>;
    getAll: () => Promise<any>;
    add: (username: string) => Promise<any>;
    update: (user: IUser) => Promise<any>;
    delete: (id: string) => Promise<any>;
}

class UserDao implements IUserDao {


    /**
     * @param username
     */
    public async getOne(username: string): Promise<any> {
        return await User.find({username})
    }


    /**
     *
     */
    public async getAll(): Promise<any> {
        return await User.find({})
    }


    /**
     *
     * @param user
     */
    public async add(username: string): Promise<any> {
        const newUser = User.build({username, id: uuidv4()})
        return await newUser.save()
    }


    /**
     *
     * @param user
     */
    public async update(user: IUser): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }


    /**
     *
     * @param id
     */
    public async delete(id: string): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }
}

export default UserDao;
