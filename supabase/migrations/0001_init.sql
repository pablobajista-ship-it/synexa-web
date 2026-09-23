-- Esquema inicial de la ticketera en Supabase (Postgres).
--
-- Se aplica con `npm run db:migrate` (ver scripts/migrate.js) o pegándolo en
-- el SQL Editor de Supabase. Es idempotente: se puede correr varias veces.

create table if not exists users (
  id integer generated always as identity primary key,
  name text not null,
  last_name text not null default '',
  email text not null unique,
  phone text,
  company text,
  password_hash text,
  role text not null default 'CLIENT',
  image text,
  provider text not null default 'credentials',
  google_id text unique,
  reset_token text unique,
  reset_token_expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists tickets (
  id integer generated always as identity primary key,
  ticket_number text not null unique,
  user_id integer not null references users(id),
  subject text not null,
  description text not null,
  category text not null,
  service text,
  url text,
  priority text not null default 'NORMAL',
  status text not null default 'NUEVO',
  preferred_contact text not null default 'A través de este ticket',
  device text,
  operating_system text,
  browser text,
  error_message text,
  steps_before_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  closed_at timestamptz
);

create index if not exists tickets_user_id_idx on tickets (user_id);

create table if not exists ticket_messages (
  id integer generated always as identity primary key,
  ticket_id integer not null references tickets(id),
  user_id integer not null references users(id),
  message text not null,
  is_internal boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists ticket_messages_ticket_id_idx on ticket_messages (ticket_id);

create table if not exists attachments (
  id integer generated always as identity primary key,
  ticket_id integer not null references tickets(id),
  message_id integer references ticket_messages(id),
  original_name text not null,
  stored_name text not null,
  mime_type text not null,
  size integer not null,
  -- Ruta del objeto dentro del bucket de Storage: <ticket_number>/<uuid>.<ext>
  path text not null,
  created_at timestamptz not null default now()
);

create index if not exists attachments_ticket_id_idx on attachments (ticket_id);

create table if not exists counters (
  name text primary key,
  value integer not null
);

-- Supabase publica automáticamente las tablas de `public` en su API REST
-- (PostgREST) a cualquiera que tenga la anon key. Con RLS activado y sin
-- políticas, esa API no puede leer ni escribir nada: solo la app, que se
-- conecta directo a Postgres como dueño de las tablas, tiene acceso.
alter table users enable row level security;
alter table tickets enable row level security;
alter table ticket_messages enable row level security;
alter table attachments enable row level security;
alter table counters enable row level security;

-- Bucket privado para los adjuntos. Sin políticas sobre storage.objects, solo
-- la service role key (usada en el servidor) puede subir y descargar.
insert into storage.buckets (id, name, public)
values ('attachments', 'attachments', false)
on conflict (id) do nothing;
