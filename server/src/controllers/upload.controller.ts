import { Response } from 'express';
import { UploadService } from '../services/upload.service';
import { AuthRequest } from '../types';
import { env } from '../config/env';

export class UploadController {
  static async upload(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
      }
      const media = await UploadService.saveMedia(req.file, req.user!.userId);
      res.status(201).json(media);
    } catch (err) {
      console.error('[Upload Error]', err);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  }

  static async list(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { type, page, limit } = req.query;
      const result = await UploadService.list(
        type as string,
        page ? Number(page) : undefined,
        limit ? Number(limit) : undefined,
      );
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: 'Failed to list media' });
    }
  }

  static async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      await UploadService.delete(req.params.id, env.UPLOAD_DIR);
      res.json({ message: 'Media deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete media' });
    }
  }
}
