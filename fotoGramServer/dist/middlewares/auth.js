"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const token_1 = __importDefault(require("../class/token"));
const verifyToken = (req, resp, next) => {
    const userToken = req.get('x-token') || '';
    token_1.default.checkToken(userToken)
        .then((decoded) => {
        console.log(decoded);
        req.user = decoded.user;
        next();
    }).catch((err) => {
        resp.json({
            ok: false,
            message: 'something went wrong token is invalid'
        });
        console.log(err);
    });
};
exports.verifyToken = verifyToken;
