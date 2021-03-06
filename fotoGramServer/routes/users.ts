import { Router,Request,Response } from "express";
import { User } from "../model/userModel";
import bcrypt from 'bcrypt';
import Token from "../class/token";
import { verifyToken } from "../middlewares/auth";

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
        //valid login
       if( userDB.comparePassword(userLogin.password)){
           const userToken = Token.getJwtToken({
               _id:userDB._id,
               nombre:userDB.nombre,
               email:userDB.email,
               avatar:userDB.avatar
           })
           resp.json({
               ok:true,
               token:userToken
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

        const userToken = Token.getJwtToken({
            _id:userDB._id,
            nombre:userDB.nombre,
            email:userDB.email,
            avatar:userDB.avatar
        })
        resp.json({
            ok:true,
            token:userToken
        });
        
    }).catch(err=>{
        resp.json({
            ok:false,
            err
        })
    })
});

//Update user
userRoute.post('/update', verifyToken, (req:any, resp:Response)=>{
    //ejecut  if user  token is correct
    const userUpdate ={
        nombre:req.body.nombre,
        email:req.body.email,
        avatar:req.body.avatar
    }
    //update user
    User.findByIdAndUpdate(req.user._id, userUpdate,{new:true},(err,userDB)=>{
        if(err){
            throw err; 
        }
        if(!userDB){
            return resp.json({
                ok:false,
                message:'the user with this id does not exist'
            })
        }

    //generate a new token when the user information is update
        const userToken = Token.getJwtToken({
            _id:userDB._id,
            nombre:userDB.nombre,
            email:userDB.email,
            avatar:userDB.avatar
        })
        resp.json({
            ok:true,
            token:userToken
        });
    });
});

//return user information by your token
userRoute.get('/',[verifyToken],(req:any, resp:Response)=>{
    const user = req.user;
    resp.json({
        ok:true,
        user  
    });
});




export default userRoute;