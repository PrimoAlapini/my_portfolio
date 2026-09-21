-- ============================================================
--  Seed : données initiales du portfolio
--  Exécuter après la migration dans Supabase > SQL Editor
-- ============================================================


-- ────────────────────────────────────────────────────────────
--  Languages (stack technique)
-- ────────────────────────────────────────────────────────────
insert into public.languages (name, percent, icon_url, sort_order, is_visible) values
  ('Vue',         100, '/images/lang/vue.png',      1,  true),
  ('Nuxt',        100, '/images/lang/nuxt.png',     2,  true),
  ('Python',      100, '/images/lang/python.png',   3,  true),
  ('React',       100, '/images/lang/react.png',    4,  true),
  ('Flutter',     100, '/images/lang/flutter.png',  5,  true),
  ('Angular',     100, '/images/lang/angular.png',  6,  true),
  ('Node Js',     100, '/images/lang/node.png',     7,  true),
  ('Php',         100, '/images/lang/php.png',      8,  true),
  ('Laravel',     100, '/images/lang/laravel.png',  9,  true),
  ('MySql',       100, '/images/lang/mysql.png',    10, true),
  ('Mongo DB',    100, '/images/lang/mongo.png',    11, true),
  ('Postgree',    100, '/images/lang/postgree.png', 12, true),
  ('Java',        100, '/images/lang/java.webp',    13, true),
  ('Spring Boot', 100, '/images/lang/spring.png',   14, true),
  ('Dart',        100, '/images/lang/dart.png',     15, true),
  ('Django',      100, '/images/lang/django.png',   16, true),
  ('JavaScript',  100, '/images/lang/js.png',       17, true);


-- ────────────────────────────────────────────────────────────
--  Projects (projets récents)
-- ────────────────────────────────────────────────────────────
insert into public.projects (title, category, tags, image_url, link, sort_order, is_visible) values
  (
    'Hub Liquors',
    'Application Web',
    ARRAY['Vue.js', 'Laravel', 'Figma'],
    '/images/hub.PNG',
    'https://estern',
    1,
    true
  ),
  (
    'Cinemax',
    'Application Web',
    ARRAY['Nuxt', 'Laravel'],
    '/images/hub.PNG',
    null,
    2,
    true
  ),
  (
    'Eastern',
    'Application Web',
    ARRAY['Vue.js', 'NodeJs', 'Figma'],
    '/images/hub.PNG',
    null,
    3,
    true
  );


-- ────────────────────────────────────────────────────────────
--  Testimonials (témoignages clients)
-- ────────────────────────────────────────────────────────────
insert into public.testimonials (name, role, content, rating, is_visible) values
  (
    'Pascal Abiola',
    'Fondateur, SK Agency',
    'Travailler avec Rzh a été un vrai plaisir. Il a rapidement compris nos besoins et a livré un site moderne, fluide et parfaitement responsive. Son professionnalisme et sa rapidité d''exécution nous ont impressionnés.',
    5,
    true
  ),
  (
    'Alain Michel',
    'Chef de projet digital',
    'Très bonne communication du début à la fin. Rezah a su transformer notre maquette en un site performant et pixel-perfect. Le code est propre, optimisé et facile à maintenir. Je recommande fortement.',
    4,
    true
  ),
  (
    'Michelle Oladogni',
    'Entrepreneur',
    'Excellent développeur. Le travail est propre, structuré et très élégant. Le site reflète exactement notre identité. Il anticipe les problèmes, propose des solutions intelligentes et reste disponible même après livraison. La collaboration a été simple, efficace et agréable.',
    5,
    true
  ),
  (
    'Patrick Corradin',
    'CEO, Nova Corp',
    'Rezah a totalement refait notre plateforme et l''a rendue plus rapide, plus intuitive et plus esthétique. Il propose toujours de bonnes idées et reste très professionnel. Un développeur fiable et talentueux.',
    4,
    true
  ),
  (
    'Natacha Alakè',
    'Responsable Marketing',
    'Nous avions un délai très court, et pourtant il a tout livré dans les temps avec une qualité incroyable. Son sens du détail et sa maîtrise des technologies web font vraiment la différence.',
    4,
    true
  );
