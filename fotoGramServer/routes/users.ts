import { Router,Request,Response } from "express";
import { User } from "../model/userModel";
import bcrypt from 'bcrypt';

const userRoute = Router();

userRoute.post('/create',(req:Request, resp:Response)=>{

    //extracting information coming from the post method
    const user = {
        nombre:req.body.nombre,
        email:req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar:req.body.avatar
    }

    //save req in the db
    User.create(user).then(userDB=>{  
        resp.json({
         ok:true,
         user:userDB
        //message:'the user has been successfully created'
        });
    }).catch(err=>{
        resp.json({
            ok:false,
            err
        })
    })
});

export default userRoute;