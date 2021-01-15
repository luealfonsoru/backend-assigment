import { Schema, Model, model } from 'mongoose'

interface IIssue {
    info: string,
    assigned: boolean,
    solved?: boolean,
    createdBy: string,
    solvingBy?: string
}

interface IssueModelInterface extends Model<any> {
    build(attr: IIssue): any
}

const issueSchema = new Schema({
    info: {
        type: String,
        required: true
    },
    assigned: {
        type: Boolean,
        required: true
    },
    solved: {
        type: Boolean,
        required: false
    },
    createdBy: {
        type: String,
        required: true
    },
    solvingBy: {
        type: String,
        required: false
    }
})

issueSchema.statics.build = (attr: IIssue) => {
    return new Issue(attr)
}
const Issue = model<any, IssueModelInterface>('Issue', issueSchema)
export { Issue, IIssue }