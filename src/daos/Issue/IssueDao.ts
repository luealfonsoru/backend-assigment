import { Issue, IIssue } from '@schemas/Issue';

export interface IIssueDao {
    getAll: () => Promise<any>;
    getNotAssigned: () => Promise<any>;
    add: (issue: IIssue) => Promise<any>;
    changeToAssigned: (id: string, username: string) => Promise<any>;
}

class IssueDao implements IIssueDao {


    /**
     *
     */
    public async getAll(): Promise<any> {
        return await Issue.find({})
    }

    /**
     *
     */
    public async getNotAssigned(): Promise<any> {
        return await Issue.findOne({ assigned: false }).exec()
    }

    public async changeToAssigned(id: string, username: string): Promise<any> {
        return await Issue.findOneAndUpdate({ _id: id }, {
            $set: {
                "assigned": true,
                "solvingBy": username
            }
        })
    }

    public async solveIssue(id: string): Promise<any> {
        return await Issue.findOneAndUpdate({ _id: id }, {
            $set: {
                "solved": true,
            }
        })
    }

    /**
     *
     * @param issue
     */
    public async add(issue: IIssue): Promise<any> {
        const newIssue = Issue.build(issue)
        return await newIssue.save()
    }


}

export default IssueDao;
