CREATE TABLE IF NOT EXISTS responses (
  email TEXT PRIMARY KEY,
  response TEXT CHECK (response IN ('Coming', 'Not coming') OR response IS NULL),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admins (
  email TEXT PRIMARY KEY,
  password_hash TEXT NOT NULL
);

INSERT INTO admins (email, password_hash) VALUES
  ('mail@example.com', 'password')

ON CONFLICT (email) DO NOTHING;

CREATE INDEX IF NOT EXISTS idx_responses_updated_at ON responses(updated_at DESC);