import {Request,Response,NextFunction } from "express";
import Token from "../class/token";

export const verifyToken = (req:any, resp:Response, next:NextFunction)=>{
    
    const userToken = req.get('x-token') || '';

    Token.checkToken(userToken)
    .then((decoded:any)=>{
        console.log(decoded);
        req.user = decoded.user;
        next();

    }).catch((err:Error)=>{
        resp.json({
            ok:false,
            message:'something went wrong token is invalid'
        });
        console.log(err);
        
    });
}