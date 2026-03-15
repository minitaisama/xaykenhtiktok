import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UploadController } from '../controllers/upload.controller';
import { authenticate, requireRole } from '../middleware/auth';
import { env } from '../config/env';

const storage = multer.diskStorage({
  destination: path.resolve(env.UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: (_req, file, cb) => {
    const allowed = /^(image\/(jpeg|png|gif|webp)|video\/(mp4|webm|quicktime|x-msvideo))$/;
    if (allowed.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'));
    }
  },
});

const router = Router();

router.post('/', authenticate, requireRole('admin', 'editor'), upload.single('file'), UploadController.upload);
router.get('/', authenticate, UploadController.list);
router.delete('/:id', authenticate, requireRole('admin'), UploadController.delete);

export default router;
