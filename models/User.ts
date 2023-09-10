import mongoose, {Types} from 'mongoose'

export interface IUser {
    _id: Types.ObjectId,
    name: string,
    username: string,
    email: string,
    isAdmin: boolean,
    image: string,
    verified: boolean,
}

export interface IPostUser {
    name: string,
    username: string,
    email: string,
    password?: string,
}

export interface IGetUser {
    _id: string,
    name: string,
    username: string,
    email: string,
    isAdmin: boolean,
    image: string,
}

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
    }
}, {
    timestamps: true
})

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)