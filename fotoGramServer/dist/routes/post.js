"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const post_model_1 = require("../model/post.model");
const fileSystem_1 = __importDefault(require("../class/fileSystem"));
const postRouter = express_1.Router();
//get post per page
postRouter.get('/', (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let page = Number(req.query.page) || 1; //page 1 for default
    let skip = page - 1; // 1 - 1 = 0
    skip = skip * 10; //0 * 10 = 0
    const posts = yield post_model_1.Post
        .find()
        .sort({ _id: -1 }) //show post in dec order
        .skip(skip) //skip page of 10 in 10
        .limit(10) //return last 10 registers
        .populate('user', '-password')
        .exec();
    resp.json({
        ok: true,
        page,
        posts,
    });
}));
//create post
postRouter.post('/', [auth_1.verifyToken], (req, resp) => {
    const post = {
        created: req.body.created,
        menssage: req.body.message,
        img: req.body.img,
        coords: req.body.coords,
        user: req.body.user,
    };
    post.user = req.user._id;
    post_model_1.Post.create(post).then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        //show object of user information and the post created 
        yield postDB.populate('user', '-password');
        resp.json({
            ok: true,
            post: postDB
        });
    })).catch(err => {
        resp.json(err);
    });
});
//Upload files
postRouter.post('/upload', [auth_1.verifyToken], (req, resp) => {
    if (!req.files) {
        return resp.status(400).json({
            ok: false,
            message: 'no files could be uploaded',
        });
    }
    const file = req.files.image;
    //no file loaded
    if (!file) {
        return resp.status(400).json({
            ok: false,
            message: 'the selected image could not be uploaded',
        });
    }
    //must always be an image
    if (!file.mimetype.includes('image')) {
        return resp.status(400).json({
            ok: false,
            message: 'the file select is not a image',
        });
    }
    //call that method to save images in the folder upload
    const fileSystem = new fileSystem_1.default();
    fileSystem.saveTempImage(file, req.user._id);
    resp.json({
        ok: true,
        file: file.mimetype
    });
});
exports.default = postRouter;
