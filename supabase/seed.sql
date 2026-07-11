-- Seed actual competitions and guidelines for Ramakatha 2026

-- Clean existing data
truncate public.student_registrations cascade;
truncate public.competition_guidelines cascade;
truncate public.competitions cascade;

-- Insert Competitions
insert into public.competitions (id, title, description, category, event_date, venue, duration, age_group, eligible_classes, max_team_size, is_school_wise, status)
values
  -- Class 6-8 Competitions
  (
    '11111111-1111-1111-1111-000000000001',
    'Storytelling Competition',
    'Share an inspiring story from the Ramayana through an engaging video presentation.',
    'Literature',
    '2026-10-15 09:00:00+05:30',
    'Video Submission',
    'Max 5 Minutes',
    'Class 6-8',
    array['6', '7', '8'],
    1,
    false,
    'open'
  ),
  (
    '11111111-1111-1111-1111-000000000002',
    'Mono Act Competition',
    'Bring to life any character, episode, or inspiring moment from the Ramayana through a powerful mono act that showcases expression, creativity, and stage presence.',
    'Dance',
    '2026-10-15 10:00:00+05:30',
    'Video Submission',
    'Max 5 Minutes',
    'Class 6-8',
    array['6', '7', '8'],
    1,
    false,
    'open'
  ),
  (
    '11111111-1111-1111-1111-000000000003',
    'Essay Writing Competition',
    'Express your thoughts on the timeless values and life lessons imparted by the Ramayana through an original essay.',
    'Literature',
    '2026-10-15 11:00:00+05:30',
    'Postal Submission',
    'Max 1000 words',
    'Class 6-8',
    array['6', '7', '8'],
    1,
    false,
    'open'
  ),
  -- Class 1-5 Competitions
  (
    '11111111-1111-1111-1111-000000000004',
    'Ramayana Character Portrayal Competition',
    'Transform into your favourite character from the Ramayana and present yourself through a simple video. Showcase the character''s costume, appearance, and confidence while celebrating the rich cultural heritage of the epic.',
    'Fine Arts',
    '2026-10-15 12:00:00+05:30',
    'Video Submission',
    'Max 2 Minutes',
    'Class 1-5',
    array['1', '2', '3', '4', '5'],
    1,
    false,
    'open'
  ),
  (
    '11111111-1111-1111-1111-000000000005',
    'Drawing Competition',
    'Express your creativity by drawing your favourite character from the Ramayana. Use colours and imagination to bring the character to life while celebrating the values and inspiration of the epic.',
    'Fine Arts',
    '2026-10-15 13:00:00+05:30',
    'Postal Submission',
    'Original Sketch',
    'Class 1-5',
    array['1', '2', '3', '4', '5'],
    1,
    false,
    'open'
  ),
  -- Class 9-12 Competitions
  (
    '11111111-1111-1111-1111-000000000006',
    'Painting Competition',
    'Capture the inspiring moment when Lord Hanuman carries the Sanjeevani Mountain to save Lakshmana. Express this iconic episode from the Ramayana through your artistic creativity, highlighting Hanuman''s devotion, courage, and selfless service.',
    'Fine Arts',
    '2026-10-15 14:00:00+05:30',
    'Postal Submission',
    'Original Canvas',
    'Class 9-12',
    array['9', '10', '11', '12'],
    1,
    false,
    'open'
  ),
  (
    '11111111-1111-1111-1111-000000000007',
    'Elder Wisdom Interview',
    'Connect with the wisdom of the older generation by interviewing a grandparent or elderly person about their memories, experiences, and life lessons inspired by the Ramayana.',
    'Literature',
    '2026-10-15 15:00:00+05:30',
    'Video Submission',
    'Max 10 Minutes',
    'Class 9-12',
    array['9', '10', '11', '12'],
    1,
    false,
    'open'
  ),
  (
    '11111111-1111-1111-1111-000000000008',
    'Article Writing Competition',
    'Explore the unique traditions observed in your home during Karkidaka Masam (Ramayana Month). Write about the customs your family follows, why they are practiced, and the values they impart. Share your family''s experience of preserving these traditions across generations.',
    'Literature',
    '2026-10-15 16:00:00+05:30',
    'Postal Submission',
    '800-1000 words',
    'Class 9-12',
    array['9', '10', '11', '12'],
    1,
    false,
    'open'
  ),
  -- School-wise Competitions
  (
    '11111111-1111-1111-1111-000000000009',
    'Drama Competition',
    'Present a dramatic performance based on episodes from Aaranya Kaandam, showcasing creativity, teamwork, and the values of the Ramayana.',
    'Dance',
    '2026-10-16 09:00:00+05:30',
    'Video Submission',
    '20-30 minutes',
    'High School Students (School-wise)',
    array['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    10,
    true,
    'open'
  ),
  (
    '11111111-1111-1111-1111-000000000010',
    'Quiz Competition',
    'Solve quiz questions based on the Ramayana. School wise booklet competition.',
    'Literature',
    '2026-10-16 14:00:00+05:30',
    'School Wise',
    'Booklet Based',
    'School-wise Category',
    array['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    1,
    true,
    'open'
  );

-- Insert Guidelines for all 10 Competitions
insert into public.competition_guidelines (id, competition_id, general_rules, scoring_criteria)
values
  -- Storytelling
  (
    '22222222-2222-2222-2222-000000000001',
    '11111111-1111-1111-1111-000000000001',
    array[
      'Open to students of Classes 6-8',
      'Record a storytelling video',
      'Language: Malayalam or English',
      'Maximum duration: 5 minutes',
      'Narrate an inspiring story from the Ramayana',
      'Ensure clear audio and video quality',
      'Submit the video via email: amritaleap@gmail.com',
      '🏆 Exciting Prizes Await! Participation Certificate for All Eligible Participants.'
    ],
    '[
      {"criteria": "Story Content and Structure", "max_points": 40},
      {"criteria": "Expression and Diction", "max_points": 30},
      {"criteria": "Audio and Video Presentation Quality", "max_points": 30}
    ]'::jsonb
  ),
  -- Mono Act
  (
    '22222222-2222-2222-2222-000000000002',
    '11111111-1111-1111-1111-000000000002',
    array[
      'Open to students of Classes 6-8',
      'Theme: Ramayana',
      'Language: Malayalam or English',
      'Perform a mono act based on Ramayana',
      'Maximum duration: 5 minutes',
      'Costumes and minimal props may be used',
      'Record the performance as a video',
      'Submit the video via email: amritaleap@gmail.com',
      '🏆 Exciting Prizes Await! Participation Certificate for All Eligible Participants.'
    ],
    '[
      {"criteria": "Expression & Dramatic Impact", "max_points": 40},
      {"criteria": "Creativity & Stage Presence", "max_points": 35},
      {"criteria": "Costume & Prop Effectiveness", "max_points": 25}
    ]'::jsonb
  ),
  -- Essay Writing
  (
    '22222222-2222-2222-2222-000000000003',
    '11111111-1111-1111-1111-000000000003',
    array[
      'Open to students of Classes 6-8',
      'Theme: Lessons from the Ramayana',
      'Maximum word limit: 1000 words',
      'The essay must be original',
      'Language: Malayalam or English',
      'Send the original essay by Post/Courier to: Amrita LEAP, Amrita Vishwa Vidyapeetham, Amritapuri Campus, Clappana (P.O.), Kollam, Kerala - 690525',
      '🏆 Exciting Prizes Await! Participation Certificate for All Eligible Participants.'
    ],
    '[
      {"criteria": "Adherence to Theme & Lessons", "max_points": 40},
      {"criteria": "Originality & Quality of Thoughts", "max_points": 40},
      {"criteria": "Grammar, Flow & Vocabulary", "max_points": 20}
    ]'::jsonb
  ),
  -- Ramayana Character Portrayal
  (
    '22222222-2222-2222-2222-000000000004',
    '11111111-1111-1111-1111-000000000004',
    array[
      'Open to students of Classes 1-5',
      'Theme: Dress Up as Your Favourite Ramayana Character',
      'Record a character portrayal (fancy dress) video',
      'Maximum duration: 2 minutes',
      'No dialogue or performance is required. Simply showcase the costume by standing, walking, or posing as the chosen character.',
      'Ensure clear audio and video quality',
      'Submit the video via email: amritaleap@gmail.com',
      '🏆 Exciting Prizes Await! Participation Certificate for All Eligible Participants.'
    ],
    '[
      {"criteria": "Costume Authenticity & Representation", "max_points": 50},
      {"criteria": "Confidence & Character Posing", "max_points": 30},
      {"criteria": "Video Quality and Overall Appeal", "max_points": 20}
    ]'::jsonb
  ),
  -- Drawing
  (
    '22222222-2222-2222-2222-000000000005',
    '11111111-1111-1111-1111-000000000005',
    array[
      'Open to students of Classes 1-5',
      'Theme: My Favourite Character from the Ramayana',
      'Create an original hand-drawn artwork',
      'Medium: Pencil only (Graphite)',
      'Mention the student''s name, class, school name, and contact number on the back of the drawing sheet',
      'Send the original artwork by post/courier to: Amrita LEAP, Amrita Vishwa Vidyapeetham, Amritapuri Campus, Clappana (P.O.), Kollam, Kerala - 690525',
      '🏆 Exciting Prizes Await! Participation Certificate for All Eligible Participants.'
    ],
    '[
      {"criteria": "Creativity & Imagination", "max_points": 40},
      {"criteria": "Technical Sketching Ability", "max_points": 40},
      {"criteria": "Neatness & Presentation", "max_points": 20}
    ]'::jsonb
  ),
  -- Painting
  (
    '22222222-2222-2222-2222-000000000006',
    '11111111-1111-1111-1111-000000000006',
    array[
      'Open to students of Classes 9-12',
      'Theme: Hanuman Flying with the Sanjeevani Mountain',
      'Create an original painting',
      'Medium: Watercolours only',
      'Mention the student''s name, class, school name, and contact number on the back of the artwork',
      'Send the original artwork by post/courier to: Amrita LEAP, Amrita Vishwa Vidyapeetham, Amritapuri Campus, Clappana (P.O.), Kollam, Kerala - 690525',
      '🏆 Exciting Prizes Await! 📜 Participation Certificate for All Eligible Participants.'
    ],
    '[
      {"criteria": "Artistic Technique & Composition", "max_points": 40},
      {"criteria": "Adherence to Theme & Expression", "max_points": 40},
      {"criteria": "Overall Aesthetic Appeal & Detail", "max_points": 20}
    ]'::jsonb
  ),
  -- Elder Wisdom Interview
  (
    '22222222-2222-2222-2222-000000000007',
    '11111111-1111-1111-1111-000000000007',
    array[
      'Open to students of Classes 9-12',
      'Theme: Sharing Ramayana Memories',
      'Record a video interview with a grandparent or any elderly person',
      'Maximum duration: 10 minutes',
      'The interview should focus on their memories, experiences, and life lessons inspired by the Ramayana',
      'Ensure clear audio and video quality',
      'Submit the video via email: amritaleap@gmail.com',
      '🏆 Exciting Prizes Await! Participation Certificate for All Eligible Participants.'
    ],
    '[
      {"criteria": "Interview Depth & Interaction Flow", "max_points": 40},
      {"criteria": "Memory Quality & Lessons Learned", "max_points": 40},
      {"criteria": "Technical Audio and Video Clarity", "max_points": 20}
    ]'::jsonb
  ),
  -- Article Writing
  (
    '22222222-2222-2222-2222-000000000008',
    '11111111-1111-1111-1111-000000000008',
    array[
      'Open to students of Classes 9-12',
      'Theme: Karkidaka Masam: The Traditions We Practice at Home and Their Significance',
      'Write an original handwritten article based on the traditions observed in your home during Ramayana Month',
      'Include the practices followed, their significance, and your personal reflections',
      'Word limit: 800-1000 words',
      'Mention the student''s name, class, school name, and contact number on the article',
      'Send the original handwritten article by post/courier to: Amrita LEAP, Amrita Vishwa Vidyapeetham, Amritapuri Campus, Clappana (P.O.), Kollam, Kerala - 690525',
      '🏆 Exciting Prizes Await! Participation Certificate for All Eligible Participants.'
    ],
    '[
      {"criteria": "Significance of Traditions & Reflections", "max_points": 40},
      {"criteria": "Depth of Information & Personal Voice", "max_points": 40},
      {"criteria": "Neatness, Handwriting & Flow", "max_points": 20}
    ]'::jsonb
  ),
  -- Drama
  (
    '22222222-2222-2222-2222-000000000009',
    '11111111-1111-1111-1111-000000000009',
    array[
      'Open to High School students',
      'One team per school. Team size: 8-10 participants',
      'Duration: 20-30 minutes',
      'Language: Malayalam, English, Hindi, or Sanskrit',
      'Record the performance in a single standing wide shot (no cuts or edits)',
      'Audio and lighting must be clear. Prompting is not permitted.',
      'Appropriate costumes, props, and stage background will be considered an added advantage. Digital/virtual backgrounds are not permitted.',
      'Submit the video via email: amritaleap@gmail.com',
      '🏆 Exciting Prizes Await! Participation Certificate for All Eligible Participants.'
    ],
    '[
      {"criteria": "Acting Skill, Coordination & Synchronization", "max_points": 35},
      {"criteria": "Representation of Aaranya Kaandam & Theme", "max_points": 35},
      {"criteria": "Stage Presence, Props & Costumes Effectiveness", "max_points": 30}
    ]'::jsonb
  ),
  -- Quiz
  (
    '22222222-2222-2222-2222-000000000010',
    '11111111-1111-1111-1111-000000000010',
    array[
      'School Wise Competition',
      'Quiz questions will be solved based on the Ramayana via a booklets assessment.',
      'One booklet will be provided per school.',
      'All answers must be handwritten and original.',
      '🏆 Exciting Prizes Await! Participation Certificate for All Eligible Participants.'
    ],
    '[
      {"criteria": "Quiz Accuracy & Correct Answers Score", "max_points": 100}
    ]'::jsonb
  );
