"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Route POST : http://localhost:5000/api/users/register
router.post('/register', userController_1.createPlayer);
// Route GET : http://localhost:5000/api/users/:id
router.get('/:id', userController_1.getPlayer);
// Route PUT : http://localhost:5000/api/users/:id/level-up (et alias /:id/levelup)
router.put('/:id/level-up', userController_1.levelUpPlayer);
router.put('/:id/levelup', userController_1.levelUpPlayer);
exports.default = router;
