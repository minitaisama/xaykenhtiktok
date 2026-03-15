import { Request, Response } from 'express';
import { SettingsService } from '../services/settings.service';

export class SettingsController {
  static async getSite(req: Request, res: Response): Promise<void> {
    const data = await SettingsService.get('site');
    res.json(data || {});
  }

  static async updateSite(req: Request, res: Response): Promise<void> {
    const data = await SettingsService.update('site', req.body);
    res.json(data);
  }

  static async getContact(req: Request, res: Response): Promise<void> {
    const data = await SettingsService.get('contact');
    res.json(data || {});
  }

  static async updateContact(req: Request, res: Response): Promise<void> {
    const data = await SettingsService.update('contact', req.body);
    res.json(data);
  }

  static async getPricing(req: Request, res: Response): Promise<void> {
    const data = await SettingsService.get('pricing');
    res.json(data || {});
  }

  static async updatePricing(req: Request, res: Response): Promise<void> {
    const data = await SettingsService.update('pricing', req.body);
    res.json(data);
  }
}
