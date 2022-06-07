import { Schema, model, Document} from "mongoose";

const userSchema = new Schema({
    nombre:{
        type:String,
        required:[true,'The name is required']
    },
    avatar:{
        type:String,
        default:'av-1.png'
    },
    email:{
        type:String,
        required:[true,'The anddress email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'The paswword is required']
    }
});
interface Iusers extends Document{
    nombre:string,
    avatar:string
    email:string,
    password:string,
}

export const User = model<Iusers>('User', userSchema);