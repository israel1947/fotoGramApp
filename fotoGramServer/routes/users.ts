import { Router,Request,Response } from "express";

const userRoute = Router();

userRoute.get('/prueba',(req:Request, resp:Response)=>{
    resp.json({
        ok:true,
        message:'todo esta bien'
    })
});

export default userRoute;