import type { Session, SupabaseClient } from "@supabase/supabase-js";

export type OutletContextType = {
  supabase: SupabaseClient<any, "public", any>;
  session: Session | null;
};
