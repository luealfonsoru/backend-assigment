import { User, IUser } from '@schemas/User';

export interface IUserDao {
    getOne: (username: string) => Promise<any>;
    getAll: () => Promise<any>;
    add: (user: IUser) => Promise<any>;
    update: (user: IUser) => Promise<any>;
}

class UserDao implements IUserDao {


    /**
     * @param username
     */
    public async getOne(username: string): Promise<any> {
        console.log(username)
        return await User.findOne({ username: username }).exec()
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
    public async add(user: IUser): Promise<any> {
        const newUser = User.build(user)
        return await newUser.save()
    }


    /**
     *
     * @param user
     */
    public async update(user: IUser): Promise<void> {
        const updateUser = await User.findOneAndUpdate({ username: user.username }, {
            $set: { ...user }
        })
        if(updateUser === null){
            throw "User not found"
        }
        return updateUser
    }


}

export default UserDao;
