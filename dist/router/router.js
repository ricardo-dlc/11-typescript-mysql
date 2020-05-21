"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get("/heroes", (req, res) => {
    const query = `
    SELECT *
    FROM heroes;`;
    mysql_1.default.query(query, (err, heroes) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err,
            });
        }
        if (!heroes) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: "No result found",
                },
            });
        }
        res.json({
            ok: true,
            heroes,
        });
    });
});
router.get("/heroes/:id", (req, res) => {
    const id = req.params.id;
    const escapedId = mysql_1.default.escape(id);
    const query = `
    SELECT *
    FROM heroes
    WHERE id = ${escapedId};`;
    mysql_1.default.query(query, (err, results) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err,
            });
        }
        if (!results) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: "No result found",
                },
            });
        }
        const heroe = results[0];
        res.json({
            ok: true,
            heroe,
        });
    });
});
exports.default = router;
