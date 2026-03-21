import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://suhocshucnjfarxupnho.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1aG9jc2h1Y25qZmFyeHVwbmhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwOTYyMTYsImV4cCI6MjA4OTY3MjIxNn0.s3cFwmbjXh_6v4HFVeS2U5PJOwtzjBp0ArgCTuM0M-A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
