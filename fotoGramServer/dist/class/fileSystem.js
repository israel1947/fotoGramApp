"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class FileSystem {
    constructor() { }
    ;
    saveTempImage(file, userId) {
        //image storage location
        const path = this.createFolderUser(userId);
    }
    //create user folders 
    createFolderUser(userId) {
        const pathUser = path_1.default.resolve(__dirname, '../upload', userId);
        const pathUserTemp = pathUser + '/temp';
        console.log(pathUser);
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
