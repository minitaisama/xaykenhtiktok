import { Router } from 'express';
import { SettingsController } from '../controllers/settings.controller';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

// Public GET endpoints (for static site integration)
router.get('/site', SettingsController.getSite);
router.get('/contact', SettingsController.getContact);
router.get('/pricing', SettingsController.getPricing);

// Protected PUT endpoints (admin only)
router.put('/site', authenticate, requireRole('admin'), SettingsController.updateSite);
router.put('/contact', authenticate, requireRole('admin'), SettingsController.updateContact);
router.put('/pricing', authenticate, requireRole('admin'), SettingsController.updatePricing);

export default router;
