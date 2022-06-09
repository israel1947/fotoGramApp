import path from "path";
import { FileUpload } from "../interface/file-upload";
import fs from "fs";
import uniqid from "uniqid";

export default class FileSystem{
    constructor(){};

    saveTempImage(file:FileUpload, userId:string){
        //image storage location
        const path = this.createFolderUser(userId);

        //name of file
        const nameFile = this.generateUniqueName(file.name);
        console.log(file.name);
        console.log(nameFile);
        
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
} 