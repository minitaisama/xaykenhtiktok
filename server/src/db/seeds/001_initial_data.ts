import { Knex } from 'knex';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Clear existing data
  await knex('refresh_tokens').del();
  await knex('media').del();
  await knex('projects').del();
  await knex('settings').del();
  await knex('users').del();

  // 1. Admin user
  const passwordHash = await bcrypt.hash('changeme123', 12);
  await knex('users').insert({
    email: 'admin@xaykenhtiktok.com',
    password_hash: passwordHash,
    name: 'Admin',
    role: 'admin',
  });

  // 2. Projects (from index.html case studies)
  await knex('projects').insert([
    {
      title: 'autotrade2828.official',
      description: 'Kênh TikTok về giao dịch tự động',
      category: 'thiet-bi',
      package: 'cao-cap',
      featured: true,
      sort_order: 1,
      views: 15000,
      likes: 1200,
      shares: 300,
    },
    {
      title: 'tee8eyebrows',
      description: 'Kênh TikTok về phun xăm thẩm mỹ',
      category: 'spa',
      package: 'chuyen-nghiep',
      featured: true,
      sort_order: 2,
      views: 22000,
      likes: 1800,
      shares: 450,
    },
    {
      title: 'kinhdichthaycuong',
      description: 'Kênh TikTok về phong thủy kinh dịch',
      category: 'phong-thuy',
      package: 'cao-cap',
      featured: true,
      sort_order: 3,
      views: 35000,
      likes: 2500,
      shares: 800,
    },
    {
      title: 'thienkhoituyendung',
      description: 'Kênh TikTok tuyển dụng nhân sự',
      category: 'tuyen-dung',
      package: 'chuyen-nghiep',
      featured: true,
      sort_order: 4,
      views: 18000,
      likes: 900,
      shares: 200,
    },
    {
      title: 'noithatgiakhanh',
      description: 'Kênh TikTok về nội thất và thiết kế',
      category: 'noi-that',
      package: 'chuyen-nghiep',
      featured: false,
      sort_order: 5,
      views: 12000,
      likes: 600,
      shares: 150,
    },
  ]);

  // 3. Settings
  await knex('settings').insert([
    {
      key: 'site',
      value: JSON.stringify({
        siteTitle: 'XayKenhTikTok - Dịch vụ sản xuất video TikTok chuyên nghiệp',
        siteDescription: 'Đội ngũ sản xuất video TikTok chuyên nghiệp, giúp doanh nghiệp xây dựng kênh TikTok hiệu quả.',
        keywords: ['tiktok', 'video', 'san xuat video', 'xay kenh tiktok', 'marketing'],
        ogTitle: 'XayKenhTikTok - Sản xuất video TikTok',
        ogDescription: 'Dịch vụ sản xuất video TikTok chuyên nghiệp cho doanh nghiệp',
        ogImage: '',
      }),
    },
    {
      key: 'contact',
      value: JSON.stringify({
        phones: ['0523 860 068', '0888 430 620'],
        contactName: 'Anh Nam',
        zalo: '0523860068',
        address: '458/64 Đ. 3 Tháng 2, Quận 10, TP. Hồ Chí Minh',
        email: 'contact@xaykenhtiktok.com',
        workingHours: 'Thứ 2 - Thứ 6: 9:00 - 18:00',
        socialLinks: {
          tiktok: 'https://www.tiktok.com/@cna.ent',
          facebook: 'https://www.facebook.com/xaykenhtiktok',
          youtube: 'https://www.youtube.com/@CNAGroup',
        },
      }),
    },
    {
      key: 'pricing',
      value: JSON.stringify({
        packages: [
          {
            slug: 'chuyen-nghiep',
            name: 'GÓI CHUYÊN NGHIỆP',
            subtitle: 'Phù hợp cho doanh nghiệp vừa và nhỏ',
            active: true,
            features: [
              'Kịch bản sáng tạo',
              'Quay & dựng chuyên nghiệp',
              'Tối ưu SEO TikTok',
              'Báo cáo hiệu suất',
            ],
            tiers: [
              { videoCount: 10, priceWithActor: 8000000, priceWithoutActor: 7500000, duration: '1 buổi (4h)' },
              { videoCount: 20, priceWithActor: 15000000, priceWithoutActor: 14000000, duration: '2 buổi (8h)' },
              { videoCount: 30, priceWithActor: 21000000, priceWithoutActor: 19500000, duration: '3 buổi (12h)' },
              { videoCount: 50, priceWithActor: 32500000, priceWithoutActor: 30000000, duration: '4 buổi (16h)' },
              { videoCount: 100, priceWithActor: 55000000, priceWithoutActor: 50000000, duration: '7 buổi (28h)' },
            ],
          },
          {
            slug: 'cao-cap',
            name: 'GÓI CAO CẤP',
            subtitle: 'Dành cho doanh nghiệp lớn, yêu cầu chất lượng cao',
            active: true,
            features: [
              'Kịch bản premium',
              'Quay 4K chuyên nghiệp',
              'Dựng phim cinematic',
              'Tối ưu SEO nâng cao',
              'Account Manager riêng',
            ],
            tiers: [
              { videoCount: 10, priceWithActor: 12000000, priceWithoutActor: 11000000, duration: '1 buổi (4h)' },
              { videoCount: 20, priceWithActor: 22000000, priceWithoutActor: 20000000, duration: '2 buổi (8h)' },
              { videoCount: 30, priceWithActor: 30000000, priceWithoutActor: 27000000, duration: '3 buổi (12h)' },
              { videoCount: 50, priceWithActor: 45000000, priceWithoutActor: 40000000, duration: '4 buổi (16h)' },
              { videoCount: 100, priceWithActor: 80000000, priceWithoutActor: 70000000, duration: '7 buổi (28h)' },
            ],
          },
          {
            slug: 'tron-goi',
            name: 'GÓI TRỌN GÓI',
            subtitle: 'Best seller - Giải pháp toàn diện',
            active: true,
            features: [
              '100 video/tháng',
              'Diễn viên chuyên nghiệp',
              'Kịch bản sáng tạo',
              'Quay & dựng chuyên nghiệp',
              'Tối ưu SEO TikTok',
              'Account Manager riêng',
              'Báo cáo chi tiết hàng tuần',
            ],
            price: 50000000,
          },
        ],
      }),
    },
  ]);
}
