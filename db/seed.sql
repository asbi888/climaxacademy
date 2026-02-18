-- =============================================
-- CLIMAX ACADEMY SEED DATA
-- Realistic Mauritius corporate training data
-- =============================================

-- =============================================
-- COMPANIES
-- =============================================
INSERT INTO companies (name, industry, employee_count, plan_tier, created_at) VALUES
('Rogers Capital Ltd', 'Financial Services', 2500, 'premium', '2024-01-15'),
('IBL Group', 'Conglomerate', 3000, 'premium', '2024-02-01'),
('Currimjee Jeewanjee & Co', 'Diversified', 1800, 'standard', '2024-03-10'),
('Harel Mallac & Co', 'Industrial', 1200, 'standard', '2024-04-05'),
('Ceridian Mauritius', 'Technology / HR', 600, 'starter', '2024-05-20'),
('MCB Group', 'Banking', 3500, 'premium', '2024-01-08');

-- =============================================
-- PROGRAMMES
-- =============================================
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

-- =============================================
-- MODULES
-- =============================================

-- Leadership Essentials (programme_id = 1)
INSERT INTO modules (programme_id, title, description, order_index, duration_minutes, content_type, content_text) VALUES
(1, 'Understanding Your Leadership Style', 'Discover your natural leadership tendencies through self-assessment tools and reflective exercises. Learn about different leadership archetypes and identify your strengths and growth areas as a leader.', 1, 25, 'video', 'Every great leader starts with self-awareness. In this module, you will explore the major leadership styles — transformational, servant, democratic, and situational — and discover which resonates most with your natural approach. Through guided self-assessment exercises, you will map your leadership DNA and create a personal development roadmap.'),
(1, 'Building Trust & Psychological Safety', 'Explore the foundations of trust in teams and learn how to create an environment where people feel safe to take risks, speak up, and bring their best selves to work.', 2, 30, 'video', 'Trust is the currency of effective leadership. Research by Google''s Project Aristotle revealed that psychological safety is the number one predictor of high-performing teams. In this module, you will learn practical techniques for building trust, encouraging vulnerability, and creating spaces where innovation thrives.'),
(1, 'Situational Leadership in Practice', 'Learn to adapt your leadership approach based on team maturity, task complexity, and individual needs. Practice applying different leadership styles through real-world scenarios.', 3, 35, 'exercise', 'The best leaders are flexible. Hersey and Blanchard''s Situational Leadership model teaches us that no single leadership style works in every situation. In this module, you will practice diagnosing team readiness levels and selecting the appropriate leadership response — from directing to delegating.'),
(1, 'Decision Making Under Pressure', 'Develop frameworks for making sound decisions when stakes are high, information is incomplete, and time is limited. Learn from case studies of leaders who navigated crisis effectively.', 4, 20, 'quiz', 'When pressure mounts, decision quality often drops. This module equips you with proven decision-making frameworks including the OODA Loop, the Cynefin Framework, and the Pre-Mortem technique. You will analyze real crisis scenarios and practice making high-stakes decisions with confidence.'),
(1, 'Coaching & Developing Your Team', 'Master the art of coaching conversations that unlock potential, build capability, and drive performance. Learn the GROW model and other coaching frameworks.', 5, 30, 'video', 'Great leaders don''t just direct — they develop. This module introduces the GROW coaching model (Goal, Reality, Options, Will) and teaches you how to have powerful coaching conversations that help team members find their own solutions and accelerate their growth.'),
(1, 'Leading Through Change', 'Navigate organizational change with confidence and empathy. Learn change management frameworks and how to maintain team morale and productivity during transitions.', 6, 40, 'quiz', 'Change is constant in modern business. This final module covers Kotter''s 8-Step Change Model, the ADKAR framework, and practical strategies for leading teams through uncertainty. You will develop a personal change leadership toolkit and complete your final assessment.');

-- Effective Communication Mastery (programme_id = 2)
INSERT INTO modules (programme_id, title, description, order_index, duration_minutes, content_type, content_text) VALUES
(2, 'The Foundations of Active Listening', 'Learn the art of truly hearing what others are saying — beyond just words. Master techniques for empathetic listening that builds connection and understanding.', 1, 25, 'video', 'Most people listen to reply, not to understand. This module transforms your listening skills through techniques like reflective listening, paraphrasing, and emotional attunement. You will practice exercises that sharpen your ability to hear both the spoken and unspoken messages.'),
(2, 'Non-Verbal Communication & Body Language', 'Decode the silent messages that make up 55% of all communication. Learn to read body language, manage your own non-verbal signals, and build rapport through presence.', 2, 30, 'video', 'Albert Mehrabian''s research suggests that up to 93% of communication is non-verbal. In this module, you will learn to read micro-expressions, understand cultural differences in body language, and project confidence and openness through your own physical presence.'),
(2, 'Persuasive Presentation Skills', 'Craft and deliver presentations that captivate, persuade, and inspire action. Learn storytelling techniques, slide design principles, and stage presence fundamentals.', 3, 35, 'exercise', 'Great presenters are made, not born. This module covers the three pillars of persuasion — ethos, pathos, and logos — and teaches you to structure compelling narratives, design visual aids that support your message, and deliver with confidence and authenticity.'),
(2, 'Navigating Difficult Conversations', 'Develop the courage and skill to address sensitive topics, give constructive feedback, and manage emotionally charged discussions with grace and effectiveness.', 4, 25, 'video', 'Avoiding difficult conversations is one of the biggest barriers to team performance. This module provides frameworks for preparing, initiating, and navigating tough discussions — from performance feedback to interpersonal conflicts — while maintaining respect and achieving positive outcomes.'),
(2, 'Written Communication Excellence', 'Elevate your professional writing — from emails and reports to proposals and presentations. Learn to write with clarity, purpose, and impact.', 5, 20, 'quiz', 'In the digital age, written communication is more important than ever. This module covers the principles of clear, concise business writing, email etiquette, report structuring, and proposal writing. Complete the final assessment to demonstrate your communication mastery.');

-- Conflict Resolution & Mediation (programme_id = 3)
INSERT INTO modules (programme_id, title, description, order_index, duration_minutes, content_type, content_text) VALUES
(3, 'Understanding Conflict Dynamics', 'Explore the nature of workplace conflict — its causes, stages, and potential outcomes. Learn to identify conflict early and understand the emotions that fuel it.', 1, 20, 'video', 'Conflict is natural and, when managed well, can be a catalyst for growth. This module explores Thomas-Kilmann''s Conflict Mode Instrument, the stages of conflict escalation, and the emotional underpinnings that turn disagreements into disputes.'),
(3, 'Communication Strategies for De-escalation', 'Master verbal and non-verbal techniques that calm tensions, validate emotions, and create space for productive dialogue when conflicts arise.', 2, 25, 'video', 'When emotions run high, communication skills make the difference between resolution and escalation. Learn the power of "I" statements, validation techniques, and emotional labelling to de-escalate heated situations and create openings for constructive conversation.'),
(3, 'Mediation Fundamentals', 'Learn the step-by-step mediation process and how to serve as a neutral third party who helps conflicting parties find mutually acceptable solutions.', 3, 30, 'exercise', 'Mediation is a structured process for resolving disputes. In this module, you will learn the six stages of mediation — from opening statements to agreement writing — and practice facilitating mock mediations with realistic workplace scenarios.'),
(3, 'Restorative Practices in the Workplace', 'Discover restorative approaches that repair relationships, rebuild trust, and create lasting positive change after conflicts have occurred.', 4, 25, 'video', 'Resolution is not enough — restoration is the goal. This module introduces restorative justice principles adapted for the workplace, including restorative circles, accountability conversations, and relationship repair techniques.'),
(3, 'Building a Conflict-Resilient Team Culture', 'Design team norms and systems that prevent destructive conflict and channel disagreements into innovation and stronger collaboration.', 5, 20, 'quiz', 'The best teams don''t avoid conflict — they manage it well. This final module helps you create team agreements, feedback systems, and communication protocols that build resilience and turn potential conflicts into opportunities for growth.');

-- Emotional Intelligence at Work (programme_id = 4)
INSERT INTO modules (programme_id, title, description, order_index, duration_minutes, content_type, content_text) VALUES
(4, 'Self-Awareness: Know Your Emotional Landscape', 'Develop deep self-awareness by understanding your emotional triggers, patterns, and the impact of your emotions on your behaviour and decision-making.', 1, 30, 'video', 'Emotional intelligence begins with self-awareness. In this module, you will learn to identify and name your emotions with precision, understand your emotional triggers, and recognize how your emotional state influences your thinking, behaviour, and relationships at work.'),
(4, 'Self-Regulation & Emotional Agility', 'Learn techniques for managing intense emotions, building resilience, and responding thoughtfully rather than reacting impulsively in challenging situations.', 2, 25, 'video', 'The ability to pause between stimulus and response is a superpower. This module teaches mindfulness techniques, cognitive reframing, and emotional regulation strategies that help you maintain composure and make better decisions under pressure.'),
(4, 'Empathy & Social Awareness', 'Strengthen your ability to understand others perspectives, read social dynamics, and navigate the emotional landscape of teams and organizations.', 3, 25, 'exercise', 'Empathy is the bridge between understanding yourself and understanding others. In this module, you will practice perspective-taking exercises, learn to read emotional undercurrents in group settings, and develop the social awareness needed to navigate complex workplace dynamics.'),
(4, 'Relationship Management & Influence', 'Apply emotional intelligence to build stronger relationships, resolve conflicts, inspire others, and create positive influence in your professional network.', 4, 20, 'quiz', 'The ultimate expression of emotional intelligence is its application in relationships. This final module covers influence without authority, building coalition, navigating office politics with integrity, and creating a network of meaningful professional relationships.');

-- High-Performance Team Building (programme_id = 5)
INSERT INTO modules (programme_id, title, description, order_index, duration_minutes, content_type, content_text) VALUES
(5, 'The Science of High-Performing Teams', 'Explore research-backed models of team effectiveness including Tuckman''s stages, Lencioni''s Five Dysfunctions, and Google''s Project Aristotle findings.', 1, 30, 'video', 'What separates good teams from great ones? This module examines the latest research on team effectiveness, from Bruce Tuckman''s forming-storming-norming-performing model to Patrick Lencioni''s Five Dysfunctions framework and Google''s groundbreaking Project Aristotle study.'),
(5, 'Defining Purpose, Roles & Shared Goals', 'Align your team around a compelling purpose, clarify individual roles, and establish shared goals that drive motivation and accountability.', 2, 25, 'video', 'Teams without clear purpose drift. This module provides tools for crafting a team charter, defining roles using the RACI framework, and setting OKRs (Objectives and Key Results) that create alignment and energize your team toward shared outcomes.'),
(5, 'Building Trust Through Vulnerability', 'Create the psychological safety needed for team members to be authentic, take risks, and support each other through challenges and setbacks.', 3, 30, 'exercise', 'Vulnerability is not weakness — it''s the birthplace of trust. In this module, you will participate in trust-building exercises, learn facilitation techniques for creating safe spaces, and develop practices that encourage openness and mutual support within your team.'),
(5, 'Productive Conflict & Healthy Debate', 'Transform destructive conflict into productive ideological debate that drives innovation, better decisions, and stronger team alignment.', 4, 25, 'video', 'Teams that avoid conflict produce mediocre results. This module teaches the difference between destructive personal conflict and productive ideological debate, and provides frameworks for facilitating healthy disagreements that lead to better outcomes.'),
(5, 'Accountability & Commitment', 'Establish systems for mutual accountability that drive follow-through, maintain high standards, and create a culture where team members hold each other to their best.', 5, 25, 'video', 'Accountability is not about blame — it''s about commitment to shared standards. This module covers peer accountability frameworks, the commitment cascade, and practical tools for creating a culture where team members willingly hold each other to high standards.'),
(5, 'Sustaining High Performance', 'Learn to maintain momentum, celebrate wins, navigate team transitions, and continuously evolve your team''s performance over time.', 6, 35, 'quiz', 'High performance is not a destination — it''s a continuous journey. This final module covers team retrospectives, celebration rituals, managing team transitions, and building the adaptive capacity needed to sustain excellence. Complete your final assessment to earn your certificate.');

-- Strategic Negotiation Skills (programme_id = 6)
INSERT INTO modules (programme_id, title, description, order_index, duration_minutes, content_type, content_text) VALUES
(6, 'The Psychology of Negotiation', 'Understand the cognitive biases, emotional drivers, and psychological principles that influence negotiation outcomes. Learn to recognize and leverage these dynamics.', 1, 25, 'video', 'Negotiation is as much about psychology as it is about strategy. This module explores anchoring bias, loss aversion, the endowment effect, and other cognitive biases that shape negotiation behaviour. Understanding these dynamics gives you a significant advantage at the negotiation table.'),
(6, 'Preparation & Strategy Development', 'Master the art of negotiation preparation — from BATNA analysis to interest mapping. Learn to enter every negotiation with a clear strategy and contingency plans.', 2, 20, 'video', 'The outcome of a negotiation is often determined before it begins. This module teaches the preparation framework used by elite negotiators: defining your BATNA (Best Alternative to Negotiated Agreement), mapping interests vs. positions, and developing a negotiation strategy canvas.'),
(6, 'Tactical Negotiation Techniques', 'Learn proven tactics for creating value, making concessions strategically, and managing the negotiation process from opening to closing.', 3, 25, 'exercise', 'Great negotiators create value before claiming it. This module covers integrative bargaining techniques, strategic concession-making, the power of silence, and closing techniques that secure agreements while preserving relationships.'),
(6, 'Advanced Scenarios & Final Assessment', 'Apply your negotiation skills to complex multi-party scenarios, cross-cultural negotiations, and high-stakes situations. Complete your final assessment.', 4, 20, 'quiz', 'The ultimate test of negotiation skill is performance under pressure. This final module presents complex negotiation scenarios involving multiple parties, cultural differences, and high stakes. Apply everything you''ve learned and complete the final assessment to earn your certification.');

-- =============================================
-- USERS (15-20 realistic Mauritius names)
-- =============================================

-- Demo accounts first
INSERT INTO users (email, password, name, role, company_id, job_title, department, created_at) VALUES
('priya.sharma@rogers.mu', 'demo123', 'Priya Sharma', 'learner', 1, 'Senior Analyst', 'Finance', '2024-02-01'),
('hr.admin@rogers.mu', 'demo123', 'Anil Doorgakant', 'hr_admin', 1, 'HR Director', 'Human Resources', '2024-01-15'),
('admin@climaxacademy.mu', 'demo123', 'Climax Admin', 'climax_admin', NULL, 'Platform Administrator', 'Administration', '2024-01-01');

-- Rogers Capital employees
INSERT INTO users (email, password, name, role, company_id, job_title, department, created_at) VALUES
('rajesh.patel@rogers.mu', 'demo123', 'Rajesh Patel', 'learner', 1, 'Team Lead', 'Operations', '2024-02-15'),
('marie.claire@rogers.mu', 'demo123', 'Marie Claire Dupont', 'learner', 1, 'Marketing Manager', 'Marketing', '2024-03-01'),
('dev.naidoo@rogers.mu', 'demo123', 'Devanand Naidoo', 'learner', 1, 'Project Manager', 'IT', '2024-02-20'),
('sarah.jeannot@rogers.mu', 'demo123', 'Sarah Jeannot', 'learner', 1, 'Customer Relations Lead', 'Client Services', '2024-03-15');

-- IBL Group employees
INSERT INTO users (email, password, name, role, company_id, job_title, department, created_at) VALUES
('vikram.singh@ibl.mu', 'demo123', 'Vikram Singh', 'learner', 2, 'Operations Director', 'Operations', '2024-02-10'),
('nadia.ramgoolam@ibl.mu', 'demo123', 'Nadia Ramgoolam', 'learner', 2, 'Team Lead', 'Supply Chain', '2024-03-05'),
('hr.admin@ibl.mu', 'demo123', 'Fatima Jeetun', 'hr_admin', 2, 'Head of L&D', 'Human Resources', '2024-02-01');

-- Currimjee employees
INSERT INTO users (email, password, name, role, company_id, job_title, department, created_at) VALUES
('ashwin.currimjee@currimjee.mu', 'demo123', 'Ashwin Doorgakant', 'learner', 3, 'Business Analyst', 'Strategy', '2024-04-01'),
('kavita.boolell@currimjee.mu', 'demo123', 'Kavita Boolell', 'learner', 3, 'HR Manager', 'Human Resources', '2024-04-10');

-- Harel Mallac employees
INSERT INTO users (email, password, name, role, company_id, job_title, department, created_at) VALUES
('jean.michel@harelmallac.mu', 'demo123', 'Jean-Michel Lafleur', 'learner', 4, 'Production Supervisor', 'Manufacturing', '2024-04-20'),
('anisha.gopee@harelmallac.mu', 'demo123', 'Anisha Gopee', 'learner', 4, 'Quality Manager', 'Quality Assurance', '2024-05-01');

-- Ceridian employees
INSERT INTO users (email, password, name, role, company_id, job_title, department, created_at) VALUES
('kevin.wong@ceridian.mu', 'demo123', 'Kevin Wong', 'learner', 5, 'Software Engineer', 'Engineering', '2024-05-25'),
('meera.devi@ceridian.mu', 'demo123', 'Meera Doongoor', 'learner', 5, 'UX Designer', 'Product', '2024-06-01');

-- MCB Group employees
INSERT INTO users (email, password, name, role, company_id, job_title, department, created_at) VALUES
('yannick.ah-kee@mcb.mu', 'demo123', 'Yannick Ah-Kee', 'learner', 6, 'Branch Manager', 'Retail Banking', '2024-01-20'),
('sunita.ramsurrun@mcb.mu', 'demo123', 'Sunita Ramsurrun', 'learner', 6, 'Risk Analyst', 'Risk Management', '2024-02-05'),
('hr.admin@mcb.mu', 'demo123', 'Philippe Noel', 'hr_admin', 6, 'Chief People Officer', 'Human Resources', '2024-01-10');

-- =============================================
-- ENROLLMENTS (varied completion)
-- =============================================

-- Priya Sharma (user 1) - enrolled in Leadership (85%), Communication (45%), EI (100%)
INSERT INTO enrollments (user_id, programme_id, enrolled_at, status, completion_pct, completed_at) VALUES
(1, 1, '2024-03-01', 'in_progress', 83.3, NULL),
(1, 2, '2024-04-15', 'in_progress', 40.0, NULL),
(1, 4, '2024-02-15', 'completed', 100.0, '2024-04-20');

-- Rajesh Patel (user 4) - enrolled in Leadership (100%), Team Building (33%)
INSERT INTO enrollments (user_id, programme_id, enrolled_at, status, completion_pct, completed_at) VALUES
(4, 1, '2024-02-20', 'completed', 100.0, '2024-05-10'),
(4, 5, '2024-06-01', 'in_progress', 33.3, NULL);

-- Marie Claire (user 5) - enrolled in Communication (100%), Negotiation (50%)
INSERT INTO enrollments (user_id, programme_id, enrolled_at, status, completion_pct, completed_at) VALUES
(5, 2, '2024-03-15', 'completed', 100.0, '2024-06-01'),
(5, 6, '2024-07-01', 'in_progress', 50.0, NULL);

-- Dev Naidoo (user 6) - enrolled in Leadership (67%), EI (25%)
INSERT INTO enrollments (user_id, programme_id, enrolled_at, status, completion_pct, completed_at) VALUES
(6, 1, '2024-03-10', 'in_progress', 66.7, NULL),
(6, 4, '2024-05-01', 'in_progress', 25.0, NULL);

-- Sarah Jeannot (user 7) - enrolled in Conflict Resolution (100%), Communication (60%)
INSERT INTO enrollments (user_id, programme_id, enrolled_at, status, completion_pct, completed_at) VALUES
(7, 3, '2024-04-01', 'completed', 100.0, '2024-06-15'),
(7, 2, '2024-06-20', 'in_progress', 60.0, NULL);

-- Vikram Singh (user 8) - enrolled in Leadership (100%), Team Building (67%)
INSERT INTO enrollments (user_id, programme_id, enrolled_at, status, completion_pct, completed_at) VALUES
(8, 1, '2024-02-15', 'completed', 100.0, '2024-04-30'),
(8, 5, '2024-05-15', 'in_progress', 66.7, NULL);

-- Nadia Ramgoolam (user 9) - enrolled in EI (75%), Communication (20%)
INSERT INTO enrollments (user_id, programme_id, enrolled_at, status, completion_pct, completed_at) VALUES
(9, 4, '2024-04-01', 'in_progress', 75.0, NULL),
(9, 2, '2024-06-01', 'in_progress', 20.0, NULL);

-- Ashwin Doorgakant (user 11) - enrolled in Negotiation (100%)
INSERT INTO enrollments (user_id, programme_id, enrolled_at, status, completion_pct, completed_at) VALUES
(11, 6, '2024-05-01', 'completed', 100.0, '2024-06-20');

-- Kavita Boolell (user 12) - enrolled in Leadership (50%), Conflict (40%)
INSERT INTO enrollments (user_id, programme_id, enrolled_at, status, completion_pct, completed_at) VALUES
(12, 1, '2024-05-10', 'in_progress', 50.0, NULL),
(12, 3, '2024-06-01', 'in_progress', 40.0, NULL);

-- Jean-Michel (user 13) - enrolled in Team Building (50%)
INSERT INTO enrollments (user_id, programme_id, enrolled_at, status, completion_pct, completed_at) VALUES
(13, 5, '2024-05-20', 'in_progress', 50.0, NULL);

-- Anisha Gopee (user 14) - enrolled in EI (100%), Leadership (33%)
INSERT INTO enrollments (user_id, programme_id, enrolled_at, status, completion_pct, completed_at) VALUES
(14, 4, '2024-05-15', 'completed', 100.0, '2024-07-10'),
(14, 1, '2024-07-15', 'in_progress', 33.3, NULL);

-- Kevin Wong (user 15) - enrolled in Communication (80%)
INSERT INTO enrollments (user_id, programme_id, enrolled_at, status, completion_pct, completed_at) VALUES
(15, 2, '2024-06-10', 'in_progress', 80.0, NULL);

-- Meera Doongoor (user 16) - enrolled in EI (50%)
INSERT INTO enrollments (user_id, programme_id, enrolled_at, status, completion_pct, completed_at) VALUES
(16, 4, '2024-06-15', 'in_progress', 50.0, NULL);

-- Yannick Ah-Kee (user 17) - enrolled in Leadership (100%), Negotiation (75%)
INSERT INTO enrollments (user_id, programme_id, enrolled_at, status, completion_pct, completed_at) VALUES
(17, 1, '2024-01-25', 'completed', 100.0, '2024-04-15'),
(17, 6, '2024-05-01', 'in_progress', 75.0, NULL);

-- Sunita Ramsurrun (user 18) - enrolled in Conflict (60%), EI (0% not started)
INSERT INTO enrollments (user_id, programme_id, enrolled_at, status, completion_pct, completed_at) VALUES
(18, 3, '2024-03-01', 'in_progress', 60.0, NULL),
(18, 4, '2024-07-01', 'not_started', 0.0, NULL);

-- =============================================
-- MODULE PROGRESS for Priya (user 1)
-- =============================================

-- Leadership (enrollment 1): 5/6 completed
INSERT INTO module_progress (user_id, module_id, enrollment_id, status, started_at, completed_at, quiz_score, time_spent_minutes) VALUES
(1, 1, 1, 'completed', '2024-03-01', '2024-03-05', NULL, 28),
(1, 2, 1, 'completed', '2024-03-06', '2024-03-10', NULL, 35),
(1, 3, 1, 'completed', '2024-03-12', '2024-03-18', NULL, 40),
(1, 4, 1, 'completed', '2024-03-20', '2024-03-22', 85.0, 25),
(1, 5, 1, 'completed', '2024-03-25', '2024-03-30', NULL, 32),
(1, 6, 1, 'in_progress', '2024-04-02', NULL, NULL, 15);

-- Communication (enrollment 2): 2/5 completed
INSERT INTO module_progress (user_id, module_id, enrollment_id, status, started_at, completed_at, quiz_score, time_spent_minutes) VALUES
(1, 7, 2, 'completed', '2024-04-15', '2024-04-18', NULL, 28),
(1, 8, 2, 'completed', '2024-04-20', '2024-04-25', NULL, 33),
(1, 9, 2, 'in_progress', '2024-04-28', NULL, NULL, 10),
(1, 10, 2, 'locked', NULL, NULL, NULL, 0),
(1, 11, 2, 'locked', NULL, NULL, NULL, 0);

-- EI (enrollment 3): 4/4 completed
INSERT INTO module_progress (user_id, module_id, enrollment_id, status, started_at, completed_at, quiz_score, time_spent_minutes) VALUES
(1, 17, 3, 'completed', '2024-02-15', '2024-02-22', NULL, 32),
(1, 18, 3, 'completed', '2024-02-25', '2024-03-02', NULL, 28),
(1, 19, 3, 'completed', '2024-03-05', '2024-03-12', NULL, 30),
(1, 20, 3, 'completed', '2024-03-15', '2024-04-20', 92.0, 25);

-- =============================================
-- CERTIFICATES (for completed enrollments)
-- =============================================
INSERT INTO certificates (user_id, programme_id, enrollment_id, certificate_number, issued_at, valid_until) VALUES
(1, 4, 3, 'CLX-2024-0001', '2024-04-20', '2026-04-20'),
(4, 1, 4, 'CLX-2024-0002', '2024-05-10', '2026-05-10'),
(5, 2, 6, 'CLX-2024-0003', '2024-06-01', '2026-06-01'),
(7, 3, 10, 'CLX-2024-0004', '2024-06-15', '2026-06-15'),
(8, 1, 12, 'CLX-2024-0005', '2024-04-30', '2026-04-30'),
(11, 6, 16, 'CLX-2024-0006', '2024-06-20', '2026-06-20'),
(14, 4, 20, 'CLX-2024-0007', '2024-07-10', '2026-07-10'),
(17, 1, 24, 'CLX-2024-0008', '2024-04-15', '2026-04-15');

-- =============================================
-- QUIZ QUESTIONS
-- =============================================

-- Leadership Module 4: Decision Making Under Pressure (module_id = 4)
INSERT INTO quiz_questions (module_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(4, 'Which framework is best suited for categorizing problems based on their complexity level?', 'SWOT Analysis', 'Cynefin Framework', 'Balanced Scorecard', 'Porter''s Five Forces', 'b', 'The Cynefin Framework, developed by Dave Snowden, helps leaders categorize situations as Simple, Complicated, Complex, or Chaotic to determine the appropriate decision-making approach.'),
(4, 'What is the primary purpose of a pre-mortem exercise?', 'To celebrate past successes', 'To identify potential failure points before they occur', 'To assign blame after a project fails', 'To create detailed project timelines', 'b', 'A pre-mortem imagines that a project has already failed and works backward to identify what could cause that failure, helping teams anticipate and prevent problems.'),
(4, 'In the OODA Loop, what does the second O stand for?', 'Optimize', 'Orient', 'Organize', 'Operate', 'b', 'OODA stands for Observe, Orient, Decide, Act. The Orient phase involves analyzing observations in context of current situation and past experiences.');

-- Leadership Module 6: Leading Through Change (module_id = 6)
INSERT INTO quiz_questions (module_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(6, 'According to Kotter''s model, what is the first step in leading change?', 'Form a guiding coalition', 'Create a sense of urgency', 'Develop a vision', 'Communicate the change vision', 'b', 'Kotter''s 8-Step model begins with creating a sense of urgency to motivate people to take action and recognize the need for change.'),
(6, 'What does the ''A'' in the ADKAR change model stand for?', 'Action', 'Awareness', 'Alignment', 'Accountability', 'b', 'ADKAR stands for Awareness, Desire, Knowledge, Ability, and Reinforcement — representing the stages individuals go through during change.'),
(6, 'Which of the following is a common reason change initiatives fail?', 'Too much communication about the change', 'Declaring victory too soon', 'Involving too many stakeholders', 'Having too clear a vision', 'b', 'Kotter identifies declaring victory too soon as one of the biggest mistakes in change management, as it can kill momentum before changes are fully embedded.');

-- Communication Module 5: Written Communication (module_id = 11)
INSERT INTO quiz_questions (module_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(11, 'What is the recommended structure for a professional email requesting action?', 'Long introduction, details, then request', 'Request first, then context and details', 'Only the request with no context', 'Personal greeting, small talk, then request', 'b', 'Leading with the request or key message ensures the recipient understands the purpose immediately, with supporting context provided after.'),
(11, 'Which writing principle emphasizes removing unnecessary words?', 'Elaboration', 'Conciseness', 'Formality', 'Creativity', 'b', 'Conciseness means expressing ideas clearly using the fewest words necessary, making business communication more effective and respectful of the reader''s time.');

-- Conflict Resolution Module 5: Building Conflict-Resilient Culture (module_id = 16)
INSERT INTO quiz_questions (module_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(16, 'What is the primary benefit of establishing team norms for conflict?', 'It eliminates all disagreements', 'It provides agreed-upon guidelines for handling disputes', 'It prevents team members from speaking up', 'It creates hierarchical authority', 'b', 'Team norms create shared expectations for how conflicts will be addressed, making it safer and more predictable for everyone to engage in healthy disagreement.'),
(16, 'Which conflict style involves high assertiveness AND high cooperation?', 'Avoiding', 'Competing', 'Collaborating', 'Accommodating', 'c', 'Collaborating is the style that combines high assertiveness with high cooperation, aiming for win-win solutions that satisfy all parties'' needs.');

-- EI Module 4: Relationship Management (module_id = 20)
INSERT INTO quiz_questions (module_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(20, 'What is the foundation of influence without authority?', 'Position power', 'Trust and credibility', 'Financial incentives', 'Formal reporting lines', 'b', 'Influence without authority relies on building trust, demonstrating expertise, and creating genuine connections — not on hierarchical power.'),
(20, 'Which EI competency involves understanding others'' perspectives?', 'Self-awareness', 'Self-regulation', 'Empathy', 'Motivation', 'c', 'Empathy is the EI competency focused on understanding others'' feelings, perspectives, and needs — essential for effective relationship management.');

-- Team Building Module 6: Sustaining High Performance (module_id = 26)
INSERT INTO quiz_questions (module_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(26, 'What is the primary purpose of a team retrospective?', 'To assign blame for failures', 'To reflect on what worked well and what to improve', 'To set next quarter''s targets', 'To evaluate individual performance', 'b', 'Retrospectives create structured reflection time for teams to celebrate successes, identify improvement areas, and adapt their processes for continuous growth.'),
(26, 'According to Lencioni, what is the ultimate dysfunction of a team?', 'Absence of trust', 'Fear of conflict', 'Inattention to results', 'Lack of commitment', 'c', 'In Lencioni''s pyramid, Inattention to Results sits at the top as the ultimate dysfunction — when team members prioritize individual goals over collective outcomes.');

-- Negotiation Module 4: Advanced Scenarios (module_id = 30)
INSERT INTO quiz_questions (module_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(30, 'What does BATNA stand for in negotiation?', 'Best Alternative To a Negotiated Agreement', 'Basic Approach To Negotiation Analysis', 'Bilateral Agreement Through Neutral Arbitration', 'Best Attempt To Navigate Arguments', 'a', 'BATNA — Best Alternative To a Negotiated Agreement — represents your fallback option if negotiations fail, and is a key concept in principled negotiation.'),
(30, 'In integrative bargaining, the primary goal is to:', 'Win at the other party''s expense', 'Create value for all parties involved', 'Reach a quick compromise', 'Avoid making any concessions', 'b', 'Integrative bargaining (win-win negotiation) focuses on expanding the pie so all parties gain value, rather than dividing a fixed amount.');
