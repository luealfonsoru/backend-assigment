import { Issue, IIssue } from '@schemas/Issue';

export interface IIssueDao {
    getAll: () => Promise<any>;
    add: (issue: IIssue) => Promise<any>;
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
     * @param issue
     */
    public async add(issue: IIssue): Promise<any> {
        const newIssue = Issue.build(issue)
        return await newIssue.save()
    }


}

export default IssueDao;
