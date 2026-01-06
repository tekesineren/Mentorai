import { supabase } from '../lib/supabase';

export interface University {
  id: number;
  name: string;
  city: string | null;
  state: string | null;
  country: string | null;
  website: string | null;
  ownership: string | null;
  level: string | null;
  created_at: string;
}

export async function getAllUniversities(): Promise<University[]> {
  const { data, error } = await supabase
    .from('universities')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching universities:', error);
    return [];
  }

  return data || [];
}

export async function getUniversitiesByState(state: string): Promise<University[]> {
  const { data, error } = await supabase
    .from('universities')
    .select('*')
    .eq('state', state)
    .order('name');

  if (error) {
    console.error('Error fetching universities by state:', error);
    return [];
  }

  return data || [];
}

export async function getUniversitiesByOwnership(ownership: 'Public' | 'Private'): Promise<University[]> {
  const { data, error } = await supabase
    .from('universities')
    .select('*')
    .eq('ownership', ownership)
    .order('name');

  if (error) {
    console.error('Error fetching universities by ownership:', error);
    return [];
  }

  return data || [];
}

export async function searchUniversities(searchTerm: string): Promise<University[]> {
  const { data, error } = await supabase
    .from('universities')
    .select('*')
    .ilike('name', `%${searchTerm}%`)
    .order('name');

  if (error) {
    console.error('Error searching universities:', error);
    return [];
  }

  return data || [];
}
