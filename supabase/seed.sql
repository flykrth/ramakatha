-- Seed actual competitions and guidelines for Ramakatha 2026

-- Clean existing data
truncate public.student_registrations cascade;
truncate public.competition_guidelines cascade;
truncate public.competitions cascade;
delete from auth.users;

-- Insert Competitions
insert into public.competitions (id, title, description, category, event_date, venue, duration, age_group, eligible_classes, max_team_size, is_school_wise, status)
values
  -- Class 6-8 Competitions
  (
    '809b0b42-f9dc-4683-9b98-bc1c83c27e31',
    'Storytelling Competition',
    'Share an inspiring story from the Ramayana through an engaging video presentation.',
    'Literature',
    '2026-07-30 23:59:59+05:30',
    'Video Submission',
    'Max 5 Minutes',
    'Class 6-8',
    array['6', '7', '8'],
    1,
    false,
    'open'
  ),
  (
    'c5a528f1-8f5c-4ff6-9db4-386807ebc31a',
    'Mono Act Competition',
    'Bring to life any character, episode, or inspiring moment from the Ramayana through a powerful mono act that showcases expression, creativity, and stage presence.',
    'Dance',
    '2026-07-30 23:59:59+05:30',
    'Video Submission',
    'Max 5 minutes',
    'Class 6-8',
    array['6', '7', '8'],
    1,
    false,
    'open'
  ),
  (
    'e2a4be59-df96-419b-a0f5-5d466986cf33',
    'Essay Writing Competition',
    'Express your thoughts on the timeless values and life lessons imparted by the Ramayana through an original essay.',
    'Literature',
    '2026-07-30 23:59:59+05:30',
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
    'e10696ef-de35-430c-b26a-912c40c83a12',
    'Ramayana Character Portrayal Competition',
    'Transform into your favourite character from the Ramayana and present yourself through a simple video. Showcase the character''s costume, appearance, and confidence while celebrating the rich cultural heritage of the epic.',
    'Fine Arts',
    '2026-07-30 23:59:59+05:30',
    'Video Submission',
    'Maximum duration: 1 minutes',
    'Class 1-5',
    array['1', '2', '3', '4', '5'],
    1,
    false,
    'open'
  ),
  (
    '7a8c430e-8fb1-432d-8ea2-36c1e30a51d8',
    'Drawing Competition',
    'Express your creativity by drawing your favourite character from the Ramayana.',
    'Fine Arts',
    '2026-07-30 23:59:59+05:30',
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
    '07e4d8fb-df24-4286-90e9-b54db1ab9f1c',
    'Painting Competition',
    'Capture the inspiring moment when Lord Hanuman carries the Sanjeevani Mountain to save Lakshmana. Express this iconic episode from the Ramayana through your artistic creativity, highlighting Hanuman''s devotion, courage, and selfless service.',
    'Fine Arts',
    '2026-07-30 23:59:59+05:30',
    'Postal Submission',
    'Original Canvas',
    'Class 9-12',
    array['9', '10', '11', '12'],
    1,
    false,
    'open'
  ),
  (
    '4b830d93-3d44-4861-a8cf-3c323f46f3ba',
    'Elder Wisdom Interview',
    'Connect with the wisdom of the older generation by interviewing a grandparent or elderly person about their memories, experiences, and life lessons inspired by the Ramayana.',
    'Literature',
    '2026-07-30 23:59:59+05:30',
    'Video Submission',
    'Max 10 minutes',
    'Class 9-12',
    array['9', '10', '11', '12'],
    1,
    false,
    'open'
  ),
  (
    '939029a1-8d2b-47e1-b46c-eb994191d8fc',
    'Article Writing Competition',
    'Explore the unique traditions observed in your home during Karkidaka Masam (Ramayana Month). Write about the customs your family follows, why they are practiced, and the values they impart. Share your family''s experience of preserving these traditions across generations.',
    'Literature',
    '2026-07-30 23:59:59+05:30',
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
    '63f0d061-e0e9-4e78-bc5a-e7be7dcf3a8d',
    'Drama Competition',
    'Present a dramatic performance based on episodes from Aaranya Kaandam, showcasing creativity, teamwork, and the values of the Ramayana.',
    'Dance',
    '2026-07-30 23:59:59+05:30',
    'Video Submission',
    '20-30 minutes',
    'Classes 9 - 12 (School-wise)',
    array['9', '10', '11', '12'],
    10,
    true,
    'open'
  ),
  (
    'bf8e390c-df2e-4b2a-a70d-f2eb89cf1a7c',
    'Ramayana Quiz',
    'Explore the timeless wisdom of the Ramayana through a structured quiz designed to inspire learning, reflection, and deeper understanding of the epic.',
    'Literature',
    '2026-07-30 23:59:59+05:30',
    'School Wise',
    'Booklet Based',
    'Classes 9-12 (School-wise)',
    array['9', '10', '11', '12'],
    1,
    true,
    'open'
  );

-- Insert Guidelines for all 10 Competitions
insert into public.competition_guidelines (id, competition_id, general_rules, scoring_criteria)
values
  -- Storytelling
  (
    '702652b0-8c29-450f-90e0-2647c231ff61',
    '809b0b42-f9dc-4683-9b98-bc1c83c27e31',
    array[
      'Open to students of Classes 6–8',
      'Record a storytelling video',
      'Language: Malayalam or English',
      'Maximum duration: 5 minutes',
      'Narrate an inspiring story from the Ramayana',
      'Clear audio and video quality',
      'Submit the video via email : amritaleap@gmail.com',
      '🏆 Exciting Prizes Await!'
    ],
    '[
      {"criteria": "Story Content and Structure", "max_points": 40},
      {"criteria": "Expression and Diction", "max_points": 30},
      {"criteria": "Audio and Video Presentation Quality", "max_points": 30}
    ]'::jsonb
  ),
  -- Mono Act
  (
    '5e89d10e-a579-4d2c-87d2-7fb2a1d2e6b2',
    'c5a528f1-8f5c-4ff6-9db4-386807ebc31a',
    array[
      'Open to students of Classes 6–8',
      'Language: Malayalam or English',
      'Perform a mono act based on Ramayana ',
      'Maximum duration: 5 minutes',
      'Costumes and minimal props may be used',
      'Record the performance as a video',
      'Submit the video via email : amritaleap@gmail.com ',
      '🏆 Exciting Prizes Await!'
    ],
    '[
      {"criteria": "Expression & Dramatic Impact", "max_points": 40},
      {"criteria": "Creativity & Stage Presence", "max_points": 35},
      {"criteria": "Costume & Prop Effectiveness", "max_points": 25}
    ]'::jsonb
  ),
  -- Essay Writing
  (
    '1df092b3-e283-4a17-b7e1-88cd3b3a39e7',
    'e2a4be59-df96-419b-a0f5-5d466986cf33',
    array[
      'Open to students of Classes 6–8',
      'Theme: Lessons from the Ramayana',
      'Maximum word limit: 1000 words',
      'The essay must be original',
      'Language: Malayalam or English',
      'Register by scanning the QR code',
      'Send the original essay by Post/Courier to:
Amrita LEAP
Amrita Vishwa Vidyapeetham
Amritapuri Campus
Clappana (P.O.)
Kollam, Kerala – 690525',
      '🏆 Exciting Prizes Await!'
    ],
    '[
      {"criteria": "Adherence to Theme & Lessons", "max_points": 40},
      {"criteria": "Originality & Quality of Thoughts", "max_points": 40},
      {"criteria": "Grammar, Flow & Vocabulary", "max_points": 20}
    ]'::jsonb
  ),
  -- Ramayana Character Portrayal
  (
    '4f29a02d-de7c-473d-9d41-ee7c30a5bb1d',
    'e10696ef-de35-430c-b26a-912c40c83a12',
    array[
      'Open to students of Classes 1–5',
      'Dress up as any Ramayana character',
      'Record a character portrayal (fancy dress) video',
      'Maximum duration: 1 minutes',
      'No dialogue or performance is required. Simply showcase the costume by standing, walking, or posing as the chosen character.',
      'Ensure clear audio and video quality',
      'Submit the video via email: amritaleap@gmail.com',
      '🏆 Exciting Prizes Await!'
    ],
    '[
      {"criteria": "Costume Authenticity & Representation", "max_points": 50},
      {"criteria": "Confidence & Character Posing", "max_points": 30},
      {"criteria": "Video Quality and Overall Appeal", "max_points": 20}
    ]'::jsonb
  ),
  -- Drawing
  (
    'f9db2a19-86cd-4d8e-90fe-002d3fbe2e9d',
    '7a8c430e-8fb1-432d-8ea2-36c1e30a51d8',
    array[
      'Open to students of Classes 1–5',
      'Theme: My Favourite Character from the Ramayana',
      'Create an original hand-drawn artwork',
      'Medium: Pencil only (Graphite)',
      'Mention the student''s name, class, school name, and contact number on the back of the drawing sheet',
      'Send the original artwork by post/courier to:
Amrita LEAP
Amrita Vishwa Vidyapeetham
Amritapuri Campus
Clappana (P.O.)
Kollam, Kerala – 690525',
      '🏆 Exciting Prizes Await!'
    ],
    '[
      {"criteria": "Creativity & Imagination", "max_points": 40},
      {"criteria": "Technical Sketching Ability", "max_points": 40},
      {"criteria": "Neatness & Presentation", "max_points": 20}
    ]'::jsonb
  ),
  -- Painting
  (
    'd3920c8e-bf92-4876-8090-de23fc01be8c',
    '07e4d8fb-df24-4286-90e9-b54db1ab9f1c',
    array[
      'Open to students of Classes 9–12',
      'Theme: Hanuman Flying with the Sanjeevani Mountain',
      'Create an original painting',
      'Medium: Watercolours only',
      'Mention the student''s name, class, school name, and contact number on the back of the artwork',
      'Send the original artwork by post/courier to:
Amrita LEAP
Amrita Vishwa Vidyapeetham
Amritapuri Campus
Clappana (P.O.)
Kollam, Kerala – 690525',
      '🏆 Exciting Prizes Await!'
    ],
    '[
      {"criteria": "Artistic Technique & Composition", "max_points": 40},
      {"criteria": "Adherence to Theme & Expression", "max_points": 40},
      {"criteria": "Overall Aesthetic Appeal & Detail", "max_points": 20}
    ]'::jsonb
  ),
  -- Elder Wisdom Interview
  (
    'ca8a7b92-edc2-498c-85a2-0ea2bcda3be8',
    '4b830d93-3d44-4861-a8cf-3c323f46f3ba',
    array[
      'Open to students of Classes 9–12',
      'Record a video interview with a grandparent or any elderly person',
      'Maximum duration: 10 minutes',
      'The interview should focus on their memories, experiences, or lessons from the Ramayana',
      'Ensure clear audio and video quality',
      'Submit the video via email: amritaleap@gmail.com',
      '🏆 Exciting Prizes Await!'
    ],
    '[
      {"criteria": "Interview Depth & Interaction Flow", "max_points": 40},
      {"criteria": "Memory Quality & Lessons Learned", "max_points": 40},
      {"criteria": "Technical Audio and Video Clarity", "max_points": 20}
    ]'::jsonb
  ),
  -- Article Writing
  (
    'fa908d19-cde2-45e0-9ef2-8ba3fc20be8b',
    '939029a1-8d2b-47e1-b46c-eb994191d8fc',
    array[
      'Open to students of Classes 9–12',
      'Theme: Karkidaka Masam: The Traditions We Practice at Home and Their Significance',
      'Write an original handwritten article based on the traditions observed in your home during Ramayana Month',
      'Include the practices followed, their significance, and your personal reflections',
      'Word limit: 800–1000 words',
      'Mention the student''s name, class, school name, and contact number on the article',
      'Send the original handwritten article by post/courier to:
Amrita LEAP
Amrita Vishwa Vidyapeetham
Amritapuri Campus
Clappana (P.O.)
Kollam, Kerala – 690525',
      '🏆 Exciting Prizes Await!'
    ],
    '[
      {"criteria": "Significance of Traditions & Reflections", "max_points": 40},
      {"criteria": "Depth of Information & Personal Voice", "max_points": 40},
      {"criteria": "Neatness, Handwriting & Flow", "max_points": 20}
    ]'::jsonb
  ),
  -- Drama
  (
    'eb9e802a-fd83-4a92-80ea-d2f3be29fc80',
    '63f0d061-e0e9-4e78-bc5a-e7be7dcf3a8d',
    array[
      'Open to High School students',
      'One team per school',
      'Team size: 8–10 participants',
      'Duration: 20–30 minutes',
      'Language: Malayalam, English, Hindi, or Sanskrit',
      'Record the performance in a single standing wide shot (no cuts or edits)',
      'Audio and lighting must be clear',
      'Prompting is not permitted',
      'Appropriate costumes, props, and stage background will be considered an added advantage',
      'Digital/virtual backgrounds are not permitted',
      'Submit the video via email: amritaleap@gmail.com',
      '🏆 Exciting Prizes Await!'
    ],
    '[
      {"criteria": "Acting Skill, Coordination & Synchronization", "max_points": 35},
      {"criteria": "Representation of Aaranya Kaandam & Theme", "max_points": 35},
      {"criteria": "Stage Presence, Props & Costumes Effectiveness", "max_points": 30}
    ]'::jsonb
  ),
  -- Quiz
  (
    'bc29801e-cd2d-45f8-809e-be2da10cb9ec',
    'bf8e390c-df2e-4b2a-a70d-f2eb89cf1a7c',
    array[
      'Open to students of Classes 9–12.',
      'Schools must register through the official registration form.',
      'A Ramayana Study Booklet will be shared with all registered schools after the registration process is completed.',
      'Interested students are encouraged to study the booklet thoroughly in preparation for the quiz.',
      'An MCQ-based quiz along with the instructions for conducting it will be shared with the registered schools.',
      'The quiz will be conducted at the respective schools.',
      'Schools may evaluate the responses and identify students based on the prescribed cut-off marks or the highest scores.',
      'The list of shortlisted students must be submitted to the organizers within the specified deadline.',
      'Shortlisted students will be invited to attend a complimentary three-day residential Camp at Amrita Vishwa Vidyapeetham, Amritapuri Campus.'
    ],
    '[
      {"criteria": "Quiz Accuracy & Correct Answers Score", "max_points": 100}
    ]'::jsonb
  );
