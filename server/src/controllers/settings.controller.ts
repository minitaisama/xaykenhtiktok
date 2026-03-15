import { Request, Response } from 'express';
import { SettingsService } from '../services/settings.service';

export class SettingsController {
  static async getSite(_req: Request, res: Response): Promise<void> {
    try {
      const data = await SettingsService.get('site');
      res.json(data || {});
    } catch (err) {
      console.error('[Settings Error]', err);
      res.status(500).json({ error: 'Failed to get site settings' });
    }
  }

  static async updateSite(req: Request, res: Response): Promise<void> {
    try {
      const data = await SettingsService.update('site', req.body);
      res.json(data);
    } catch (err) {
      console.error('[Settings Error]', err);
      res.status(500).json({ error: 'Failed to update site settings' });
    }
  }

  static async getContact(_req: Request, res: Response): Promise<void> {
    try {
      const data = await SettingsService.get('contact');
      res.json(data || {});
    } catch (err) {
      console.error('[Settings Error]', err);
      res.status(500).json({ error: 'Failed to get contact settings' });
    }
  }

  static async updateContact(req: Request, res: Response): Promise<void> {
    try {
      const data = await SettingsService.update('contact', req.body);
      res.json(data);
    } catch (err) {
      console.error('[Settings Error]', err);
      res.status(500).json({ error: 'Failed to update contact settings' });
    }
  }

  static async getPricing(_req: Request, res: Response): Promise<void> {
    try {
      const data = await SettingsService.get('pricing');
      res.json(data || {});
    } catch (err) {
      console.error('[Settings Error]', err);
      res.status(500).json({ error: 'Failed to get pricing settings' });
    }
  }

  static async updatePricing(req: Request, res: Response): Promise<void> {
    try {
      const data = await SettingsService.update('pricing', req.body);
      res.json(data);
    } catch (err) {
      console.error('[Settings Error]', err);
      res.status(500).json({ error: 'Failed to update pricing settings' });
    }
  }
}
