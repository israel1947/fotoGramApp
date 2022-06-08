import { Router,Response } from "express";
import { verifyToken } from '../middlewares/auth';
import { Post } from '../model/post.model';


const postRouter = Router();

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