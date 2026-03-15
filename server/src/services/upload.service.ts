import db from '../config/database';
import fs from 'fs';
import path from 'path';

export class UploadService {
  static async saveMedia(file: Express.Multer.File, uploadedBy: string) {
    const [media] = await db('media').insert({
      filename: file.filename,
      original_name: file.originalname,
      mime_type: file.mimetype,
      size: file.size,
      path: `/uploads/${file.filename}`,
      uploaded_by: uploadedBy,
    }).returning('*');
    return media;
  }

  static async list(type?: string, page = 1, limit = 20) {
    let query = db('media').orderBy('created_at', 'desc');
    if (type === 'image') query = query.where('mime_type', 'like', 'image/%');
    if (type === 'video') query = query.where('mime_type', 'like', 'video/%');

    const countResult = await query.clone().count('* as total').first() as any;
    const total = Number(countResult?.total || 0);
    const items = await query.offset((page - 1) * limit).limit(limit);
    return { items, total, page, limit };
  }

  static async delete(id: string, uploadDir: string) {
    const media = await db('media').where({ id }).first();
    if (!media) throw new Error('Media not found');

    const filePath = path.resolve(uploadDir, media.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await db('media').where({ id }).del();
  }
}
