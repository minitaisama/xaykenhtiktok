import db from '../config/database';

export class SettingsService {
  static async get(key: string) {
    const row = await db('settings').where({ key }).first();
    return row ? row.value : null;
  }

  static async update(key: string, value: any) {
    const exists = await db('settings').where({ key }).first();
    if (exists) {
      await db('settings').where({ key }).update({ value: JSON.stringify(value), updated_at: new Date() });
    } else {
      await db('settings').insert({ key, value: JSON.stringify(value) });
    }
    return value;
  }
}
