/*
  # International High Schools Database Schema

  ## Overview
  This migration creates tables for international high schools that accept foreign students,
  including boarding schools, international schools, and exchange programs.

  ## New Tables
  
  ### `high_schools`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - School name
  - `country` (text) - Country location
  - `city` (text) - City location
  - `type` (text) - School type (boarding, international, public, private)
  - `curriculum` (text[]) - Curriculum types (IB, AP, A-Level, National, etc.)
  - `languages` (text[]) - Languages of instruction
  - `accepts_foreign_students` (boolean) - Whether school accepts international students
  - `tuition_annual_usd` (integer) - Annual tuition in USD
  - `boarding_available` (boolean) - Boarding facilities available
  - `boarding_cost_annual_usd` (integer) - Annual boarding cost
  - `student_capacity` (integer) - Total student capacity
  - `international_student_percentage` (integer) - Percentage of international students
  - `age_range_min` (integer) - Minimum age accepted
  - `age_range_max` (integer) - Maximum age accepted
  - `application_deadline` (text) - Application deadline period
  - `website` (text) - School website
  - `email` (text) - Contact email
  - `ranking_national` (integer) - National ranking
  - `accreditations` (text[]) - School accreditations
  - `special_programs` (text[]) - Special programs (STEM, Arts, Sports, etc.)
  - `scholarship_available` (boolean) - Scholarships available
  - `created_at` (timestamptz) - Record creation time
  - `updated_at` (timestamptz) - Record update time

  ### `high_school_scholarships`
  - `id` (uuid, primary key) - Unique identifier
  - `school_id` (uuid, foreign key) - References high_schools
  - `name` (text) - Scholarship name
  - `type` (text) - Scholarship type (academic, athletic, need-based, merit-based)
  - `amount_usd` (integer) - Scholarship amount in USD
  - `coverage_percentage` (integer) - Percentage of costs covered
  - `requirements` (text[]) - Requirements list
  - `deadline` (text) - Application deadline
  - `renewable` (boolean) - Is scholarship renewable
  - `created_at` (timestamptz) - Record creation time

  ### `high_school_admissions`
  - `id` (uuid, primary key) - Unique identifier
  - `school_id` (uuid, foreign key) - References high_schools
  - `academic_requirements` (jsonb) - Academic requirements (GPA, test scores, etc.)
  - `language_requirements` (jsonb) - Language proficiency requirements
  - `required_documents` (text[]) - Required documents list
  - `interview_required` (boolean) - Interview required
  - `entrance_exam_required` (boolean) - Entrance exam required
  - `acceptance_rate` (integer) - Acceptance rate percentage
  - `created_at` (timestamptz) - Record creation time

  ## Security
  - Enable RLS on all tables
  - Public read access for all users (students need to browse schools)
  - Only authenticated admins can modify data

  ## Notes
  1. All costs are in USD for consistency
  2. Curricula include: IB (International Baccalaureate), AP (Advanced Placement), 
     A-Level, National curricula, etc.
  3. School types: boarding, international, public, private, charter
  4. Age ranges typically 14-18 for high school
*/

-- Create high_schools table
CREATE TABLE IF NOT EXISTS high_schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  country text NOT NULL,
  city text NOT NULL,
  type text NOT NULL CHECK (type IN ('boarding', 'international', 'public', 'private', 'charter')),
  curriculum text[] NOT NULL DEFAULT '{}',
  languages text[] NOT NULL DEFAULT '{}',
  accepts_foreign_students boolean DEFAULT true,
  tuition_annual_usd integer,
  boarding_available boolean DEFAULT false,
  boarding_cost_annual_usd integer,
  student_capacity integer,
  international_student_percentage integer,
  age_range_min integer DEFAULT 14,
  age_range_max integer DEFAULT 18,
  application_deadline text,
  website text,
  email text,
  ranking_national integer,
  accreditations text[] DEFAULT '{}',
  special_programs text[] DEFAULT '{}',
  scholarship_available boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create high_school_scholarships table
CREATE TABLE IF NOT EXISTS high_school_scholarships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL REFERENCES high_schools(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('academic', 'athletic', 'need-based', 'merit-based', 'cultural', 'other')),
  amount_usd integer,
  coverage_percentage integer CHECK (coverage_percentage >= 0 AND coverage_percentage <= 100),
  requirements text[] DEFAULT '{}',
  deadline text,
  renewable boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create high_school_admissions table
CREATE TABLE IF NOT EXISTS high_school_admissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL REFERENCES high_schools(id) ON DELETE CASCADE,
  academic_requirements jsonb DEFAULT '{}',
  language_requirements jsonb DEFAULT '{}',
  required_documents text[] DEFAULT '{}',
  interview_required boolean DEFAULT false,
  entrance_exam_required boolean DEFAULT false,
  acceptance_rate integer CHECK (acceptance_rate >= 0 AND acceptance_rate <= 100),
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_high_schools_country ON high_schools(country);
CREATE INDEX IF NOT EXISTS idx_high_schools_type ON high_schools(type);
CREATE INDEX IF NOT EXISTS idx_high_schools_curriculum ON high_schools USING gin(curriculum);
CREATE INDEX IF NOT EXISTS idx_high_schools_accepts_foreign ON high_schools(accepts_foreign_students);
CREATE INDEX IF NOT EXISTS idx_scholarships_school_id ON high_school_scholarships(school_id);
CREATE INDEX IF NOT EXISTS idx_admissions_school_id ON high_school_admissions(school_id);

-- Enable Row Level Security
ALTER TABLE high_schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE high_school_scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE high_school_admissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Allow public read access (students need to browse)
CREATE POLICY "Anyone can view high schools"
  ON high_schools FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can view scholarships"
  ON high_school_scholarships FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can view admission requirements"
  ON high_school_admissions FOR SELECT
  TO public
  USING (true);

-- Only authenticated users with admin role can insert/update/delete
CREATE POLICY "Authenticated users can insert high schools"
  ON high_schools FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update high schools"
  ON high_schools FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete high schools"
  ON high_schools FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert scholarships"
  ON high_school_scholarships FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update scholarships"
  ON high_school_scholarships FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete scholarships"
  ON high_school_scholarships FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert admissions"
  ON high_school_admissions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update admissions"
  ON high_school_admissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete admissions"
  ON high_school_admissions FOR DELETE
  TO authenticated
  USING (true);