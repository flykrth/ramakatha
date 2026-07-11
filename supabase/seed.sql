-- Seed default competitions and guidelines matching Stitch design

-- Clean existing data
truncate public.student_registrations cascade;
truncate public.competition_guidelines cascade;
truncate public.competitions cascade;

-- Insert Competitions
insert into public.competitions (id, title, description, category, event_date, venue, duration, age_group, eligible_classes, max_team_size, status)
values
  (
    '11111111-1111-1111-1111-111111111111',
    'Classical Vocal Solo (Hindustani)',
    'A premier platform to showcase mastery in traditional Hindustani classical singing. Participants are evaluated on Raag purity, Taal, and overall presentation.',
    'Music',
    '2026-10-15 09:00:00+05:30',
    'Main Auditorium, Cultural Block',
    '15 Minutes Maximum per participant',
    'Senior Division (Ages 18-25)',
    array['9', '10', '11', '12'],
    1,
    'open'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Traditional Mural Art',
    'Create stunning visual narratives drawing inspiration from ancient temple architectures and epics.',
    'Fine Arts',
    '2026-10-16 10:00:00+05:30',
    'Seminar Hall 2, Cultural Block',
    '3 Hours',
    'Middle & High School',
    array['8', '9', '10'],
    3,
    'waitlist'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Sanskrit Essay Writing',
    'Demonstrate linguistic proficiency and analytical thought in exploring philosophical themes.',
    'Literature',
    '2026-10-18 11:30:00+05:30',
    'Lecture Hall 3, Academic Block',
    '2 Hours',
    'Undergraduate',
    array['ug', 'pg'],
    1,
    'open'
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'Folk Dance Ensemble',
    'A vibrant display of regional folk traditions, emphasizing synchronization, costumes, and rhythmic energy.',
    'Dance',
    '2026-10-20 14:30:00+05:30',
    'Open Air Theater',
    '8 - 10 Minutes',
    'Open Category',
    array['5', '6', '7', '8', '9', '10', '11', '12', 'ug', 'pg'],
    12,
    'closed'
  );

-- Insert Guidelines for Hindustani Classical Vocal Solo
insert into public.competition_guidelines (id, competition_id, general_rules, scoring_criteria)
values
  (
    '55555555-5555-5555-5555-555555555555',
    '11111111-1111-1111-1111-111111111111',
    array[
      'Participants must perform a classical vocal piece based on the Ramayana theme. Cinematic or light music interpretations are strictly prohibited.',
      'Accompaniment is limited to a maximum of three instruments. Electronic Tanpura is permitted if required.',
      'Participants must report to the green room at least 45 minutes prior to their scheduled performance time.',
      'The judges'' decision will be final and binding. No disputes regarding scoring will be entertained post-event.'
    ],
    '[
      {"criteria": "Sur and Taal (Melody and Rhythm)", "max_points": 40},
      {"criteria": "Bhava and Sahitya (Expression and Diction)", "max_points": 30},
      {"criteria": "Overall Presentation & Adherence to Theme", "max_points": 20}
    ]'::jsonb
  ),
  (
    '66666666-6666-6666-6666-666666666666',
    '22222222-2222-2222-2222-222222222222',
    array[
      'Artwork must be original and created during the event time limit.',
      'Participants must bring their own sketching and painting materials.',
      'Theme details will be announced 15 minutes before the competition starts.'
    ],
    '[
      {"criteria": "Creativity & Composition", "max_points": 30},
      {"criteria": "Technical Skill & Detail", "max_points": 30},
      {"criteria": "Theme Representation", "max_points": 40}
    ]'::jsonb
  ),
  (
    '77777777-7777-7777-7777-777777777777',
    '33333333-3333-3333-3333-333333333333',
    array[
      'The essay must be written in Devanagari script.',
      'Use of dictionaries or mobile devices is strictly prohibited during the exam.',
      'Word limit: 1000 - 1500 words.'
    ],
    '[
      {"criteria": "Grammatical Accuracy", "max_points": 30},
      {"criteria": "Depth of Thought", "max_points": 45},
      {"criteria": "Vocabulary & Style", "max_points": 25}
    ]'::jsonb
  ),
  (
    '88888888-8888-8888-8888-888888888888',
    '44444444-4444-4444-4444-444444444444',
    array[
      'Dance must be a recognized regional folk style.',
      'Pre-recorded music must be submitted on a USB drive 2 hours before the event.',
      'Performance time includes stage set-up and clearance.'
    ],
    '[
      {"criteria": "Choreography & Grace", "max_points": 30},
      {"criteria": "Coordination & Synchronization", "max_points": 30},
      {"criteria": "Costumes & Presentation", "max_points": 40}
    ]'::jsonb
  );
