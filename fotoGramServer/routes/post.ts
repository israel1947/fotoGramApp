import { Router,Response } from "express";
import { verifyToken } from '../middlewares/auth';
import { Post } from '../model/post.model';


const postRouter = Router();

//get post per page
postRouter.get('/',async (req:any, resp:Response)=>{

    let page = Number(req.query.page) || 1; //page 1 for default
    let skip = page - 1; // 1 - 1 = 0
    skip = skip * 10; //0 * 10 = 0

    const posts = await Post
    .find()
    .sort({_id:-1})//show post in dec order
    .skip(skip) //skip page of 10 in 10
    .limit(10)//return last 10 registers
    .populate('user','-password')
    .exec();

    resp.json({
        ok:true,
        page,
        posts,
    });
});

//create post
postRouter.post('/',[verifyToken],(req:any, resp:Response)=>{
    const post={
        created:req.body.created,
        menssage:req.body.message,
        img:req.body.img,
        coords:req.body.coords,
        user:req.body.user,
    }
    post.user = req.user._id

    Post.create(post).then(async postDB=>{

        //show object of user information and the post created 
        await postDB.populate('user','-password');

        resp.json({
            ok:true,
            post:postDB
        });
    }).catch(err=>{
        resp.json(err);
    })

})

export default postRouter;