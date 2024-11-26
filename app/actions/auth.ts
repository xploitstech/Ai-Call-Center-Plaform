"use server"

import { createClient } from "@/lib/supabase/server";
import { createUser, getUserByEmail } from "@/lib/db/actions";

export async function signUp(email: string, password: string, name: string) {
  const supabase = createClient();

  // First create the auth user in Supabase
  const { data: { user }, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;
  if (!user) throw new Error("User creation failed");

  // Check if user already exists in our database
  const existingUser = await getUserByEmail(email);
  if (existingUser) return existingUser;

  // Create the user in our database
  const dbUser = await createUser({
    email,
    name,
  });

  return dbUser;
} 