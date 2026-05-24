-- Run db/seed-admin.js to regenerate the admin INSERT with a fresh bcrypt hash.
-- The hash below corresponds to username='admin' password='maiyeuc1'.
-- Generated once with: node db/seed-admin.js
-- IMPORTANT: change the password after first login on a real deployment.

INSERT INTO admins (username, password_hash) VALUES
  ('admin', '$2b$10$VWEe0qszyCy0R/wnCJpowOEbYMl1HiSB300d0Jtkt3ivVM6pE2Fxe')
  ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash);

-- Timeline photos
INSERT INTO timeline_photos (s3_url, year, label, display_order) VALUES
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2013/slide_1.jpg', '2013', 'Ảnh 2013', 1),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2013/slide_2.jpg', '2013', 'Ảnh 2013', 2),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2013/slide_3.jpg', '2013', 'Ảnh 2013', 3),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2013/slide_4.jpg', '2013', 'Ảnh 2013', 4),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2013/slide_5.jpg', '2013', 'Ảnh 2013', 5),
   ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2014/slide_1.jpg', '2014', 'Ảnh 2013', 1),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2014/slide_2.jpg', '2014', 'Ảnh 2014', 2),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2014/slide_3.jpg', '2014', 'Ảnh 2014', 3),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2014/slide_4.jpg', '2014', 'Ảnh 2014', 4),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2014/slide_5.jpg', '2014', 'Ảnh 2014', 5),
   ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2015/slide_1.jpg', '2015', 'Ảnh 2013', 1),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2015/slide_2.jpg', '2015', 'Ảnh 2013', 2),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2015/slide_3.jpg', '2015', 'Ảnh 2013', 3),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2015/slide_4.jpg', '2015', 'Ảnh 2013', 4),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2015/slide_5.jpg', '2015', 'Ảnh 2013', 5),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2016/slide_1.jpg', '2016', 'Ảnh 2016', 1),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2016/slide_2.jpg', '2016', 'Ảnh 2016', 2),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2016/slide_3.jpg', '2016', 'Ảnh 2016', 3),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2016/slide_4.jpg', '2016', 'Ảnh 2016', 4),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2016/slide_5.jpg', '2016', 'Ảnh 2016', 5),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2016/slide_6.jpg', '2016', 'Ảnh 2016', 6),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2016/slide_7.jpg', '2016', 'Ảnh 2016', 7),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2016/slide_8.jpg', '2016', 'Ảnh 2016', 8),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2016/slide_9.jpg', '2016', 'Ảnh 2016', 9),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2016/slide_10.jpg', '2016', 'Ảnh 2016', 10),
   ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2017/slide_1.jpg', '2017', 'Ảnh 2017', 1),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2017/slide_2.jpg', '2017', 'Ảnh 2017', 2),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2017/slide_3.jpg', '2017', 'Ảnh 2017', 3),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2017/slide_4.jpg', '2017', 'Ảnh 2017', 4),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2017/slide_5.jpg', '2017', 'Ảnh 2017', 5),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2021/slide_1.jpg', '2021', 'Ảnh 2021', 1),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2021/slide_2.jpg', '2021', 'Ảnh 2021', 2),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2021/slide_3.jpg', '2021', 'Ảnh 2021', 3),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2021/slide_4.jpg', '2021', 'Ảnh 2021', 4),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2021/slide_5.jpg', '2021', 'Ảnh 2021', 5),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2025/slide_1.jpg', '2025', 'Ảnh 2025', 1),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2025/slide_2.jpg', '2025', 'Ảnh 2025', 2),
  ('https://c1-reunion.s3.ap-southeast-1.amazonaws.com/time-line/2026/slide_1.jpg', '2026', 'Ảnh 2026', 1)
  ON DUPLICATE KEY UPDATE s3_url = VALUES(s3_url);
