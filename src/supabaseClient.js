import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wozhsunyhxvankwvztwc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvemhzdW55aHh2YW5rd3Z6dHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5MzgyODUsImV4cCI6MjA5MDUxNDI4NX0.enanYMDsXkY13-154YkqFRqzo2E7CDTfhuJ1Ci4xNsI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
