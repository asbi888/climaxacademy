import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(process.cwd(), 'db', 'climax-academy.db');

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    const isNew = !fs.existsSync(DB_PATH);
    _db = new Database(DB_PATH);
    _db.pragma('journal_mode = WAL');
    _db.pragma('foreign_keys = ON');

    if (isNew) {
      const schemaPath = path.join(process.cwd(), 'db', 'schema.sql');
      const seedPath = path.join(process.cwd(), 'db', 'seed.sql');

      const schema = fs.readFileSync(schemaPath, 'utf-8');
      const seed = fs.readFileSync(seedPath, 'utf-8');

      _db.exec(schema);
      _db.exec(seed);

      console.log('[Climax Academy] Database initialized with schema and seed data.');
    } else {
      console.log('[Climax Academy] Database connection established.');
    }
  }
  return _db;
}

// Type helpers for common queries
export interface Company {
  id: number;
  name: string;
  logo_url: string | null;
  industry: string;
  employee_count: number;
  plan_tier: string;
  created_at: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'learner' | 'hr_admin' | 'climax_admin';
  company_id: number | null;
  avatar_url: string | null;
  job_title: string;
  department: string;
  created_at: string;
  company_name?: string;
}

export interface Programme {
  id: number;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  category: string;
  duration_hours: number;
  module_count: number;
  difficulty_level: string;
  thumbnail_gradient: string;
  price_per_person: number;
  is_featured: number;
  is_certified: number;
  created_at: string;
}

export interface Module {
  id: number;
  programme_id: number;
  title: string;
  description: string;
  order_index: number;
  duration_minutes: number;
  content_type: 'video' | 'reading' | 'exercise' | 'quiz';
  video_url: string | null;
  content_text: string | null;
  created_at: string;
}

export interface Enrollment {
  id: number;
  user_id: number;
  programme_id: number;
  enrolled_at: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completion_pct: number;
  completed_at: string | null;
}

export interface ModuleProgress {
  id: number;
  user_id: number;
  module_id: number;
  enrollment_id: number;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  started_at: string | null;
  completed_at: string | null;
  quiz_score: number | null;
  time_spent_minutes: number;
}

export interface Certificate {
  id: number;
  user_id: number;
  programme_id: number;
  enrollment_id: number;
  certificate_number: string;
  issued_at: string;
  valid_until: string;
  pdf_url: string | null;
}

export interface QuizQuestion {
  id: number;
  module_id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string | null;
  option_d: string | null;
  correct_option: string;
  explanation: string;
}
