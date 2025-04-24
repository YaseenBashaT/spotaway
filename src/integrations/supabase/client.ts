
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dkltzttvcrpqwuufvioj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrbHR6dHR2Y3JwcXd1dWZ2aW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNDUzMzAsImV4cCI6MjA2MDgyMTMzMH0.jLFjHYXXmkdRxKaRYndzdtK2ljwgq4ZL-kxsuxQ-pFY";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
