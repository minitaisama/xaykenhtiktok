import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../types';

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.json(result);
    } catch (err) {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  }

  static async refresh(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        res.status(400).json({ error: 'Refresh token required' });
        return;
      }
      const result = await AuthService.refresh(refreshToken);
      res.json(result);
    } catch (err) {
      res.status(401).json({ error: 'Invalid refresh token' });
    }
  }

  static async logout(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;
      if (refreshToken) {
        await AuthService.logout(refreshToken);
      }
      res.json({ message: 'Logged out' });
    } catch {
      res.json({ message: 'Logged out' });
    }
  }

  static async getMe(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = await AuthService.getProfile(req.user!.userId);
      res.json(user);
    } catch (err) {
      res.status(404).json({ error: 'User not found' });
    }
  }

  static async updateMe(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = await AuthService.updateProfile(req.user!.userId, req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update profile' });
    }
  }
}
