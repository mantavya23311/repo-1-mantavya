import { createClient } from '@supabase/supabase-js';

// Access environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

// Create a Supabase client instance
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
