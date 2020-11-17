drop table if exists bookmarks;

create table bookmarks (
  id INTEGER primary key generated by default as identity,
  title text not null,
  url text not null,
  description text,
  rating INTEGER not null
);

insert into bookmarks (title, url, description, rating)
  values
    ('Focus On The Family',
     'https://www.focusonthefamily.com/',
     'Site focused on building healthy families',
     5),
    ('YouTube',
     'https://www.youtube.com/',
     'Site containing videos of various topics',
     5),
    ('Robin Hood',
     'https://robinhood.com/',
     'Site providing investment platform',
     5),
     ('Canvas For Teachers',
      'https://canvas.instructure.com/login/canvas',
      'Site allowing teachers to manage classes virtually',
      5),
     ('W3 Schools',
      'https://www.w3schools.com/default.asp',
      'Site containing instructionsal web development materials',
      5),
     ('Github',
      'https://github.com/',
      'Site providing remote version control',
      5),
      ('Google Drive',
       'https://www.google.com/drive/',
       'Site providing users with remote (cloud) storage',
       5),
      ('Amazon',
       'https://www.amazon.com/',
       'Site containing online retail platform to purchase various products',
       5),
      ('Bible Gateway',
       'https://www.biblegateway.com/',
       'Site providing various bible versions and study tools',
       5),
       ('Scratch',
        'https://scratch.mit.edu/',
        'Site containig platform for users to learn coding concepts in a fun way',
        5);