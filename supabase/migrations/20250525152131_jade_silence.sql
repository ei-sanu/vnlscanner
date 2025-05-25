/*
  # Create scan history table

  1. New Tables
    - `scan_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `url` (text)
      - `security_score` (integer)
      - `risk_level` (text)
      - `vulnerabilities_count` (jsonb)
      - `scan_date` (text)
      - `full_report` (jsonb)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `scan_history` table
    - Add policies for authenticated users to read, insert, and delete their own data
*/

-- Create scan history table
CREATE TABLE IF NOT EXISTS scan_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  url text NOT NULL,
  security_score integer NOT NULL,
  risk_level text NOT NULL,
  vulnerabilities_count jsonb NOT NULL,
  scan_date text NOT NULL,
  full_report jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE scan_history ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own scan history"
  ON scan_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own scan history"
  ON scan_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own scan history"
  ON scan_history
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS scan_history_user_id_idx ON scan_history (user_id);