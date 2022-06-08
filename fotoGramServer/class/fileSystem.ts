import path from "path";
import { FileUpload } from "../interface/file-upload";
import fs from "fs";

export default class FileSystem{
    constructor(){};

    saveTempImage(file:FileUpload, userId:string){
        //image storage location
        const path = this.createFolderUser(userId);
    }

    //create user folders 
    private createFolderUser(userId:string){
        const pathUser = path.resolve(__dirname,'../upload', userId);
        const pathUserTemp = pathUser + '/temp';
        console.log(pathUser);
        

        //verify if the folder temp exist
        const exist = fs.existsSync(pathUser)
        if(!exist){
            //create directori in case that not exist
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTemp);
        }

        return pathUserTemp;
    }
} 