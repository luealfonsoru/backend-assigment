import { Schema, Model, model } from 'mongoose'

interface IUser {
    username: string,
    role: string,
    pastIssuesList?: Array<any>,
    bussy: boolean,
    issueSolving: any
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
        required: false
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
