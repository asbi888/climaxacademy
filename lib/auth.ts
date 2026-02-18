import { cookies } from 'next/headers';
import { getDb } from '@/db';

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: 'learner' | 'hr_admin' | 'climax_admin';
  company_id: number | null;
  job_title: string;
  department: string;
  company_name?: string;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get('user_id')?.value;
  if (!userId) return null;

  try {
    const db = getDb();
    const user = db.prepare(`
      SELECT u.id, u.email, u.name, u.role, u.company_id, u.job_title, u.department,
             c.name as company_name
      FROM users u
      LEFT JOIN companies c ON u.company_id = c.id
      WHERE u.id = ?
    `).get(Number(userId)) as AuthUser | undefined;

    return user || null;
  } catch {
    return null;
  }
}

export function validateCredentials(email: string, password: string) {
  const db = getDb();
  const user = db.prepare(`
    SELECT u.id, u.email, u.name, u.role, u.company_id, u.job_title, u.department,
           c.name as company_name
    FROM users u
    LEFT JOIN companies c ON u.company_id = c.id
    WHERE u.email = ? AND u.password = ?
  `).get(email, password) as AuthUser | undefined;

  return user || null;
}
