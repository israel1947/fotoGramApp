"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./class/server"));
const serve = new server_1.default();
//express init
serve.start(() => {
    try {
        console.log(`server running in the port ${serve.port}`);
    }
    catch (error) {
        console.log(error);
    }
});
