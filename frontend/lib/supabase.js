/**
 * Supabase Client
 * 
 * Client for interacting with Supabase services
 */

import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

/**
 * Send OTP for phone verification
 * @param {string} phone - Phone number
 * @returns {Promise<object>} OTP response
 */
export async function sendOTP(phone) {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: phone,
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('OTP request error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Verify OTP and sign in
 * @param {string} phone - Phone number
 * @param {string} otp - OTP code
 * @returns {Promise<object>} Auth response
 */
export async function verifyOTP(phone, otp) {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      phone: phone,
      token: otp,
      type: 'sms',
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('OTP verification error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Sign in with Google OAuth
 * @returns {Promise<void>}
 */
export async function signInWithGoogle() {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw error;
  }
}

/**
 * Get currently signed-in user
 * @returns {Promise<object>} User data
 */
export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) throw error;
    return data.user;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

/**
 * Sign out user
 * @returns {Promise<object>} Sign out response
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {object} profileData - Profile data to update
 * @returns {Promise<object>} Updated profile
 */
export async function updateProfile(userId, profileData) {
  try {
    // First check if profile exists
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    // If profile exists, update it
    if (existingProfile) {
      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    }
    // Otherwise, insert new profile
    else {
      const { data, error } = await supabase
        .from('profiles')
        .insert({ id: userId, ...profileData })
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    }
  } catch (error) {
    console.error('Profile update error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get user profile
 * @param {string} userId - User ID
 * @returns {Promise<object>} User profile
 */
export async function getProfile(userId) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Get profile error:', error);
    return { success: false, error: error.message };
  }
}
