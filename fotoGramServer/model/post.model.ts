import {Schema,Document, model} from "mongoose";

const postSchema = new Schema({
    created:{
        type:Date
    },
    menssage:{
        type:String,
    },
    img:[{
        type:String
    }],
    coords:{
        type:String
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:[true,'the user reference is required']
    }
});

postSchema.pre<IPost>('save', function(next){
    this.created = new Date();
    next()
});

interface IPost extends  Document{
    created:Date,
    menssage:string,
    img:string[],
    coords:string,
    user:string
}

export const Post = model<IPost>('Post',postSchema);

