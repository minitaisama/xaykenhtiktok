import { Router } from 'express';
import { z } from 'zod';
import { ProjectsController } from '../controllers/projects.controller';
import { authenticate, requireRole } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

const projectSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  video_url: z.string().optional(),
  category: z.string().optional(),
  package: z.enum(['chuyen-nghiep', 'cao-cap']).optional(),
  featured: z.boolean().optional(),
});

const projectUpdateSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  video_url: z.string().optional(),
  category: z.string().optional(),
  package: z.enum(['chuyen-nghiep', 'cao-cap']).optional(),
  featured: z.boolean().optional(),
}).strict();

const reorderSchema = z.object({
  items: z.array(z.object({
    id: z.string().uuid(),
    sort_order: z.number().int().min(0),
  })).min(1),
});

// Public GET endpoints
router.get('/', ProjectsController.list);
router.get('/:id', ProjectsController.getById);
router.post('/', authenticate, requireRole('admin', 'editor'), validate(projectSchema), ProjectsController.create);
router.put('/:id', authenticate, requireRole('admin', 'editor'), validate(projectUpdateSchema), ProjectsController.update);
router.delete('/:id', authenticate, requireRole('admin'), ProjectsController.delete);
router.put('/:id/featured', authenticate, requireRole('admin', 'editor'), ProjectsController.toggleFeatured);
router.put('/batch/reorder', authenticate, requireRole('admin', 'editor'), validate(reorderSchema), ProjectsController.reorder);

export default router;
