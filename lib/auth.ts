import { cookies } from 'next/headers';
import { supabase } from '@/db';

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
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, name, role, company_id, job_title, department, companies(name)')
      .eq('id', Number(userId))
      .single();

    if (error || !user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      company_id: user.company_id,
      job_title: user.job_title,
      department: user.department,
      company_name: (user.companies as any)?.name || undefined,
    };
  } catch {
    return null;
  }
}

export async function validateCredentials(email: string, password: string): Promise<AuthUser | null> {
  const { data: user, error } = await supabase
    .from('users')
    .select('id, email, name, role, company_id, job_title, department, companies(name)')
    .eq('email', email)
    .eq('password', password)
    .single();

  if (error || !user) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    company_id: user.company_id,
    job_title: user.job_title,
    department: user.department,
    company_name: (user.companies as any)?.name || undefined,
  };
}
