-- Create responses table
CREATE TABLE IF NOT EXISTS responses (
  email TEXT PRIMARY KEY,
  response TEXT CHECK (response IN ('Coming', 'Not coming') OR response IS NULL),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  email TEXT PRIMARY KEY,
  password TEXT NOT NULL
);

-- Insert 50 predefined email addresses for invited guests
-- Each starts with response = null
INSERT INTO responses (email, response, updated_at) VALUES
  ('guest1@example.com', NULL, NOW()),
  ('guest2@example.com', NULL, NOW()),
  ('guest3@example.com', NULL, NOW()),
  ('guest4@example.com', NULL, NOW()),
  ('guest5@example.com', NULL, NOW()),
  ('guest6@example.com', NULL, NOW()),
  ('guest7@example.com', NULL, NOW()),
  ('guest8@example.com', NULL, NOW()),
  ('guest9@example.com', NULL, NOW()),
  ('guest10@example.com', NULL, NOW()),
  ('guest11@example.com', NULL, NOW()),
  ('guest12@example.com', NULL, NOW()),
  ('guest13@example.com', NULL, NOW()),
  ('guest14@example.com', NULL, NOW()),
  ('guest15@example.com', NULL, NOW()),
  ('guest16@example.com', NULL, NOW()),
  ('guest17@example.com', NULL, NOW()),
  ('guest18@example.com', NULL, NOW()),
  ('guest19@example.com', NULL, NOW()),
  ('guest20@example.com', NULL, NOW()),
  ('guest21@example.com', NULL, NOW()),
  ('guest22@example.com', NULL, NOW()),
  ('guest23@example.com', NULL, NOW()),
  ('guest24@example.com', NULL, NOW()),
  ('guest25@example.com', NULL, NOW()),
  ('guest26@example.com', NULL, NOW()),
  ('guest27@example.com', NULL, NOW()),
  ('guest28@example.com', NULL, NOW()),
  ('guest29@example.com', NULL, NOW()),
  ('guest30@example.com', NULL, NOW()),
  ('guest31@example.com', NULL, NOW()),
  ('guest32@example.com', NULL, NOW()),
  ('guest33@example.com', NULL, NOW()),
  ('guest34@example.com', NULL, NOW()),
  ('guest35@example.com', NULL, NOW()),
  ('guest36@example.com', NULL, NOW()),
  ('guest37@example.com', NULL, NOW()),
  ('guest38@example.com', NULL, NOW()),
  ('guest39@example.com', NULL, NOW()),
  ('guest40@example.com', NULL, NOW()),
  ('guest41@example.com', NULL, NOW()),
  ('guest42@example.com', NULL, NOW()),
  ('guest43@example.com', NULL, NOW()),
  ('guest44@example.com', NULL, NOW()),
  ('guest45@example.com', NULL, NOW()),
  ('guest46@example.com', NULL, NOW()),
  ('guest47@example.com', NULL, NOW()),
  ('guest48@example.com', NULL, NOW()),
  ('guest49@example.com', NULL, NOW()),
  ('guest50@example.com', NULL, NOW())
ON CONFLICT (email) DO NOTHING;

-- Insert a sample admin user
-- IMPORTANT: Change the email and password before deploying!
INSERT INTO admins (email, password) VALUES
  ('admin@codemas2025.com', 'admin123')
ON CONFLICT (email) DO NOTHING;

-- Create an index on updated_at for faster queries
CREATE INDEX IF NOT EXISTS idx_responses_updated_at ON responses(updated_at DESC);

-- Enable Row Level Security (RLS) if needed
-- ALTER TABLE responses ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Note: For production, consider:
-- 1. Using proper password hashing for admins
-- 2. Setting up RLS policies
-- 3. Using Supabase Auth for admin authentication