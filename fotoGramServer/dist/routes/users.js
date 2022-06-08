"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userModel_1 = require("../model/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../class/token"));
const auth_1 = require("../middlewares/auth");
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
        //valid login
        if (userDB.comparePassword(userLogin.password)) {
            const userToken = token_1.default.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });
            resp.json({
                ok: true,
                token: userToken
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
        const userToken = token_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });
        resp.json({
            ok: true,
            token: userToken
        });
    }).catch(err => {
        resp.json({
            ok: false,
            err
        });
    });
});
//Update user
userRoute.post('/update', auth_1.verifyToken, (req, resp) => {
    //ejecut  if user  token is correct
    const userUpdate = {
        nombre: req.body.nombre,
        email: req.body.email,
        avatar: req.body.avatar
    };
    //update user
    userModel_1.User.findByIdAndUpdate(req.user._id, userUpdate, { new: true }, (err, userDB) => {
        if (err) {
            throw err;
        }
        if (!userDB) {
            return resp.json({
                ok: false,
                message: 'the user with this id does not exist'
            });
        }
        //generate a new token when the user information is update
        const userToken = token_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });
        resp.json({
            ok: true,
            token: userToken
        });
    });
});
exports.default = userRoute;
