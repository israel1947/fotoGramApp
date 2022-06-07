import { Schema, model, Document} from "mongoose";

const userSchema = new Schema({
    nombre:{
        type:String,
        required:[true,'The name is required']
    },
    avatar:{
        type:String,
        default:'ave-1.png'
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
    nombre:String,
    email:String,
    password:String,
    avatar:String
}

export const User = model<Iusers>('Users', userSchema);