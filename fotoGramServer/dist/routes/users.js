"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userModel_1 = require("../model/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRoute = express_1.Router();
//login
userRoute.post('/login', (req, resp) => {
    const userLogin = {
        email: req.body.email,
        password: req.body.password
    };
    userModel_1.User.findOne({ email: userLogin.email }, (err, userDB) => {
        if (err) {
            throw err;
        }
        if (!userDB) {
            return resp.json({
                ok: false,
                message: 'the credential is not correct'
            });
        }
        if (userDB.comparePassword(userLogin.password)) {
            resp.json({
                ok: true,
                token: 'aafaesfaefaefaef52f1asfas5f65'
            });
        }
        else {
            return resp.json({
                ok: false,
                message: 'the credential is not correct **'
            });
        }
    });
});
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
