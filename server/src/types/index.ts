import { Request } from 'express';

export interface JwtPayload {
  userId: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export interface User {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar: string | null;
  created_at: Date;
  updated_at: Date;
  last_login: Date | null;
}

export interface Project {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  video_url: string | null;
  category: string | null;
  package: 'chuyen-nghiep' | 'cao-cap';
  featured: boolean;
  sort_order: number;
  views: number;
  likes: number;
  shares: number;
  created_at: Date;
  updated_at: Date;
}
