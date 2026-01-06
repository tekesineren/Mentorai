/*
  # Create Universities Table

  1. New Tables
    - `universities`
      - `id` (bigint, primary key, auto-generated)
      - `name` (text, required) - University name
      - `city` (text) - City location
      - `state` (text) - State abbreviation (e.g., TX)
      - `country` (text) - Country code (e.g., USA)
      - `website` (text) - University website URL
      - `ownership` (text) - Public or Private
      - `level` (text) - Education level (e.g., 4-year, 2-year)
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on `universities` table
    - Add policy for public read access (universities are public data)
    - No write policies (data managed by admin only)

  3. Indexes
    - Index on state for efficient filtering by location
    - Index on ownership for filtering by type
*/

CREATE TABLE IF NOT EXISTS universities (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  city text,
  state text,
  country text,
  website text,
  ownership text,
  level text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;

-- Public read access (universities are public information)
CREATE POLICY "Anyone can view universities"
  ON universities
  FOR SELECT
  TO public
  USING (true);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS universities_state_idx ON universities(state);
CREATE INDEX IF NOT EXISTS universities_ownership_idx ON universities(ownership);