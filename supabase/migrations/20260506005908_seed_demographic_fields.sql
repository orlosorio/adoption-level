-- ============================================================================
-- Seed the five demographic fields collected at signup:
--   country, company_type, industry, salary_range, age_range
-- All inserts are idempotent on slug so re-running is safe.
-- Salary ranges use USD-equivalent buckets; users in local currency map themselves.
-- ============================================================================

-- ────────────────────────────────────────────────────────────────────────────
-- Fields
-- ────────────────────────────────────────────────────────────────────────────
insert into public.demographic_fields (slug, field_kind, sort_order)
values
  ('country',       'select', 10),
  ('company_type',  'select', 20),
  ('industry',      'select', 30),
  ('salary_range',  'select', 40),
  ('age_range',     'select', 50)
on conflict (slug) do nothing;

-- Field labels (es/en).
insert into public.demographic_field_translations (field_id, locale, label, placeholder)
select f.id, t.locale, t.label, t.placeholder
from public.demographic_fields f
join (values
  ('country',      'es', 'País',                                    'Selecciona tu país'),
  ('country',      'en', 'Country',                                  'Select your country'),
  ('company_type', 'es', '¿En qué tipo de empresa trabajas?',        'Selecciona el tipo'),
  ('company_type', 'en', 'What type of company do you work at?',     'Select company type'),
  ('industry',     'es', '¿En qué industria trabajas?',              'Selecciona tu industria'),
  ('industry',     'en', 'What industry are you in?',                'Select your industry'),
  ('salary_range', 'es', 'Rango salarial anual (USD equivalente)',   'Selecciona tu rango'),
  ('salary_range', 'en', 'Annual salary range (USD equivalent)',     'Select your range'),
  ('age_range',    'es', 'Rango de edad',                            'Selecciona tu rango'),
  ('age_range',    'en', 'Age range',                                'Select your range')
) as t(slug, locale, label, placeholder) on t.slug = f.slug
on conflict (field_id, locale) do nothing;

-- ────────────────────────────────────────────────────────────────────────────
-- Country options (LATAM-leaning + a few global).
-- ────────────────────────────────────────────────────────────────────────────
insert into public.demographic_options (field_id, slug, sort_order)
select f.id, o.slug, o.sort_order
from public.demographic_fields f
join (values
  ('mx',     10),  ('co',     20),  ('ar',     30),  ('cl',     40),
  ('pe',     50),  ('ec',     60),  ('uy',     70),  ('cr',     80),
  ('pa',     90),  ('do',    100),  ('gt',    110),  ('bo',    120),
  ('py',    130),  ('sv',    140),  ('hn',    150),  ('ni',    160),
  ('ve',    170),  ('cu',    180),  ('br',    190),  ('us',    200),
  ('ca',    210),  ('es_',   220),  ('gb',    230),  ('de',    240),
  ('fr',    250),  ('other', 999)
) as o(slug, sort_order) on true
where f.slug = 'country'
on conflict (field_id, slug) do nothing;

insert into public.demographic_option_translations (option_id, locale, label)
select o.id, t.locale, t.label
from public.demographic_options o
join public.demographic_fields f on f.id = o.field_id and f.slug = 'country'
join (values
  ('mx',    'es', 'México'),                   ('mx',    'en', 'Mexico'),
  ('co',    'es', 'Colombia'),                 ('co',    'en', 'Colombia'),
  ('ar',    'es', 'Argentina'),                ('ar',    'en', 'Argentina'),
  ('cl',    'es', 'Chile'),                    ('cl',    'en', 'Chile'),
  ('pe',    'es', 'Perú'),                     ('pe',    'en', 'Peru'),
  ('ec',    'es', 'Ecuador'),                  ('ec',    'en', 'Ecuador'),
  ('uy',    'es', 'Uruguay'),                  ('uy',    'en', 'Uruguay'),
  ('cr',    'es', 'Costa Rica'),               ('cr',    'en', 'Costa Rica'),
  ('pa',    'es', 'Panamá'),                   ('pa',    'en', 'Panama'),
  ('do',    'es', 'República Dominicana'),     ('do',    'en', 'Dominican Republic'),
  ('gt',    'es', 'Guatemala'),                ('gt',    'en', 'Guatemala'),
  ('bo',    'es', 'Bolivia'),                  ('bo',    'en', 'Bolivia'),
  ('py',    'es', 'Paraguay'),                 ('py',    'en', 'Paraguay'),
  ('sv',    'es', 'El Salvador'),              ('sv',    'en', 'El Salvador'),
  ('hn',    'es', 'Honduras'),                 ('hn',    'en', 'Honduras'),
  ('ni',    'es', 'Nicaragua'),                ('ni',    'en', 'Nicaragua'),
  ('ve',    'es', 'Venezuela'),                ('ve',    'en', 'Venezuela'),
  ('cu',    'es', 'Cuba'),                     ('cu',    'en', 'Cuba'),
  ('br',    'es', 'Brasil'),                   ('br',    'en', 'Brazil'),
  ('us',    'es', 'Estados Unidos'),           ('us',    'en', 'United States'),
  ('ca',    'es', 'Canadá'),                   ('ca',    'en', 'Canada'),
  ('es_',   'es', 'España'),                   ('es_',   'en', 'Spain'),
  ('gb',    'es', 'Reino Unido'),              ('gb',    'en', 'United Kingdom'),
  ('de',    'es', 'Alemania'),                 ('de',    'en', 'Germany'),
  ('fr',    'es', 'Francia'),                  ('fr',    'en', 'France'),
  ('other', 'es', 'Otro'),                     ('other', 'en', 'Other')
) as t(slug, locale, label) on t.slug = o.slug
on conflict (option_id, locale) do nothing;

-- ────────────────────────────────────────────────────────────────────────────
-- Company type options (mirrors lib/companyTypesV2.ts).
-- ────────────────────────────────────────────────────────────────────────────
insert into public.demographic_options (field_id, slug, sort_order)
select f.id, o.slug, o.sort_order
from public.demographic_fields f
join (values
  ('corporate',  10),
  ('smb',        20),
  ('startup',    30),
  ('scaleup',    40),
  ('freelance',  50),
  ('public-ngo', 60)
) as o(slug, sort_order) on true
where f.slug = 'company_type'
on conflict (field_id, slug) do nothing;

insert into public.demographic_option_translations (option_id, locale, label)
select o.id, t.locale, t.label
from public.demographic_options o
join public.demographic_fields f on f.id = o.field_id and f.slug = 'company_type'
join (values
  ('corporate',  'es', 'Corporativo · Empresa grande'),
  ('corporate',  'en', 'Corporate · Large company'),
  ('smb',        'es', 'Pyme · Pequeña o mediana'),
  ('smb',        'en', 'SMB · Small or medium'),
  ('startup',    'es', 'Startup · Etapa temprana'),
  ('startup',    'en', 'Startup · Early-stage'),
  ('scaleup',    'es', 'Scale-up · Crecimiento acelerado'),
  ('scaleup',    'en', 'Scale-up · Growing fast'),
  ('freelance',  'es', 'Freelance / Agencia · Independiente'),
  ('freelance',  'en', 'Freelance / Agency · Independent'),
  ('public-ngo', 'es', 'Público / ONG'),
  ('public-ngo', 'en', 'Public / NGO')
) as t(slug, locale, label) on t.slug = o.slug
on conflict (option_id, locale) do nothing;

-- ────────────────────────────────────────────────────────────────────────────
-- Industry options (mirrors lib/industries.ts).
-- ────────────────────────────────────────────────────────────────────────────
insert into public.demographic_options (field_id, slug, sort_order)
select f.id, o.slug, o.sort_order
from public.demographic_fields f
join (values
  ('saas-software',       10),
  ('fintech',             20),
  ('ecommerce',           30),
  ('agency-marketing',    40),
  ('media-content',       50),
  ('healthtech',          60),
  ('edtech-education',    70),
  ('real-estate',         80),
  ('logistics-transport', 90),
  ('food-beverage',      100),
  ('manufacturing',      110),
  ('energy',             120),
  ('consulting',         130),
  ('legal',              140),
  ('hr-recruiting',      150),
  ('travel-tourism',     160),
  ('nonprofit-ngo',      170),
  ('government-public',  180),
  ('other',              999)
) as o(slug, sort_order) on true
where f.slug = 'industry'
on conflict (field_id, slug) do nothing;

insert into public.demographic_option_translations (option_id, locale, label)
select o.id, t.locale, t.label
from public.demographic_options o
join public.demographic_fields f on f.id = o.field_id and f.slug = 'industry'
join (values
  ('saas-software',       'es', 'SaaS / Software'),
  ('saas-software',       'en', 'SaaS / Software'),
  ('fintech',             'es', 'Fintech / Servicios financieros'),
  ('fintech',             'en', 'Fintech / Financial Services'),
  ('ecommerce',           'es', 'E-commerce / Retail'),
  ('ecommerce',           'en', 'E-commerce / Retail'),
  ('agency-marketing',    'es', 'Agencia / Servicios de marketing'),
  ('agency-marketing',    'en', 'Agency / Marketing Services'),
  ('media-content',       'es', 'Medios / Contenido / Editorial'),
  ('media-content',       'en', 'Media / Content / Publishing'),
  ('healthtech',          'es', 'Healthtech / Salud'),
  ('healthtech',          'en', 'Healthtech / Healthcare'),
  ('edtech-education',    'es', 'Edtech / Educación'),
  ('edtech-education',    'en', 'Edtech / Education'),
  ('real-estate',         'es', 'Bienes raíces / Proptech'),
  ('real-estate',         'en', 'Real Estate / Proptech'),
  ('logistics-transport', 'es', 'Logística / Transporte'),
  ('logistics-transport', 'en', 'Logistics / Transportation'),
  ('food-beverage',       'es', 'Alimentos y Bebidas'),
  ('food-beverage',       'en', 'Food & Beverage'),
  ('manufacturing',       'es', 'Manufactura / Industria'),
  ('manufacturing',       'en', 'Manufacturing / Industry'),
  ('energy',              'es', 'Energía / Servicios públicos'),
  ('energy',              'en', 'Energy / Utilities'),
  ('consulting',          'es', 'Consultoría / Servicios profesionales'),
  ('consulting',          'en', 'Consulting / Professional Services'),
  ('legal',               'es', 'Legal / Derecho'),
  ('legal',               'en', 'Legal / Law'),
  ('hr-recruiting',       'es', 'Recursos Humanos / Reclutamiento'),
  ('hr-recruiting',       'en', 'HR / Recruiting'),
  ('travel-tourism',      'es', 'Viajes / Turismo / Hospitalidad'),
  ('travel-tourism',      'en', 'Travel / Tourism / Hospitality'),
  ('nonprofit-ngo',       'es', 'Sin fines de lucro / ONG'),
  ('nonprofit-ngo',       'en', 'Nonprofit / NGO'),
  ('government-public',   'es', 'Gobierno / Sector público'),
  ('government-public',   'en', 'Government / Public Sector'),
  ('other',               'es', 'Otro'),
  ('other',               'en', 'Other')
) as t(slug, locale, label) on t.slug = o.slug
on conflict (option_id, locale) do nothing;

-- ────────────────────────────────────────────────────────────────────────────
-- Salary range options (USD equivalent).
-- ────────────────────────────────────────────────────────────────────────────
insert into public.demographic_options (field_id, slug, sort_order, min_val, max_val)
select f.id, o.slug, o.sort_order, o.min_val, o.max_val
from public.demographic_fields f
join (values
  ('under-20k',          10,      0,   20000),
  ('20k-40k',            20,  20000,   40000),
  ('40k-70k',            30,  40000,   70000),
  ('70k-120k',           40,  70000,  120000),
  ('120k-200k',          50, 120000,  200000),
  ('200k-plus',          60, 200000,    null),
  ('prefer-not-to-say',  99,   null,    null)
) as o(slug, sort_order, min_val, max_val) on true
where f.slug = 'salary_range'
on conflict (field_id, slug) do nothing;

insert into public.demographic_option_translations (option_id, locale, label)
select o.id, t.locale, t.label
from public.demographic_options o
join public.demographic_fields f on f.id = o.field_id and f.slug = 'salary_range'
join (values
  ('under-20k',         'es', 'Menos de $20K USD'),
  ('under-20k',         'en', 'Under $20K USD'),
  ('20k-40k',           'es', '$20K – $40K USD'),
  ('20k-40k',           'en', '$20K – $40K USD'),
  ('40k-70k',           'es', '$40K – $70K USD'),
  ('40k-70k',           'en', '$40K – $70K USD'),
  ('70k-120k',          'es', '$70K – $120K USD'),
  ('70k-120k',          'en', '$70K – $120K USD'),
  ('120k-200k',         'es', '$120K – $200K USD'),
  ('120k-200k',         'en', '$120K – $200K USD'),
  ('200k-plus',         'es', '$200K+ USD'),
  ('200k-plus',         'en', '$200K+ USD'),
  ('prefer-not-to-say', 'es', 'Prefiero no decir'),
  ('prefer-not-to-say', 'en', 'Prefer not to say')
) as t(slug, locale, label) on t.slug = o.slug
on conflict (option_id, locale) do nothing;

-- ────────────────────────────────────────────────────────────────────────────
-- Age range options.
-- ────────────────────────────────────────────────────────────────────────────
insert into public.demographic_options (field_id, slug, sort_order, min_val, max_val)
select f.id, o.slug, o.sort_order, o.min_val, o.max_val
from public.demographic_fields f
join (values
  ('18-24',  10, 18, 24),
  ('25-34',  20, 25, 34),
  ('35-44',  30, 35, 44),
  ('45-54',  40, 45, 54),
  ('55-plus', 50, 55, null)
) as o(slug, sort_order, min_val, max_val) on true
where f.slug = 'age_range'
on conflict (field_id, slug) do nothing;

insert into public.demographic_option_translations (option_id, locale, label)
select o.id, t.locale, t.label
from public.demographic_options o
join public.demographic_fields f on f.id = o.field_id and f.slug = 'age_range'
join (values
  ('18-24',  'es', '18–24 años'),  ('18-24',  'en', '18–24'),
  ('25-34',  'es', '25–34 años'),  ('25-34',  'en', '25–34'),
  ('35-44',  'es', '35–44 años'),  ('35-44',  'en', '35–44'),
  ('45-54',  'es', '45–54 años'),  ('45-54',  'en', '45–54'),
  ('55-plus', 'es', '55+ años'),    ('55-plus', 'en', '55+')
) as t(slug, locale, label) on t.slug = o.slug
on conflict (option_id, locale) do nothing;
