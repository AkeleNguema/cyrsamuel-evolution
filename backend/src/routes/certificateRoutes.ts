import { Router } from 'express';
import { downloadCertificate, verifyCertificate } from '../controllers/certificateController';

const router = Router();

// Route GET : http://localhost:5000/api/certificates/:token/download
router.get('/:token/download', downloadCertificate);

// Route GET : http://localhost:5000/api/certificates/verify/:token
router.get('/verify/:token', verifyCertificate);

export default router;

