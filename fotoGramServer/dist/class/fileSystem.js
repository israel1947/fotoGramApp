"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() { }
    ;
    saveTempImage(file, userId) {
        //image storage location
        const path = this.createFolderUser(userId);
        //name of file
        const nameFile = this.generateUniqueName(file.name);
        console.log(file.name);
        console.log(nameFile);
    }
    generateUniqueName(originalName) {
        //extract extention of file
        const nameArr = originalName.split('.');
        const extention = nameArr[nameArr.length - 1];
        //create unique name
        const uniqId = uniqid_1.default();
        //return new name + unique id Ex:sfs5fs65fsf4.png
        return `${uniqId}.${extention}`;
    }
    //create user folders 
    createFolderUser(userId) {
        const pathUser = path_1.default.resolve(__dirname, '../upload', userId);
        const pathUserTemp = pathUser + '/temp';
        //console.log(pathUser);
        //verify if the folder temp exist
        const exist = fs_1.default.existsSync(pathUser);
        if (!exist) {
            //create directori in case that not exist
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }
}
exports.default = FileSystem;
