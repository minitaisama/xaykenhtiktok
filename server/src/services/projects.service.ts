import db from '../config/database';
import { Project } from '../types';

interface ListOptions {
  page?: number;
  limit?: number;
  featured?: boolean;
  category?: string;
  package?: string;
  search?: string;
}

export class ProjectsService {
  static async list(options: ListOptions = {}) {
    const { page = 1, limit = 20, featured, category, package: pkg, search } = options;
    let query = db<Project>('projects');

    if (featured !== undefined) query = query.where({ featured });
    if (category) query = query.where({ category });
    if (pkg) query = query.where('package', pkg);
    if (search) query = query.whereILike('title', `%${search}%`);

    const countResult = await query.clone().count('* as total').first() as any;
    const total = Number(countResult?.total || 0);
    const items = await query.orderBy('sort_order', 'asc').offset((page - 1) * limit).limit(limit);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  static async getById(id: string) {
    return db<Project>('projects').where({ id }).first();
  }

  static async create(data: Partial<Project>) {
    const maxOrder = await db('projects').max('sort_order as max').first();
    const [project] = await db<Project>('projects')
      .insert({ ...data, sort_order: (maxOrder?.max || 0) + 1 })
      .returning('*');
    return project;
  }

  private static readonly ALLOWED_FIELDS = ['title', 'description', 'thumbnail', 'video_url', 'category', 'package', 'featured'] as const;

  static async update(id: string, data: Partial<Project>) {
    const sanitized: Record<string, any> = {};
    for (const key of this.ALLOWED_FIELDS) {
      if (data[key] !== undefined) sanitized[key] = data[key];
    }
    const [project] = await db<Project>('projects')
      .where({ id })
      .update({ ...sanitized, updated_at: new Date() })
      .returning('*');
    return project;
  }

  static async delete(id: string) {
    return db('projects').where({ id }).del();
  }

  static async reorder(items: { id: string; sort_order: number }[]) {
    await db.transaction(async (trx) => {
      for (const item of items) {
        await trx('projects').where({ id: item.id }).update({ sort_order: item.sort_order });
      }
    });
  }

  static async toggleFeatured(id: string) {
    const project = await db<Project>('projects').where({ id }).first();
    if (!project) throw new Error('Project not found');
    const [updated] = await db<Project>('projects')
      .where({ id })
      .update({ featured: !project.featured, updated_at: new Date() })
      .returning('*');
    return updated;
  }
}
