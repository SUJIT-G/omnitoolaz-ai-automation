CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  plan TEXT DEFAULT 'free',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE social_accounts (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  platform TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT
);

CREATE TABLE scheduled_posts (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  platform TEXT NOT NULL,
  image_url TEXT,
  caption TEXT,
  scheduled_time DATETIME NOT NULL,
  status TEXT DEFAULT 'pending'
);

