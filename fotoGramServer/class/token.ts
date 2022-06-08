import jwt from 'jsonwebtoken';

export default class Token{

    private static seed = 'this-is-the-seed-of-the-app';
    private static expiration ='30d'

    constructor(){}

    static getJwtToken(payload:any):string{
        return jwt.sign({
            user:payload
        },this.seed,{expiresIn:this.expiration} );
    }

    static checkToken(userToken:string){
        new Promise((resolve,rejects)=>{

            jwt.verify(userToken,this.seed,function(err, decoded){
                if(err){
                  //invalid token
                  rejects();
              } else{
                  //token valid
                  resolve(decoded);
              }
            })
        })
    }
} 