-- Consultas comerciales recibidas desde /contacto.
--
-- Son prospectos, NO tickets de soporte (tablas tickets/ticket_messages). Solo la
-- app, conectada directo a Postgres, puede leerlas: con RLS activado y sin
-- políticas, la API REST pública de Supabase no puede ver ni escribir nada.
-- Idempotente: se puede correr varias veces.

create table if not exists contact_inquiries (
  id integer generated always as identity primary key,
  name text not null,
  email text not null,
  company text,
  phone text,
  service text not null,
  message text not null,
  -- Página o paquete desde donde llegó (slug validado), p. ej. paquete-web-pyme.
  source text,
  status text not null default 'NUEVA',
  consent_at timestamptz not null,
  -- Hash (SHA-256 con sal) de la IP: solo para límite de frecuencia, nunca la IP.
  ip_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contact_inquiries_status_idx on contact_inquiries (status, created_at desc);
create index if not exists contact_inquiries_ip_idx on contact_inquiries (ip_hash, created_at);

create table if not exists contact_inquiry_events (
  id integer generated always as identity primary key,
  inquiry_id integer not null references contact_inquiries(id) on delete cascade,
  status text not null,
  note text,
  user_id integer references users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists contact_inquiry_events_inquiry_idx on contact_inquiry_events (inquiry_id);

alter table contact_inquiries enable row level security;
alter table contact_inquiry_events enable row level security;
