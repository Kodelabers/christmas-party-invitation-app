import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey
);

export type Response = 'Coming' | 'Not coming' | 'No response';
export interface ResponseRecord {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  response: Response;
  updated_at: string;
}