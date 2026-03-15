import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import db from '../config/database';
import { env } from '../config/env';
import { JwtPayload, User } from '../types';

export class AuthService {
  static async login(email: string, password: string) {
    const user = await db<User>('users').where({ email }).first();
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Update last login
    await db('users').where({ id: user.id }).update({ last_login: new Date() });

    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = uuidv4();

    // Store refresh token (expires in 7 days)
    await db('refresh_tokens').insert({
      user_id: user.id,
      token: refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
    };
  }

  static async refresh(refreshToken: string) {
    const stored = await db('refresh_tokens')
      .where({ token: refreshToken })
      .andWhere('expires_at', '>', new Date())
      .first();

    if (!stored) {
      throw new Error('Invalid refresh token');
    }

    const user = await db<User>('users').where({ id: stored.user_id }).first();
    if (!user) {
      throw new Error('User not found');
    }

    // Rotate: delete old, create new
    await db('refresh_tokens').where({ id: stored.id }).del();

    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const newAccessToken = jwt.sign(payload, env.JWT_SECRET, { expiresIn: '15m' });
    const newRefreshToken = uuidv4();

    await db('refresh_tokens').insert({
      user_id: user.id,
      token: newRefreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  static async logout(refreshToken: string) {
    await db('refresh_tokens').where({ token: refreshToken }).del();
  }

  static async getProfile(userId: string) {
    const user = await db<User>('users')
      .select('id', 'email', 'name', 'role', 'avatar', 'created_at', 'last_login')
      .where({ id: userId })
      .first();

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  static async updateProfile(userId: string, data: { name?: string; avatar?: string }) {
    await db('users').where({ id: userId }).update({ ...data, updated_at: new Date() });
    return this.getProfile(userId);
  }
}
