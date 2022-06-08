"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./class/server"));
const users_1 = __importDefault(require("./routes/users"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const post_1 = __importDefault(require("./routes/post"));
const serve = new server_1.default();
//body parser
serve.app.use(body_parser_1.default.urlencoded({ extended: true }));
serve.app.use(body_parser_1.default.json());
//File Upload
serve.app.use(express_fileupload_1.default());
//routes of the aplication
serve.app.use('/user', users_1.default);
serve.app.use('/post', post_1.default);
//conect db
mongoose_1.default.connect('mongodb://localhost:27017/fotosgram', {
    useNewUrlParser: true,
}, (err) => {
    if (err) {
        throw err;
    }
    console.log('DB IS ONLINE');
});
//express init
serve.start(() => {
    try {
        console.log(`server running in the port ${serve.port}`);
    }
    catch (error) {
        console.log(error);
    }
});
