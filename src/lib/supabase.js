// src/lib/supabase.js
// ─────────────────────────────────────────────────────────────
// Supabase client — Student Portal
// Replace the env vars in your .env file:
//   VITE_SUPABASE_URL=https://xxxx.supabase.co
//   VITE_SUPABASE_ANON_KEY=your-anon-public-key
// ─────────────────────────────────────────────────────────────
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL  || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('[Supabase] Missing env vars — running in mock-data mode.');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession:   true,
    detectSessionInUrl: true,  // needed for magic-link / token-based auth flows
  },
});

// ─────────────────────────────────────────────────────────────
// PORTAL ACCOUNT ACTIVATION (Create Password Flow)
// ─────────────────────────────────────────────────────────────

/**
 * Validate an activation token before showing the Create Password form.
 * Returns { isValid, studentId, studentName } from the DB function.
 */
export async function validateActivationToken(token) {
  const { data, error } = await supabase.rpc('validate_activation_token', { p_token: token });
  if (error) throw error;
  return data?.[0] || { is_valid: false };
}

/**
 * Create the student's Supabase Auth account and mark the portal as activated.
 * Called on successful password creation.
 */
export async function activateStudentPortal({ token, studentId, email, password }) {
  // 1. Create auth user via Supabase signUp
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { student_id: studentId, role: 'student' },
    },
  });
  if (authError) throw authError;

  // 2. Mark student record as activated
  const { error: updateError } = await supabase
    .from('students')
    .update({
      portal_activated: true,
      supabase_auth_uid: authData.user?.id,
      activation_token: null,
      activation_token_expires: null,
    })
    .eq('activation_token', token);

  if (updateError) throw updateError;
  return authData;
}

// ─────────────────────────────────────────────────────────────
// STUDENT AUTH (Login)
// ─────────────────────────────────────────────────────────────

/**
 * Sign in a student using their registered email + password.
 * NOTE: Student ID is mapped to email during enrollment.
 *       For production: store email in students table and look it up by student_id first.
 */
export async function signInStudent(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOutStudent() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Fetch the full student profile for the currently authenticated student.
 */
export async function fetchMyProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('supabase_auth_uid', user.id)
    .single();
  if (error) throw error;
  return data;
}

// ─────────────────────────────────────────────────────────────
// STUDENT DATA QUERIES
// ─────────────────────────────────────────────────────────────

/**
 * Fetch enrolled subjects for the student, including schedule info.
 */
export async function fetchMySubjects(studentDbId) {
  const { data, error } = await supabase
    .from('enrollment_subjects')
    .select(`
      *,
      subject:subjects(*, strand:strands(code, name)),
      schedule:subject_schedules(*, teacher:teachers(full_name))
    `)
    .eq('enrollments.student_id', studentDbId)  // via join
    .order('created_at');

  // Alternatively, use a direct join through enrollments:
  // const { data, error } = await supabase
  //   .from('enrollments')
  //   .select('*, enrollment_subjects(*, subject:subjects(*))')
  //   .eq('student_id', studentDbId)
  //   .eq('enrollment_status', 'enrolled');

  if (error) throw error;
  return data;
}

/**
 * Fetch the student's current enrollment record.
 */
export async function fetchMyEnrollment(studentDbId, schoolYear, semester) {
  const { data, error } = await supabase
    .from('enrollments')
    .select('*, strand:strands(*, track:tracks(*))')
    .eq('student_id', studentDbId)
    .eq('school_year', schoolYear)
    .eq('semester', semester)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

/**
 * Fetch all payment records for the student.
 */
export async function fetchMyPayments(studentDbId) {
  const { data, error } = await supabase
    .from('payments')
    .select('*, category:payment_categories(name, code)')
    .eq('student_id', studentDbId)
    .eq('payment_status', 'completed')
    .order('payment_date', { ascending: false });
  if (error) throw error;
  return data;
}

// ─────────────────────────────────────────────────────────────
// PASSWORD RESET
// ─────────────────────────────────────────────────────────────

/**
 * Send password reset email via Supabase Auth.
 */
export async function sendPasswordReset(email) {
  const redirectTo = `${window.location.origin}/create-password`;
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
  if (error) throw error;
}

/**
 * Update password (called after user clicks reset link from email).
 */
export async function updateStudentPassword(newPassword) {
  const { data, error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
  return data;
}