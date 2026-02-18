-- =============================================
-- CLIMAX ACADEMY - Supabase Migration
-- Run this in Supabase SQL Editor
-- =============================================

-- Companies
CREATE TABLE IF NOT EXISTS companies (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  industry TEXT,
  employee_count INTEGER,
  plan_tier TEXT DEFAULT 'standard',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL DEFAULT 'demo123',
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company_id INTEGER REFERENCES companies(id),
  avatar_url TEXT,
  job_title TEXT,
  department TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Programmes
CREATE TABLE IF NOT EXISTS programmes (
  id SERIAL PRIMARY KEY,
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
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Modules
CREATE TABLE IF NOT EXISTS modules (
  id SERIAL PRIMARY KEY,
  programme_id INTEGER REFERENCES programmes(id),
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  duration_minutes INTEGER,
  content_type TEXT DEFAULT 'video',
  video_url TEXT,
  content_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enrollments
CREATE TABLE IF NOT EXISTS enrollments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  programme_id INTEGER REFERENCES programmes(id),
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'in_progress',
  completion_pct REAL DEFAULT 0,
  completed_at TIMESTAMPTZ
);

-- Module Progress
CREATE TABLE IF NOT EXISTS module_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  module_id INTEGER REFERENCES modules(id),
  enrollment_id INTEGER REFERENCES enrollments(id),
  status TEXT DEFAULT 'locked',
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  quiz_score REAL,
  time_spent_minutes INTEGER DEFAULT 0
);

-- Certificates
CREATE TABLE IF NOT EXISTS certificates (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  programme_id INTEGER REFERENCES programmes(id),
  enrollment_id INTEGER REFERENCES enrollments(id),
  certificate_number TEXT UNIQUE NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  valid_until TIMESTAMPTZ,
  pdf_url TEXT
);

-- Quiz Questions
CREATE TABLE IF NOT EXISTS quiz_questions (
  id SERIAL PRIMARY KEY,
  module_id INTEGER REFERENCES modules(id),
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT,
  option_d TEXT,
  correct_option TEXT NOT NULL,
  explanation TEXT
);

-- =============================================
-- DISABLE RLS for demo (enable later for prod)
-- =============================================
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE programmes ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

-- Allow anon read/write for demo purposes
CREATE POLICY "Allow all for anon" ON companies FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON programmes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON modules FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON enrollments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON module_progress FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON certificates FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON quiz_questions FOR ALL USING (true) WITH CHECK (true);

-- =============================================
-- SEED DATA
-- =============================================

-- COMPANIES
INSERT INTO companies (name, industry, employee_count, plan_tier, created_at) VALUES
('Rogers Capital Ltd', 'Financial Services', 2500, 'premium', '2024-01-15'),
('IBL Group', 'Conglomerate', 3000, 'premium', '2024-02-01'),
('Currimjee Jeewanjee & Co', 'Diversified', 1800, 'standard', '2024-03-10'),
('Harel Mallac & Co', 'Industrial', 1200, 'standard', '2024-04-05'),
('Ceridian Mauritius', 'Technology / HR', 600, 'starter', '2024-05-20'),
('MCB Group', 'Banking', 3500, 'premium', '2024-01-08');

-- PROGRAMMES
INSERT INTO programmes (title, slug, description, short_description, category, duration_hours, module_count, difficulty_level, thumbnail_gradient, price_per_person, is_featured, is_certified) VALUES
(
  'Leadership Essentials',
  'leadership-essentials',
  'A comprehensive programme designed to develop the leadership mindset and skills needed to inspire teams, drive results, and navigate change with confidence. Through interactive modules, real-world case studies, and reflective exercises, participants will discover their unique leadership style and learn to lead with authenticity and impact.',
  'Develop the leadership mindset and skills to inspire teams, drive results, and navigate change with confidence.',
  'Leadership',
  12, 6, 'intermediate',
  'linear-gradient(135deg, #F59E0B, #EA580C)',
  450.00, 1, 1
),
(
  'Effective Communication Mastery',
  'effective-communication-mastery',
  'Master the art of clear, persuasive, and empathetic communication in professional settings. This programme covers everything from active listening and non-verbal cues to presentation skills and difficult conversations, empowering you to connect meaningfully with colleagues, clients, and stakeholders.',
  'Master the art of clear, persuasive, and empathetic communication in professional settings.',
  'Communication',
  10, 5, 'beginner',
  'linear-gradient(135deg, #3B82F6, #06B6D4)',
  380.00, 1, 1
),
(
  'Conflict Resolution & Mediation',
  'conflict-resolution-mediation',
  'Transform workplace conflicts into opportunities for growth and stronger team dynamics. Learn proven mediation techniques, understand the psychology of conflict, and develop the skills to facilitate productive discussions that turn disagreements into breakthroughs.',
  'Transform workplace conflicts into opportunities for growth and stronger team dynamics.',
  'Conflict Resolution',
  8, 5, 'intermediate',
  'linear-gradient(135deg, #A855F7, #EC4899)',
  400.00, 0, 1
),
(
  'Emotional Intelligence at Work',
  'emotional-intelligence-at-work',
  'Build self-awareness, empathy, and social skills that drive professional success. This programme helps you understand and manage your emotions, read social dynamics, and build stronger workplace relationships that lead to better collaboration and career advancement.',
  'Build self-awareness, empathy, and social skills that drive professional success.',
  'Emotional Intelligence',
  8, 4, 'beginner',
  'linear-gradient(135deg, #10B981, #14B8A6)',
  350.00, 0, 1
),
(
  'High-Performance Team Building',
  'high-performance-team-building',
  'Create cohesive, motivated teams that consistently deliver exceptional results. From forming and storming to performing, this programme provides actionable frameworks for building trust, establishing shared goals, and fostering a culture of accountability and mutual support.',
  'Create cohesive, motivated teams that consistently deliver exceptional results.',
  'Team Building',
  14, 6, 'advanced',
  'linear-gradient(135deg, #F97316, #EF4444)',
  520.00, 1, 1
),
(
  'Strategic Negotiation Skills',
  'strategic-negotiation-skills',
  'Negotiate with confidence and achieve win-win outcomes in any professional scenario. Learn the psychology of negotiation, preparation strategies, and tactical approaches that will help you close deals, resolve disputes, and create value in every interaction.',
  'Negotiate with confidence — achieve win-win outcomes in any professional scenario.',
  'Communication',
  6, 4, 'intermediate',
  'linear-gradient(135deg, #6366F1, #8B5CF6)',
  320.00, 0, 1
);

-- MODULES: Leadership Essentials (programme_id = 1)
INSERT INTO modules (programme_id, title, description, order_index, duration_minutes, content_type, content_text) VALUES
(1, 'Understanding Your Leadership Style', 'Discover your natural leadership tendencies through self-assessment tools and reflective exercises.', 1, 25, 'video', 'Every great leader starts with self-awareness. In this module, you will explore the major leadership styles — transformational, servant, democratic, and situational — and discover which resonates most with your natural approach.'),
(1, 'Building Trust & Psychological Safety', 'Explore the foundations of trust in teams and learn how to create an environment where people feel safe to take risks.', 2, 30, 'video', 'Trust is the currency of effective leadership. Research by Google''s Project Aristotle revealed that psychological safety is the number one predictor of high-performing teams.'),
(1, 'Situational Leadership in Practice', 'Learn to adapt your leadership approach based on team maturity, task complexity, and individual needs.', 3, 35, 'exercise', 'The best leaders are flexible. Hersey and Blanchard''s Situational Leadership model teaches us that no single leadership style works in every situation.'),
(1, 'Decision Making Under Pressure', 'Develop frameworks for making sound decisions when stakes are high, information is incomplete, and time is limited.', 4, 20, 'quiz', 'When pressure mounts, decision quality often drops. This module equips you with proven decision-making frameworks including the OODA Loop, the Cynefin Framework, and the Pre-Mortem technique.'),
(1, 'Coaching & Developing Your Team', 'Master the art of coaching conversations that unlock potential, build capability, and drive performance.', 5, 30, 'video', 'Great leaders don''t just direct — they develop. This module introduces the GROW coaching model (Goal, Reality, Options, Will).'),
(1, 'Leading Through Change', 'Navigate organizational change with confidence and empathy.', 6, 40, 'quiz', 'Change is constant in modern business. This final module covers Kotter''s 8-Step Change Model, the ADKAR framework, and practical strategies for leading teams through uncertainty.');

-- MODULES: Effective Communication Mastery (programme_id = 2)
INSERT INTO modules (programme_id, title, description, order_index, duration_minutes, content_type, content_text) VALUES
(2, 'The Foundations of Active Listening', 'Learn the art of truly hearing what others are saying — beyond just words.', 1, 25, 'video', 'Most people listen to reply, not to understand. This module transforms your listening skills through techniques like reflective listening, paraphrasing, and emotional attunement.'),
(2, 'Non-Verbal Communication & Body Language', 'Decode the silent messages that make up 55% of all communication.', 2, 30, 'video', 'Albert Mehrabian''s research suggests that up to 93% of communication is non-verbal.'),
(2, 'Persuasive Presentation Skills', 'Craft and deliver presentations that captivate, persuade, and inspire action.', 3, 35, 'exercise', 'Great presenters are made, not born. This module covers the three pillars of persuasion — ethos, pathos, and logos.'),
(2, 'Navigating Difficult Conversations', 'Develop the courage and skill to address sensitive topics and give constructive feedback.', 4, 25, 'video', 'Avoiding difficult conversations is one of the biggest barriers to team performance.'),
(2, 'Written Communication Excellence', 'Elevate your professional writing — from emails and reports to proposals.', 5, 20, 'quiz', 'In the digital age, written communication is more important than ever.');

-- MODULES: Conflict Resolution & Mediation (programme_id = 3)
INSERT INTO modules (programme_id, title, description, order_index, duration_minutes, content_type, content_text) VALUES
(3, 'Understanding Conflict Dynamics', 'Explore the nature of workplace conflict — its causes, stages, and potential outcomes.', 1, 20, 'video', 'Conflict is natural and, when managed well, can be a catalyst for growth.'),
(3, 'Communication Strategies for De-escalation', 'Master verbal and non-verbal techniques that calm tensions.', 2, 25, 'video', 'When emotions run high, communication skills make the difference between resolution and escalation.'),
(3, 'Mediation Fundamentals', 'Learn the step-by-step mediation process.', 3, 30, 'exercise', 'Mediation is a structured process for resolving disputes.'),
(3, 'Restorative Practices in the Workplace', 'Discover restorative approaches that repair relationships.', 4, 25, 'video', 'Resolution is not enough — restoration is the goal.'),
(3, 'Building a Conflict-Resilient Team Culture', 'Design team norms and systems that prevent destructive conflict.', 5, 20, 'quiz', 'The best teams don''t avoid conflict — they manage it well.');

-- MODULES: Emotional Intelligence at Work (programme_id = 4)
INSERT INTO modules (programme_id, title, description, order_index, duration_minutes, content_type, content_text) VALUES
(4, 'Self-Awareness: Know Your Emotional Landscape', 'Develop deep self-awareness by understanding your emotional triggers.', 1, 30, 'video', 'Emotional intelligence begins with self-awareness.'),
(4, 'Self-Regulation & Emotional Agility', 'Learn techniques for managing intense emotions and building resilience.', 2, 25, 'video', 'The ability to pause between stimulus and response is a superpower.'),
(4, 'Empathy & Social Awareness', 'Strengthen your ability to understand others'' perspectives.', 3, 25, 'exercise', 'Empathy is the bridge between understanding yourself and understanding others.'),
(4, 'Relationship Management & Influence', 'Apply emotional intelligence to build stronger relationships.', 4, 20, 'quiz', 'The ultimate expression of emotional intelligence is its application in relationships.');

-- MODULES: High-Performance Team Building (programme_id = 5)
INSERT INTO modules (programme_id, title, description, order_index, duration_minutes, content_type, content_text) VALUES
(5, 'The Science of High-Performing Teams', 'Explore research-backed models of team effectiveness.', 1, 30, 'video', 'What separates good teams from great ones?'),
(5, 'Defining Purpose, Roles & Shared Goals', 'Align your team around a compelling purpose.', 2, 25, 'video', 'Teams without clear purpose drift.'),
(5, 'Building Trust Through Vulnerability', 'Create the psychological safety needed for team members to be authentic.', 3, 30, 'exercise', 'Vulnerability is not weakness — it''s the birthplace of trust.'),
(5, 'Productive Conflict & Healthy Debate', 'Transform destructive conflict into productive ideological debate.', 4, 25, 'video', 'Teams that avoid conflict produce mediocre results.'),
(5, 'Accountability & Commitment', 'Establish systems for mutual accountability.', 5, 25, 'video', 'Accountability is not about blame — it''s about commitment to shared standards.'),
(5, 'Sustaining High Performance', 'Learn to maintain momentum and celebrate wins.', 6, 35, 'quiz', 'High performance is not a destination — it''s a continuous journey.');

-- MODULES: Strategic Negotiation Skills (programme_id = 6)
INSERT INTO modules (programme_id, title, description, order_index, duration_minutes, content_type, content_text) VALUES
(6, 'The Psychology of Negotiation', 'Understand the cognitive biases and psychological principles that influence negotiation.', 1, 25, 'video', 'Negotiation is as much about psychology as it is about strategy.'),
(6, 'Preparation & Strategy Development', 'Master the art of negotiation preparation — from BATNA analysis to interest mapping.', 2, 20, 'video', 'The outcome of a negotiation is often determined before it begins.'),
(6, 'Tactical Negotiation Techniques', 'Learn proven tactics for creating value and making concessions strategically.', 3, 25, 'exercise', 'Great negotiators create value before claiming it.'),
(6, 'Advanced Scenarios & Final Assessment', 'Apply your negotiation skills to complex multi-party scenarios.', 4, 20, 'quiz', 'The ultimate test of negotiation skill is performance under pressure.');

-- USERS
INSERT INTO users (email, password, name, role, company_id, job_title, department, created_at) VALUES
('priya.sharma@rogers.mu', 'demo123', 'Priya Sharma', 'learner', 1, 'Senior Analyst', 'Finance', '2024-02-01'),
('hr.admin@rogers.mu', 'demo123', 'Anil Doorgakant', 'hr_admin', 1, 'HR Director', 'Human Resources', '2024-01-15'),
('admin@climaxacademy.mu', 'demo123', 'Climax Admin', 'climax_admin', NULL, 'Platform Administrator', 'Administration', '2024-01-01'),
('rajesh.patel@rogers.mu', 'demo123', 'Rajesh Patel', 'learner', 1, 'Team Lead', 'Operations', '2024-02-15'),
('marie.claire@rogers.mu', 'demo123', 'Marie Claire Dupont', 'learner', 1, 'Marketing Manager', 'Marketing', '2024-03-01'),
('dev.naidoo@rogers.mu', 'demo123', 'Devanand Naidoo', 'learner', 1, 'Project Manager', 'IT', '2024-02-20'),
('sarah.jeannot@rogers.mu', 'demo123', 'Sarah Jeannot', 'learner', 1, 'Customer Relations Lead', 'Client Services', '2024-03-15'),
('vikram.singh@ibl.mu', 'demo123', 'Vikram Singh', 'learner', 2, 'Operations Director', 'Operations', '2024-02-10'),
('nadia.ramgoolam@ibl.mu', 'demo123', 'Nadia Ramgoolam', 'learner', 2, 'Team Lead', 'Supply Chain', '2024-03-05'),
('hr.admin@ibl.mu', 'demo123', 'Fatima Jeetun', 'hr_admin', 2, 'Head of L&D', 'Human Resources', '2024-02-01'),
('ashwin.currimjee@currimjee.mu', 'demo123', 'Ashwin Doorgakant', 'learner', 3, 'Business Analyst', 'Strategy', '2024-04-01'),
('kavita.boolell@currimjee.mu', 'demo123', 'Kavita Boolell', 'learner', 3, 'HR Manager', 'Human Resources', '2024-04-10'),
('jean.michel@harelmallac.mu', 'demo123', 'Jean-Michel Lafleur', 'learner', 4, 'Production Supervisor', 'Manufacturing', '2024-04-20'),
('anisha.gopee@harelmallac.mu', 'demo123', 'Anisha Gopee', 'learner', 4, 'Quality Manager', 'Quality Assurance', '2024-05-01'),
('kevin.wong@ceridian.mu', 'demo123', 'Kevin Wong', 'learner', 5, 'Software Engineer', 'Engineering', '2024-05-25'),
('meera.devi@ceridian.mu', 'demo123', 'Meera Doongoor', 'learner', 5, 'UX Designer', 'Product', '2024-06-01'),
('yannick.ah-kee@mcb.mu', 'demo123', 'Yannick Ah-Kee', 'learner', 6, 'Branch Manager', 'Retail Banking', '2024-01-20'),
('sunita.ramsurrun@mcb.mu', 'demo123', 'Sunita Ramsurrun', 'learner', 6, 'Risk Analyst', 'Risk Management', '2024-02-05'),
('hr.admin@mcb.mu', 'demo123', 'Philippe Noel', 'hr_admin', 6, 'Chief People Officer', 'Human Resources', '2024-01-10');

-- ENROLLMENTS
INSERT INTO enrollments (user_id, programme_id, enrolled_at, status, completion_pct, completed_at) VALUES
(1, 1, '2024-03-01', 'in_progress', 83.3, NULL),
(1, 2, '2024-04-15', 'in_progress', 40.0, NULL),
(1, 4, '2024-02-15', 'completed', 100.0, '2024-04-20'),
(4, 1, '2024-02-20', 'completed', 100.0, '2024-05-10'),
(4, 5, '2024-06-01', 'in_progress', 33.3, NULL),
(5, 2, '2024-03-15', 'completed', 100.0, '2024-06-01'),
(5, 6, '2024-07-01', 'in_progress', 50.0, NULL),
(6, 1, '2024-03-10', 'in_progress', 66.7, NULL),
(6, 4, '2024-05-01', 'in_progress', 25.0, NULL),
(7, 3, '2024-04-01', 'completed', 100.0, '2024-06-15'),
(7, 2, '2024-06-20', 'in_progress', 60.0, NULL),
(8, 1, '2024-02-15', 'completed', 100.0, '2024-04-30'),
(8, 5, '2024-05-15', 'in_progress', 66.7, NULL),
(9, 4, '2024-04-01', 'in_progress', 75.0, NULL),
(9, 2, '2024-06-01', 'in_progress', 20.0, NULL),
(11, 6, '2024-05-01', 'completed', 100.0, '2024-06-20'),
(12, 1, '2024-05-10', 'in_progress', 50.0, NULL),
(12, 3, '2024-06-01', 'in_progress', 40.0, NULL),
(13, 5, '2024-05-20', 'in_progress', 50.0, NULL),
(14, 4, '2024-05-15', 'completed', 100.0, '2024-07-10'),
(14, 1, '2024-07-15', 'in_progress', 33.3, NULL),
(15, 2, '2024-06-10', 'in_progress', 80.0, NULL),
(16, 4, '2024-06-15', 'in_progress', 50.0, NULL),
(17, 1, '2024-01-25', 'completed', 100.0, '2024-04-15'),
(17, 6, '2024-05-01', 'in_progress', 75.0, NULL),
(18, 3, '2024-03-01', 'in_progress', 60.0, NULL),
(18, 4, '2024-07-01', 'not_started', 0.0, NULL);

-- MODULE PROGRESS for Priya (user 1)
INSERT INTO module_progress (user_id, module_id, enrollment_id, status, started_at, completed_at, quiz_score, time_spent_minutes) VALUES
(1, 1, 1, 'completed', '2024-03-01', '2024-03-05', NULL, 28),
(1, 2, 1, 'completed', '2024-03-06', '2024-03-10', NULL, 35),
(1, 3, 1, 'completed', '2024-03-12', '2024-03-18', NULL, 40),
(1, 4, 1, 'completed', '2024-03-20', '2024-03-22', 85.0, 25),
(1, 5, 1, 'completed', '2024-03-25', '2024-03-30', NULL, 32),
(1, 6, 1, 'in_progress', '2024-04-02', NULL, NULL, 15),
(1, 7, 2, 'completed', '2024-04-15', '2024-04-18', NULL, 28),
(1, 8, 2, 'completed', '2024-04-20', '2024-04-25', NULL, 33),
(1, 9, 2, 'in_progress', '2024-04-28', NULL, NULL, 10),
(1, 10, 2, 'locked', NULL, NULL, NULL, 0),
(1, 11, 2, 'locked', NULL, NULL, NULL, 0),
(1, 17, 3, 'completed', '2024-02-15', '2024-02-22', NULL, 32),
(1, 18, 3, 'completed', '2024-02-25', '2024-03-02', NULL, 28),
(1, 19, 3, 'completed', '2024-03-05', '2024-03-12', NULL, 30),
(1, 20, 3, 'completed', '2024-03-15', '2024-04-20', 92.0, 25);

-- CERTIFICATES
INSERT INTO certificates (user_id, programme_id, enrollment_id, certificate_number, issued_at, valid_until) VALUES
(1, 4, 3, 'CLX-2024-0001', '2024-04-20', '2026-04-20'),
(4, 1, 4, 'CLX-2024-0002', '2024-05-10', '2026-05-10'),
(5, 2, 6, 'CLX-2024-0003', '2024-06-01', '2026-06-01'),
(7, 3, 10, 'CLX-2024-0004', '2024-06-15', '2026-06-15'),
(8, 1, 12, 'CLX-2024-0005', '2024-04-30', '2026-04-30'),
(11, 6, 16, 'CLX-2024-0006', '2024-06-20', '2026-06-20'),
(14, 4, 20, 'CLX-2024-0007', '2024-07-10', '2026-07-10'),
(17, 1, 24, 'CLX-2024-0008', '2024-04-15', '2026-04-15');

-- QUIZ QUESTIONS
INSERT INTO quiz_questions (module_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(4, 'Which framework is best suited for categorizing problems based on their complexity level?', 'SWOT Analysis', 'Cynefin Framework', 'Balanced Scorecard', 'Porter''s Five Forces', 'b', 'The Cynefin Framework helps leaders categorize situations as Simple, Complicated, Complex, or Chaotic.'),
(4, 'What is the primary purpose of a pre-mortem exercise?', 'To celebrate past successes', 'To identify potential failure points before they occur', 'To assign blame after a project fails', 'To create detailed project timelines', 'b', 'A pre-mortem imagines that a project has already failed and works backward to identify what could cause that failure.'),
(4, 'In the OODA Loop, what does the second O stand for?', 'Optimize', 'Orient', 'Organize', 'Operate', 'b', 'OODA stands for Observe, Orient, Decide, Act.'),
(6, 'According to Kotter''s model, what is the first step in leading change?', 'Form a guiding coalition', 'Create a sense of urgency', 'Develop a vision', 'Communicate the change vision', 'b', 'Kotter''s 8-Step model begins with creating a sense of urgency.'),
(6, 'What does the ''A'' in the ADKAR change model stand for?', 'Action', 'Awareness', 'Alignment', 'Accountability', 'b', 'ADKAR stands for Awareness, Desire, Knowledge, Ability, and Reinforcement.'),
(6, 'Which of the following is a common reason change initiatives fail?', 'Too much communication about the change', 'Declaring victory too soon', 'Involving too many stakeholders', 'Having too clear a vision', 'b', 'Kotter identifies declaring victory too soon as one of the biggest mistakes in change management.'),
(11, 'What is the recommended structure for a professional email requesting action?', 'Long introduction, details, then request', 'Request first, then context and details', 'Only the request with no context', 'Personal greeting, small talk, then request', 'b', 'Leading with the request ensures the recipient understands the purpose immediately.'),
(11, 'Which writing principle emphasizes removing unnecessary words?', 'Elaboration', 'Conciseness', 'Formality', 'Creativity', 'b', 'Conciseness means expressing ideas clearly using the fewest words necessary.'),
(16, 'What is the primary benefit of establishing team norms for conflict?', 'It eliminates all disagreements', 'It provides agreed-upon guidelines for handling disputes', 'It prevents team members from speaking up', 'It creates hierarchical authority', 'b', 'Team norms create shared expectations for how conflicts will be addressed.'),
(16, 'Which conflict style involves high assertiveness AND high cooperation?', 'Avoiding', 'Competing', 'Collaborating', 'Accommodating', 'c', 'Collaborating combines high assertiveness with high cooperation, aiming for win-win solutions.'),
(20, 'What is the foundation of influence without authority?', 'Position power', 'Trust and credibility', 'Financial incentives', 'Formal reporting lines', 'b', 'Influence without authority relies on building trust and demonstrating expertise.'),
(20, 'Which EI competency involves understanding others'' perspectives?', 'Self-awareness', 'Self-regulation', 'Empathy', 'Motivation', 'c', 'Empathy is the EI competency focused on understanding others'' feelings and perspectives.'),
(26, 'What is the primary purpose of a team retrospective?', 'To assign blame for failures', 'To reflect on what worked well and what to improve', 'To set next quarter''s targets', 'To evaluate individual performance', 'b', 'Retrospectives create structured reflection time for teams.'),
(26, 'According to Lencioni, what is the ultimate dysfunction of a team?', 'Absence of trust', 'Fear of conflict', 'Inattention to results', 'Lack of commitment', 'c', 'Inattention to Results sits at the top as the ultimate dysfunction.'),
(30, 'What does BATNA stand for in negotiation?', 'Best Alternative To a Negotiated Agreement', 'Basic Approach To Negotiation Analysis', 'Bilateral Agreement Through Neutral Arbitration', 'Best Attempt To Navigate Arguments', 'a', 'BATNA represents your fallback option if negotiations fail.'),
(30, 'In integrative bargaining, the primary goal is to:', 'Win at the other party''s expense', 'Create value for all parties involved', 'Reach a quick compromise', 'Avoid making any concessions', 'b', 'Integrative bargaining focuses on expanding the pie so all parties gain value.');
