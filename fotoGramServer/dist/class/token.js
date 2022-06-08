"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Token {
    constructor() { }
    static getJwtToken(payload) {
        return jsonwebtoken_1.default.sign({
            user: payload
        }, this.seed, { expiresIn: this.expiration });
    }
    static checkToken(userToken) {
        return new Promise((resolve, rejects) => {
            jsonwebtoken_1.default.verify(userToken, this.seed, function (err, decoded) {
                if (err) {
                    //invalid token
                    rejects();
                }
                else {
                    //token valid
                    resolve(decoded);
                }
            });
        }).catch(err => {
            console.log(err);
        });
    }
}
exports.default = Token;
Token.seed = 'this-is-the-seed-of-the-app';
Token.expiration = '30d';
