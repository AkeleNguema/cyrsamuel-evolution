"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const certificateController_1 = require("../controllers/certificateController");
const router = (0, express_1.Router)();
// Route GET : http://localhost:5000/api/certificates/:token/download
router.get('/:token/download', certificateController_1.downloadCertificate);
// Route GET : http://localhost:5000/api/certificates/verify/:token
router.get('/verify/:token', certificateController_1.verifyCertificate);
exports.default = router;
