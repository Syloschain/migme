
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hlqreaqifgamxusdufwp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhscXJlYXFpZmdhbXh1c2R1ZndwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1NDI0NzIsImV4cCI6MjA1ODExODQ3Mn0.VLNftQKDA_j-LUTDKoOWpGp1h464rt9RK2qlaSklX38";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
