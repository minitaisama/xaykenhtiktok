# XayKenhTikTok - Admin Site Specifications

## Overview
Dự án: Xây dựng website clone hoàn chỉnh của xaykenhtiktok.com
Công nghệ: HTML5, CSS3, JavaScript (ES6+)
Không sử dụng framework (static site)

## Admin Panel Requirements

### 1. Content Management (CMS)

#### 1.1 Featured Projects Section (Homepage)
- **Location**: Homepage (`index.html`) - Case Study section
- **Functionality**:
  - Thêm mới project card vào grid
  - Sửa nội dung project card (name, description, image)
  - Xóa project card
  - Reorder projects (drag & drop hoặc up/down buttons)
  - Upload/cập nhật video thumbnail cho mỗi project
  - Set project là "featured" (nổi bật) hoặc ẩn

#### 1.2 Portfolio Management (Dự Án page - `du-an.html`)
- **Location**: `du-an.html`
- **Functionality**:
  - Thêm mới portfolio item
  - Upload video file hoặc nhập URL YouTube/TikTok
  - Set category/industry cho mỗi project (F&B, Phong Thủy, Spa, Studio, etc.)
  - Set package type (Gói chuyên nghiệp, Gói cao cấp)
  - Edit/delete portfolio items
  - Bulk upload: upload nhiều video cùng lúc (tối đa 10 file)
  - Auto-generate thumbnail từ video URL
  - Reorder items

#### 1.3 Pricing Management (Báo Giá page - `bao-gia.html`)
- **Location**: `bao-gia.html`
- **Functionality**:
  - Thêm/sửa gói giá mới
  - Edit pricing tiers (Gói chuyên nghiệp, Gói cao cấp, Gói trọn gói)
  - Thêm/xóa các mức giá (tier) cho từng gói
  - Upload bảng giá (CSV import)
  - Set active/inactive status cho các gói

#### 1.4 Contact Management (Liên Hệ page - `lien-he.html`)
- **Location**: `lien-he.html`
- **Functionality**:
  - Cập nhật thông tin liên hệ (số điện thoại, Zalo, địa chỉ)
  - Thêm mới email liên hệ
  - Thêm form liên hệ (nếu cần)
  - Set giờ làm việc (monday-friday)
  - Track inquiries (history với status: pending/processed/closed)

### 2. Media Library

#### 2.1 Video Storage
- **Location**: Admin panel
- **Functionality**:
  - Upload video files (MP4, WebM)
  - Auto-generate thumbnail khi upload
  - Categorize videos theo project
  - Preview video trong admin panel
  - Delete/video files
  - Storage quota tracking
  - Supported formats: MP4, WebM, MOV, AVI

#### 2.2 Image Storage
- **Location**: Admin panel
- **Functionality**:
  - Upload project images/screenshots
  - Auto-resize: thumbnail (200x200), card (600x600)
  - CDN integration (nếu có)
  - Alt text management cho SEO

### 3. Analytics & Reporting

#### 3.1 Dashboard Overview
- **Location**: Admin panel homepage
- **Metrics hiển thị**:
  - Total visits (page views)
  - Unique visitors
  - Contact form submissions
  - Most viewed projects
  - Lead conversion rate
  - Date range filter (today, 7 days, 30 days, custom)

#### 3.2 Project Analytics
- **Location**: Chi tiết từng project
- **Metrics**:
  - Video views count
  - Click-through rate
  - Engagement rate
  - Shares/downloads
  - Top performing videos (sort)

### 4. User Management

#### 4.1 User Roles
- **Admin**: Full access (thêm/sửa/xóa nội dung, manage users, view analytics)
- **Editor**: Limited access (chỉ thêm/sửa nội dung project đã assign)
- **Viewer**: Read-only (không có quyền sửa)

#### 4.2 User Accounts
- **Authentication**: Email + Password (mặc định)
- **Social Login**: Optional (Google, Facebook, TikTok)
- **2FA**: Optional (SMS authenticator app)

### 5. SEO Management

#### 5.1 Meta Tags
- **Location**: Admin panel → Site Settings
- **Fields**:
  - Global title tag
  - Global description tag
  - Keywords (comma-separated)
  - Open Graph tags (og:title, og:description, og:image)
  - Favicon upload

#### 5.2 Sitemap
- **Location**: Admin panel → SEO Settings
- **Auto-generate**: Tự động tạo sitemap.xml
- **Include**: Tất cả pages
  - Update frequency: Manual trigger hoặc auto (hàng ngày)
- **Ping search engines**: Google, Bing khi sitemap thay đổi

### 6. Technical Requirements

#### 6.1 Backend (Optional cho v1)
- **Database**: MongoDB hoặc PostgreSQL (lưu trữ metadata, content, users)
- **API**: REST API cho CMS operations
- **Authentication**: JWT hoặc session-based
- **File Upload**: Multer hoặc native uploads
- **CDN**: Cloudflare, AWS CloudFront, hoặc BunnyCDN
- **Environment variables**: API keys, database URLs, CDN URLs

#### 6.2 Frontend
- **Framework**: React.js hoặc Vue.js (cho admin panel)
- **Styling**: Tailwind CSS hoặc SCSS
- **State Management**: Redux, Zustand, hoặc Context API
- **Routing**: React Router hoặc Vue Router
- **Build Tool**: Vite hoặc Webpack

#### 6.3 Security
- **HTTPS**: Bắt buộc (Let's Encrypt hoặc SSL certificate)
- **CORS**: Cấu hình cho API origins
- **Rate Limiting**: DDoS protection, rate limiting cho API calls
- **Input Sanitization**: Strip HTML tags, validate URLs
- **CSRF Protection**: Tokens cho form submissions
- **Password Hashing**: bcrypt hoặc Argon2 cho lưu trữ

### 7. Deployment

#### 7.1 Hosting
- **Static Site Hosting**: Netlify, Vercel, GitHub Pages, Cloudflare Pages
- **Database Hosting**: MongoDB Atlas, Supabase, Railway
- **CDN**: Cloudflare, AWS CloudFront
- **Domain**: Custom domain (xaykenhtiktok.vn hoặc .com)
- **SSL**: Automatic (có sẵn ở static hosts)

#### 7.2 Deployment Workflow
1. Git commits từ main branch
2. Auto-deploy trên push sang main
3. GitHub Actions hoặc equivalent (CI/CD)
4. Backup trước mỗi deployment
5. Rollback capability (trả về phiên bản trước)

### 8. Admin Panel UI/UX Guidelines

#### 8.1 Design Principles
- **Clean Interface**: Minimal, dễ dùng, không clutter
- **Responsive**: Mobile-first design
- **Loading States**: Skeleton loaders, spinners
- **Error Handling**: Friendly error messages, retry buttons
- **Feedback**: Toast notifications cho success/error
- **Keyboard Shortcuts**: Ctrl+S để save, Ctrl+N để new, ESC để close

#### 8.2 Color Scheme (Consistent với main site)
- **Primary**: #ec4899 (pink) - Actions, primary buttons
- **Secondary**: #14b8a6 (teal) - Secondary actions
- **Success**: #10b981 (green) - Success states
- **Warning**: #f59e0b (orange) - Warning messages
- **Error**: #ef4444 (red) - Error states
- **Background**: #fafafa (off-white) - Main background
- **Card Background**: #ffffff (white) - Cards, panels
- **Text**: #1a1a1a (dark gray) - Body text
- **Muted Text**: #888888 (medium gray) - Secondary text

#### 8.3 Typography
- **Font Family**: Inter (body), Space Grotesk (headings) - Consistent với main site
- **Font Sizes**:
  - Heading 1 (H1): 32-40px
  - Heading 2 (H2): 24-32px
  - Heading 3 (H3): 18-24px
  - Body: 14-16px
  - Small/Caption: 12-14px
- **Line Height**: 1.6 cho body, 1.3 cho headings
- **Font Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

### 9. API Endpoints (cho backend development)

#### 9.1 Content APIs
- `GET /api/projects` - List tất cả projects
- `POST /api/projects` - Thêm mới project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Xóa project
- `GET /api/projects/featured` - Lấy featured projects
- `POST /api/upload/video` - Upload video file
- `GET /api/analytics/dashboard` - Dashboard metrics
- `GET /api/analytics/project/:id` - Project analytics

#### 9.2 Settings APIs
- `GET /api/settings/site` - Site settings (title, meta tags)
- `PUT /api/settings/site` - Update site settings
- `GET /api/settings/contact` - Contact information
- `PUT /api/settings/contact` - Update contact info
- `GET /api/settings/pricing` - Pricing tiers
- `PUT /api/settings/pricing` - Update pricing

#### 9.3 User APIs
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile

### 10. Data Models

#### 10.1 Project Schema
```json
{
  "id": "string (UUID)",
  "title": "string",
  "description": "string",
  "thumbnail": "string (URL)",
  "videoUrl": "string (URL)",
  "category": "string (enum)",
  "package": "string (enum: 'chuyen-nghiep' | 'cao-cap')",
  "featured": "boolean",
  "stats": {
    "views": "number",
    "likes": "number",
    "shares": "number"
  },
  "createdAt": "ISO 8601 string",
  "updatedAt": "ISO 8601 string"
}
```

#### 10.2 User Schema
```json
{
  "id": "string (UUID)",
  "email": "string",
  "name": "string",
  "role": "string (enum: 'admin' | 'editor' | 'viewer')",
  "avatar": "string (URL)",
  "createdAt": "ISO 8601 string",
  "lastLogin": "ISO 8601 string"
}
```

#### 10.3 Settings Schema
```json
{
  "siteTitle": "string",
  "siteDescription": "string",
  "keywords": "array of strings",
  "ogTitle": "string",
  "ogDescription": "string",
  "ogImage": "string (URL)",
  "contactInfo": {
    "phone": "string",
    "zalo": "string",
    "address": "string",
    "email": "string",
    "workingHours": "string"
  },
  "socialLinks": {
    "tiktok": "string (URL)",
    "facebook": "string (URL)",
    "youtube": "string (URL)"
  }
}
```

### 11. Development Phases

#### Phase 1: Foundation (Week 1-2)
- [x] Admin panel basic structure (HTML/CSS)
- [x] REST API setup (Node.js/Express)
- [x] Database schema và migrations
- [x] Authentication system (JWT)
- [x] Basic CMS functionality

#### Phase 2: Content Management (Week 3-4)
- [x] Full CRUD operations cho Projects, Pricing
- [x] Video upload functionality
- [x] Image management
- [x] SEO meta tags management
- [x] Analytics dashboard cơ bản

#### Phase 3: Enhanced Features (Week 5-6)
- [x] Bulk upload functionality
- [x] Advanced analytics với charts
- [x] User management system
- [x] Sitemap auto-generation
- [x] CDN integration
- [x] Contact form + lead tracking

#### Phase 4: Polish & Launch (Week 7-8)
- [x] Admin panel UI/UX refinement
- [x] Performance optimization
- [x] Security audit
- [x] Beta testing với selected users
- [x] Production deployment
- [x] Documentation cho admin usage

### 12. Maintenance & Support

#### 12.1 Regular Maintenance
- Weekly database backups
- Update dependencies security patches
- Monitor uptime với health checks
- Review logs cho errors

#### 12.2 Content Updates
- Admin có thể update content mà không cần developer
- Changes reflect immediately on website
- Revision history cho undo/rollback

---

**Document Version**: 1.0
**Last Updated**: 2026-03-15
**Status**: Ready for Development
