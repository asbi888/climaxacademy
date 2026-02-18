-- Climax Academy Database Schema

-- Companies (corporate clients who buy training)
CREATE TABLE IF NOT EXISTS companies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  logo_url TEXT,
  industry TEXT,
  employee_count INTEGER,
  plan_tier TEXT DEFAULT 'standard',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Users (learners + HR admins)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL DEFAULT 'demo123',
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company_id INTEGER REFERENCES companies(id),
  avatar_url TEXT,
  job_title TEXT,
  department TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Programmes (training programmes)
CREATE TABLE IF NOT EXISTS programmes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  category TEXT NOT NULL,
  duration_hours INTEGER,
  module_count INTEGER,
  difficulty_level TEXT DEFAULT 'intermediate',
  thumbnail_gradient TEXT,
  price_per_person REAL,
  is_featured INTEGER DEFAULT 0,
  is_certified INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Modules (lessons within a programme)
CREATE TABLE IF NOT EXISTS modules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  programme_id INTEGER REFERENCES programmes(id),
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  duration_minutes INTEGER,
  content_type TEXT DEFAULT 'video',
  video_url TEXT,
  content_text TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Enrollments (user enrolled in a programme)
CREATE TABLE IF NOT EXISTS enrollments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  programme_id INTEGER REFERENCES programmes(id),
  enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'in_progress',
  completion_pct REAL DEFAULT 0,
  completed_at DATETIME
);

-- Module Progress (user progress per module)
CREATE TABLE IF NOT EXISTS module_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  module_id INTEGER REFERENCES modules(id),
  enrollment_id INTEGER REFERENCES enrollments(id),
  status TEXT DEFAULT 'locked',
  started_at DATETIME,
  completed_at DATETIME,
  quiz_score REAL,
  time_spent_minutes INTEGER DEFAULT 0
);

-- Certificates
CREATE TABLE IF NOT EXISTS certificates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  programme_id INTEGER REFERENCES programmes(id),
  enrollment_id INTEGER REFERENCES enrollments(id),
  certificate_number TEXT UNIQUE NOT NULL,
  issued_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  valid_until DATETIME,
  pdf_url TEXT
);

-- Quiz Questions (for assessments)
CREATE TABLE IF NOT EXISTS quiz_questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  module_id INTEGER REFERENCES modules(id),
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT,
  option_d TEXT,
  correct_option TEXT NOT NULL,
  explanation TEXT
);
