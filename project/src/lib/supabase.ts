import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const hasValidSupabaseConfig =
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'your_supabase_url_here' &&
  supabaseAnonKey !== 'your_supabase_anon_key_here';

export const supabase = hasValidSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export type StudentProfile = {
  id: string;
  user_id?: string;
  full_name: string;
  email: string;
  date_of_birth?: string;
  nationality?: string;
  current_education_level?: string;
  field_of_study?: string;
  gpa?: number;
  test_scores?: Record<string, any>;
  languages?: any[];
  work_experience?: any[];
  extracurricular?: Record<string, any>;
  achievements?: any[];
  annual_budget?: number;
  preferred_countries?: string[];
  preferred_fields?: string[];
  created_at?: string;
  updated_at?: string;
};

export type University = {
  id: string;
  name: string;
  country: string;
  city?: string;
  ranking_global?: number;
  website?: string;
  tuition_min?: number;
  tuition_max?: number;
  living_cost_annual?: number;
  application_fee?: number;
  visa_difficulty_score?: number;
  visa_success_rate?: number;
  post_study_work_visa?: boolean;
  work_visa_duration_months?: number;
  citizenship_pathway?: boolean;
  citizenship_years?: number;
  residence_permit_ease_score?: number;
  language_requirements?: Record<string, any>;
  acceptance_rate?: number;
  international_students_percentage?: number;
  programs?: any[];
  created_at?: string;
  updated_at?: string;
};

export type Scholarship = {
  id: string;
  university_id: string;
  name: string;
  type: string;
  amount_min?: number;
  amount_max?: number;
  coverage_percentage?: number;
  eligibility_criteria?: Record<string, any>;
  required_gpa?: number;
  required_test_scores?: Record<string, any>;
  for_sports?: string[];
  for_arts?: string[];
  nationality_restrictions?: string[];
  application_deadline?: string;
  renewable?: boolean;
  created_at?: string;
};

export type StudentMatch = {
  id: string;
  student_profile_id: string;
  university_id: string;
  overall_match_score?: number;
  academic_match_score?: number;
  financial_match_score?: number;
  visa_match_score?: number;
  scholarship_potential_score?: number;
  post_graduation_score?: number;
  recommended_scholarships?: any[];
  estimated_total_cost?: number;
  estimated_scholarship_amount?: number;
  visa_difficulty_assessment?: string;
  post_graduation_opportunities?: string;
  match_reasoning?: string;
  created_at?: string;
  updated_at?: string;
};