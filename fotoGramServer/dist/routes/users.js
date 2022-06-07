"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoute = express_1.Router();
userRoute.get('/prueba', (req, resp) => {
    resp.json({
        ok: true,
        message: 'todo esta bien'
    });
});
exports.default = userRoute;
