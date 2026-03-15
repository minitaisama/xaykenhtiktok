import db from '../config/database';

export class AnalyticsService {
  static async getDashboard() {
    const [projectCount] = await db('projects').count('* as count');
    const [featuredCount] = await db('projects').where({ featured: true }).count('* as count');
    const [viewsSum] = await db('projects').sum('views as total');
    const [mediaCount] = await db('media').count('* as count');

    const byCategory = await db('projects')
      .select('category')
      .count('* as count')
      .groupBy('category')
      .orderBy('count', 'desc');

    const recentProjects = await db('projects')
      .orderBy('created_at', 'desc')
      .limit(5);

    return {
      totalProjects: Number(projectCount.count),
      featuredCount: Number(featuredCount.count),
      totalViews: Number(viewsSum.total || 0),
      totalMedia: Number(mediaCount.count),
      projectsByCategory: byCategory.map((r: any) => ({ category: r.category || 'Uncategorized', count: Number(r.count) })),
      recentProjects,
    };
  }
}
