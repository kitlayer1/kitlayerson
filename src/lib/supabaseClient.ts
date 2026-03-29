// src/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Değişkenler eksikse hata ver
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Supabase çevre değişkenleri eksik!");
}

// Supabase istemcisini oluştur
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
