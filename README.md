# C1 – Trần Hưng Đạo | Reunion 2026

Landing page cho buổi họp lớp 10 năm THĐ-C1-13_16.

## Yêu cầu

- Node.js 18+
- MySQL 8+

## Cài đặt

```bash
npm install
```

Tạo file `.env.local` với các biến:

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=c1_reunion
AWS_S3_BUCKET=your-bucket-name
AWS_S3_REGION=ap-southeast-1
```

## Database

### Tạo database + chạy migration + seed dữ liệu (lần đầu)

```bash
npm run db:setup
```

Hoặc chạy từng bước:

```bash
npm run db:create        # Tạo database
npm run migration        # Chạy schema (tạo bảng)
npm run seeder           # Seed dữ liệu mẫu (admin account)
```

### Tạo/reset admin account

```bash
npm run seed-admin       # Tạo admin mặc định (admin / maiyeuc1)
```

### Generate blur placeholder cho ảnh gallery

```bash
npm run generate-blur    # Tạo LQIP cho ảnh chưa có blur_data_url
```

## Chạy dev server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Build & Production

```bash
npm run build
npm start
```
