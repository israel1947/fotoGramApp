import path from "path";
import { FileUpload } from "../interface/file-upload";
import fs from "fs";
import uniqid from "uniqid";

export default class FileSystem{
    constructor(){};

    saveTempImage(file:FileUpload, userId:string){

        return new Promise<void>((resolve,reject)=>{

          //image storage location
          const path = this.createFolderUser(userId);
            
          //name of file
          const nameFile = this.generateUniqueName(file.name);
            
          //move file from temp  to folder  to folder permanent
          file.mv(`${path}/${nameFile}`,(err:any)=>{
              if(err){
                //could not move the file
                reject(err);
              }else{
               //everything worked out well
               resolve();
           }
        });
      });  
    }

    private generateUniqueName(originalName:string){//origiunal name of image when is upload Ex:name.png
        //extract extention of file
        const nameArr=originalName.split('.')
        const extention = nameArr[nameArr.length -1];

        //create unique name
        const uniqId = uniqid();

        //return new name + unique id Ex:sfs5fs65fsf4.png
        return `${uniqId}.${extention}`;
    }

    //create user folders 
    private createFolderUser(userId:string){
        const pathUser = path.resolve(__dirname,'../upload', userId);
        const pathUserTemp = pathUser + '/temp';
        //console.log(pathUser);
        

        //verify if the folder temp exist
        const exist = fs.existsSync(pathUser)
        if(!exist){
            //create directori in case that not exist
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTemp);
        }

        return pathUserTemp;
    }

    imagensFromTempAPost(userId:string){
      const pathTempUser = path.resolve(__dirname,'../upload', userId,'temp');
      const pathPostUser = path.resolve(__dirname,'../upload', userId,'posts');

      if(!fs.existsSync(pathTempUser)){
        return [];
      }

      if(!fs.existsSync(pathPostUser)){
        //create pathPostUser in case dont exist
        fs.mkdirSync(pathPostUser);
      }

      const imagensTemp = this.getImagensInTemp(userId);

      //move from temp folder to post folder
      imagensTemp.forEach(image=>{
        fs.renameSync(`${pathTempUser}/${image}`,`${pathPostUser}/${image}`)
      });
      //return the imagen name to save in the mongo document
      return imagensTemp;
    }

    private getImagensInTemp(userId:string){
      const pathTemp = path.resolve(__dirname,'../upload', userId,'temp');
      return fs.readdirSync(pathTemp) || [];
    }

    // Get img by url and user id saved in the db
    getImgUrl(userId:string, img:string){
      //path posts
      const pathImage = path.resolve(__dirname,'../upload', userId,'posts', img);

      //in case that img not exist
      const exist = fs.existsSync(pathImage);
      if(!exist){
        return path.resolve(__dirname,'../assets/400x250.jpg');
      }

      return pathImage;
    }
} 