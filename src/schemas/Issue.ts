import { Schema, Model, model } from 'mongoose'

interface IIssue {
    info: string,
    assigned: boolean,
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
    createdBy: {
        type: Object,
        required: false
    },
    solvingBy: {
        type: Object,
        required: false
    }
})

issueSchema.statics.build = (attr: IIssue) => {
    return new Issue(attr)
}
const Issue = model<any, IssueModelInterface>('Issue', issueSchema)
export { Issue, IIssue }