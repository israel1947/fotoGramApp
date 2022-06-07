import { Router,Request,Response } from "express";
import { User } from "../model/userModel";
import bcrypt from 'bcrypt';

const userRoute = Router();

//login
userRoute.post('/login',(req:Request, resp:Response)=>{

    const userLogin ={
        email:req.body.email,
        password:req.body.password
    }

    User.findOne({email:userLogin.email},(err:any, userDB:any)=>{
        if(err){
            throw err;
        }

        if(!userDB){
            return resp.json({
                ok:false,
                message:'the credential is not correct'
          });
        }

       if( userDB.comparePassword(userLogin.password)){
           resp.json({
               ok:true,
               token:'aafaesfaefaefaef52f1asfas5f65'
           })
           
       }else{
        return resp.json({
            ok:false,
            message:'the credential is not correct **'
         });
       }
    })
});


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