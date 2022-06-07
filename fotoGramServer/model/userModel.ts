import { Schema, model, Document} from "mongoose";
import bcrypt from 'bcrypt';

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

userSchema.method('comparePassword', function(password:string=''):Boolean{
    if(bcrypt.compareSync(password, this.password)){
        return true;
    }else{
        return false;
    }
})

interface Iusers extends Document{
    nombre:string,
    avatar:string
    email:string,
    password:string,

    comparePassword(password:string):boolean;
}

export const User = model<Iusers>('User', userSchema);