import { Schema, Model, model } from 'mongoose'

interface IUser {
    username: string,
    id: string
}

interface UserModelInterface extends Model<any> {
    build(attr: IUser): any
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
})

userSchema.statics.build = (attr: IUser) => {
    return new User(attr)
}
const User = model<any, UserModelInterface>('User', userSchema)
export { User, IUser }
