export interface Student {
  id: string
  full_name: string
  email: string
  phone: string
  gender: 'male' | 'female'
  address: string
  school_name: string
  place: string
  class: string
  created_at: string
  updated_at: string
}

export interface Competition {
  id: string
  title: string
  description: string
  category: 'Music' | 'Dance' | 'Literature' | 'Fine Arts'
  event_date: string
  venue: string
  duration: string
  age_group: string
  eligible_classes: string[]
  max_team_size: number
  is_school_wise: boolean
  status: 'open' | 'waitlist' | 'closed'
  created_at: string
  updated_at: string
  competition_guidelines?: CompetitionGuideline[]
}

export interface CompetitionGuideline {
  id: string
  competition_id: string
  general_rules: string[]
  scoring_criteria: { criteria: string; max_points: number }[]
  created_at: string
  updated_at: string
}

export interface StudentRegistration {
  id: string
  student_id: string
  competition_id: string
  registration_id: string
  status: 'confirmed' | 'waitlist' | 'cancelled'
  created_at: string
  updated_at: string
  competitions?: Competition
}
