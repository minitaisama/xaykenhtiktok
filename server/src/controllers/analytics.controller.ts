import { Request, Response } from 'express';
import { AnalyticsService } from '../services/analytics.service';

export class AnalyticsController {
  static async getDashboard(req: Request, res: Response): Promise<void> {
    try {
      const data = await AnalyticsService.getDashboard();
      res.json(data);
    } catch (err) {
      console.error('[Analytics Error]', err);
      res.status(500).json({ error: 'Failed to get analytics' });
    }
  }
}
