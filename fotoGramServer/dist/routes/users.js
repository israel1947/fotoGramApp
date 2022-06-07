"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userModel_1 = require("../model/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRoute = express_1.Router();
userRoute.post('/create', (req, resp) => {
    //extracting information coming from the post method
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };
    //save req in the db
    userModel_1.User.create(user).then(userDB => {
        resp.json({
            ok: true,
            user: userDB
            //message:'the user has been successfully created'
        });
    }).catch(err => {
        resp.json({
            ok: false,
            err
        });
    });
});
exports.default = userRoute;
