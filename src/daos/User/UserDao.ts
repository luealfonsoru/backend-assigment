import { User, IUser } from '@schemas/User';

export interface IUserDao {
    getOne: (username: string) => Promise<any>;
    getNotBussy: () => Promise<any>;
    getAll: () => Promise<any>;
    add: (user: IUser) => Promise<any>;
    update: (user: IUser) => Promise<any>;
    assignIssue: (username: string, info: string, issueId: string) => Promise<any>;
}

class UserDao implements IUserDao {


    /**
     * @param username
     */
    public async getOne(username: string): Promise<any> {
        return await User.findOne({ username: username }).exec()
    }

    /**
     * 
     */
    public async getNotBussy(): Promise<any> {
        return await User.findOne({ bussy: false, role: "agent" }).exec()
    }

    public async makeNotBussy(username: string): Promise<any> {
        const user = await User.findOne({ username: username }).exec()
        return await User.findOneAndUpdate({ username: username },
            {
                $addToSet:{
                    'pastIssuesList':user.issueSolving
                },
                $set:{
                    'bussy': false,
                    'issueSolving': {}
                },
            })
    }

    /**
     *
     * @param username
     * @param info
     * @param issueId
     */

    public async assignIssue(username: string, info: string, issueId: string): Promise<any> {
        return await User.updateOne({ username: username }, {
            $set: {
                'issueSolving.id': issueId,
                'issueSolving.info': info,
                'bussy': true
            }
        })
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
        if (updateUser === null) {
            throw "User not found"
        }
        return updateUser
    }


}

export default UserDao;
