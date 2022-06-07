"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'The name is required']
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    email: {
        type: String,
        required: [true, 'The anddress email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The paswword is required']
    }
});
exports.User = mongoose_1.model('User', userSchema);
