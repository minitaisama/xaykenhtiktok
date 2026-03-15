import { Request, Response } from 'express';
import { ProjectsService } from '../services/projects.service';

export class ProjectsController {
  static async list(req: Request, res: Response): Promise<void> {
    try {
      const { page, limit, featured, category, package: pkg, search } = req.query;
      const result = await ProjectsService.list({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        featured: featured === 'true' ? true : featured === 'false' ? false : undefined,
        category: category as string,
        package: pkg as string,
        search: search as string,
      });
      res.json(result);
    } catch (err) {
      console.error('[Projects List Error]', err);
      res.status(500).json({ error: 'Failed to list projects' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const project = await ProjectsService.getById(req.params.id);
      if (!project) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }
      res.json(project);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get project' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const project = await ProjectsService.create(req.body);
      res.status(201).json(project);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create project' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const project = await ProjectsService.update(req.params.id, req.body);
      if (!project) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }
      res.json(project);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update project' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      await ProjectsService.delete(req.params.id);
      res.json({ message: 'Project deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete project' });
    }
  }

  static async reorder(req: Request, res: Response): Promise<void> {
    try {
      await ProjectsService.reorder(req.body.items);
      res.json({ message: 'Reordered' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to reorder' });
    }
  }

  static async toggleFeatured(req: Request, res: Response): Promise<void> {
    try {
      const project = await ProjectsService.toggleFeatured(req.params.id);
      res.json(project);
    } catch (err) {
      res.status(500).json({ error: 'Failed to toggle featured' });
    }
  }
}
