import { Router,Response } from "express";
import { FileUpload } from "../interface/file-upload";
import { verifyToken } from '../middlewares/auth';
import { Post } from '../model/post.model';
import FileSystem from '../class/fileSystem';


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

//Upload files
postRouter.post('/upload',[verifyToken],(req:any, resp:Response)=>{
    if(!req.files){
        return resp.status(400).json({
            ok:false,
            message:'no files could be uploaded',
        });
    }

    const file:FileUpload = req.files.image;

    //no file loaded
    if(!file){
        return resp.status(400).json({
            ok:false,
            message:'the selected image could not be uploaded',
        });
    }
    //must always be an image
    if(!file.mimetype.includes('image')){
        return resp.status(400).json({
            ok:false,
            message:'the file select is not a image',
        });
    }

    //call that method to save images in the folder upload
    const fileSystem = new FileSystem();
    fileSystem.saveTempImage(file, req.user._id);
    

    resp.json({
        ok:true,
        file:file.mimetype
    });
});


export default postRouter;