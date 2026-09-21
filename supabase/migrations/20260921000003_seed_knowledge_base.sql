-- ============================================================
--  Seed : knowledge_base — contenu réel de Rezah (Primous Alapini)
--  Date : 2026-09-21
-- ============================================================

insert into public.knowledge_base (type, titre, contenu, tags, sort_order) values

-- ─── PROFIL ─────────────────────────────────────────────────────────────────
(
  'profil',
  'Qui est Rezah (Primous Alapini) ?',
  'Je m''appelle Primous Alapini, alias "The Rezah". Je suis développeur web et programmeur full-stack basé à Cotonou, au Bénin. Avec plus de 3 ans d''expérience, j''ai collaboré avec diverses entreprises et startups pour concevoir des sites web, des applications web et mobiles, ainsi que des solutions digitales complètes. Je suis né en 1999 à Cotonou. J''ai obtenu ma licence à l''EPAC en 2021, puis j''ai suivi une formation au numérique à DIGITECH Abidjan (18 mois en Côte d''Ivoire). En 2024, j''intègre HighFive University (VIPP, Bénin) pour un programme en développement web et gestion de projet. Je me positionne aujourd''hui comme un profil polyvalent : code, rigueur scientifique, vision orientée solutions.',
  ARRAY['profil','développeur','bénin','full-stack','rezah','primous', 'alapini', 'primous alapini', 'devops'],
  1
),
(
  'profil',
  'Statistiques & chiffres clés',
  'Primous Alapini / The Rezah en chiffres : 50+ projets terminés, collaborations avec 10+ entreprises, 3+ années d''expérience professionnelle. Compétences : Front End, Back End, Mobile App, SEO, DevOps, UI/UX Design, Coding.',
  ARRAY['stats','expérience','projets','chiffres'],
  2
),
(
  'profil',
  'Parcours académique et professionnel',
  'Formation académique : Baccalauréat (La Réussite, 2017), Licence PSA à l''EPAC (2021), formation numérique à DIGITECH Abidjan (2021-2023), Master Gestion de Projet à Harmony Institute (2024-présent), School Business en Programmation & Développement Web à HighFive University / VIPP (2024). Expérience professionnelle : Graphiste Designer indépendant (2020-2022), Développeur freelance (2022-2024), Dev & DevOps chez VIPP Highfive (2024-présent).',
  ARRAY['formation','académique','parcours','cv','diplôme'],
  3
),

-- ─── CONTACT ────────────────────────────────────────────────────────────────
(
  'contact',
  'Comment contacter Rezah ?',
  'Téléphone : (229) 01-9747-5218. Email : therezahdev@gmail.com. Site web : primoalapini.rezah.com. Adresse : Akpakpa, Cotonou, Bénin. Pour un projet, une collaboration ou un devis, il suffit d''utiliser le formulaire de contact sur le site ou d''envoyer un email directement.',
  ARRAY['contact','email','téléphone','collaboration','devis'],
  4
),

-- ─── SERVICES ───────────────────────────────────────────────────────────────
(
  'service',
  'Création de site web',
  'Rezah crée des sites web modernes, rapides et entièrement responsive. Chaque site est optimisé pour une expérience utilisateur fluide et professionnelle. Inclut : design moderne et responsive, optimisation SEO et performance, expérience utilisateur fluide. Idéal pour les entreprises, startups et indépendants qui veulent une vitrine digitale qui convertit.',
  ARRAY['site web','responsive','seo','design','vitrine'],
  5
),
(
  'service',
  'Développement d''application web',
  'Développement d''applications web performantes, sécurisées et évolutives, adaptées aux besoins spécifiques de chaque entreprise. Types : CRM, dashboard, SaaS, portails métier. Points forts : architecture scalable, API sécurisées, interface intuitive.',
  ARRAY['application web','saas','crm','dashboard','api'],
  6
),
(
  'service',
  'Application mobile (Android & iOS)',
  'Conception et développement d''applications mobiles ergonomiques et intuitives pour Android et iOS. Basé sur Flutter/Dart pour un code cross-platform performant. Inclut : design UX/UI moderne, performance et fluidité, compatibilité Android & iOS.',
  ARRAY['mobile','android','ios','flutter','application'],
  7
),
(
  'service',
  'Sécurité web',
  'Analyse, protection et sécurisation des plateformes web contre les attaques courantes : injections SQL, failles XSS, accès non autorisés. Services : audit de sécurité, protection XSS & injections SQL, renforcement des accès et authentification.',
  ARRAY['sécurité','xss','injection','audit','protection'],
  8
),
(
  'service',
  'Maintenance et évolution',
  'Suivi technique complet : correction de bugs, mises à jour régulières, ajout de nouvelles fonctionnalités. Permet à votre projet de continuer à évoluer avec vos besoins sans interruption de service.',
  ARRAY['maintenance','mise à jour','bug','évolution','support'],
  9
),
(
  'service',
  'Design graphique : Flyer, Affiche, Logo',
  'Création de supports visuels professionnels : flyers modernes et attractifs, affiches publicitaires impactantes, logos uniques et mémorables. Chaque création est pensée pour renforcer l''identité visuelle et maximiser l''impact de communication.',
  ARRAY['design','logo','flyer','affiche','identité visuelle','graphisme'],
  10
),
(
  'service',
  'Conseil et suivi technique',
  'Accompagnement personnalisé pour guider dans les choix technologiques et assurer la réussite d''un projet digital. Aide sur : choix des technologies (stack), architecture projet, suivi et optimisation continue.',
  ARRAY['conseil','accompagnement','architecture','technologie','suivi'],
  11
),

-- ─── COMPÉTENCES TECHNIQUES ─────────────────────────────────────────────────
(
  'competence',
  'Langages et technologies maîtrisés',
  'Front-end : Vue.js, Nuxt.js, React, Angular, JavaScript, HTML/CSS (Tailwind). Back-end : Node.js, Django (Python), Laravel (PHP), Spring Boot (Java). Mobile : Flutter/Dart. Bases de données : MySQL, PostgreSQL, MongoDB. DevOps & outils : Git, Docker, Supabase. Design : Figma, UI/UX.',
  ARRAY['vue','react','angular','nuxt','node','django','laravel','flutter','mysql','mongodb','postgresql','spring','java','php','python'],
  12
),

-- ─── FAQ ────────────────────────────────────────────────────────────────────
(
  'faq',
  'Dans quels secteurs avez-vous travaillé ?',
  'Rezah a travaillé dans de nombreux secteurs : technologie, finance, santé, services créatifs, commerce, éducation et startups early-stage.',
  ARRAY['secteurs','expérience','industries'],
  13
),
(
  'faq',
  'Êtes-vous disponible pour du freelance ?',
  'Oui, Rezah prend régulièrement des missions freelance selon ses disponibilités. Pour discuter d''une collaboration, contactez directement via le formulaire du site ou par email.',
  ARRAY['freelance','disponibilité','mission','collaboration'],
  14
),
(
  'faq',
  'Combien de temps pour réaliser un projet ?',
  'La durée dépend de l''envergure : un site vitrine simple prend 1 à 2 semaines, une application web sur mesure entre 4 et 12 semaines. Un délai précis est donné après analyse du cahier des charges.',
  ARRAY['délai','durée','projet','planning','temps'],
  15
),
(
  'faq',
  'Travaillez-vous avec des startups ?',
  'Oui, Rezah travaille aussi bien avec des startups (dès le MVP), des agences digitales, que des grandes entreprises. Chaque projet est adapté au budget et aux objectifs du client.',
  ARRAY['startup','agence','entreprise','budget','mvp'],
  16
),
(
  'faq',
  'Comment obtenir le CV de Rezah ?',
  'Le CV complet de Primous Alapini est disponible sur demande privée. Utilisez le formulaire de contact sur le site ou envoyez un email à therezahdev@gmail.com pour le recevoir.',
  ARRAY['cv','curriculum','télécharger','contact'],
  17
),
(
  'faq',
  'Quels outils de design utilisez-vous ?',
  'Principalement Figma pour la conception UI/UX et les maquettes. Git pour la gestion de versions. Et selon les projets : Adobe Illustrator, Canva pour les supports graphiques.',
  ARRAY['figma','design','outils','illustrator','canva'],
  18
);
