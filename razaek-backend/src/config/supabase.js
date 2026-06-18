const { createClient } = require('@supabase/supabase-js');

let supabase;

const getSupabaseClient = () => {
  if (!supabase) {
    supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY,
      { auth: { persistSession: false } }
    );
  }
  return supabase;
};

module.exports = { getSupabaseClient };
