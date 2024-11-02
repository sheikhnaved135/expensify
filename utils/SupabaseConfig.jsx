import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://atbinfbpmfypmzvrilas.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0YmluZmJwbWZ5cG16dnJpbGFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwOTU0MTcsImV4cCI6MjA0NTY3MTQxN30.ZzyPajzmYJZcUHsgkar8EUNuHbVwQFnucYQzOi8GeqY"
);
