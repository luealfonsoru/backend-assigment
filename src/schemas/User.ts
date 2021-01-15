import { Schema, Model, model } from 'mongoose'
import { IIssue } from './Issue'

interface IUser {
    username: string,
    role: string,
    pastIssuesList?: Array<{id: string, name: string}>,
    bussy: boolean,
    issueSolving?: {id: string, info: string}
}

interface UserModelInterface extends Model<any> {
    build(attr: IUser): any
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    pastIssuesList: {
        type: Array,
        required: false
    },
    bussy: {
        type: Boolean,
        required: true
    },
    issueSolving: {
        type: Object,
        required: false

    }
})

userSchema.statics.build = (attr: IUser) => {
    return new User(attr)
}
const User = model<any, UserModelInterface>('User', userSchema)
export { User, IUser }
