import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";

// Los adjuntos se guardan en Supabase Storage, en un bucket privado (creado en
// supabase/migrations/0001_init.sql). El cliente usa la service role key, que
// salta las políticas de Storage: nunca debe llegar al navegador. Los archivos
// solo se sirven a través de /api/attachments/[id], que valida el acceso.
const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "attachments";
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8 MB

const ALLOWED_TYPES = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "application/pdf": ".pdf",
  "text/plain": ".txt",
};

export class UploadError extends Error {}

function storage() {
  const globalForStorage = globalThis;
  if (!globalForStorage.__ticketeraStorage) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error("[ticketera] Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
    }
    globalForStorage.__ticketeraStorage = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    }).storage.from(BUCKET);
  }
  return globalForStorage.__ticketeraStorage;
}

// Valida los archivos antes de crear nada en la base, para no dejar tickets o
// mensajes a medias cuando un adjunto no es válido.
export function validateUploadedFile(file) {
  if (!(file instanceof File)) {
    throw new UploadError("Archivo inválido.");
  }
  if (file.size === 0) {
    throw new UploadError("El archivo está vacío.");
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new UploadError(`El archivo "${file.name}" supera el tamaño máximo permitido (8MB).`);
  }
  if (!ALLOWED_TYPES[file.type]) {
    throw new UploadError(
      `Tipo de archivo no permitido: "${file.name}". Solo se aceptan PNG, JPG, PDF y TXT.`
    );
  }
}

export async function saveUploadedFile(file, ticketNumber) {
  validateUploadedFile(file);

  const storedName = `${crypto.randomUUID()}${ALLOWED_TYPES[file.type]}`;
  const objectPath = `${ticketNumber}/${storedName}`;

  const { error } = await storage().upload(objectPath, await file.arrayBuffer(), {
    contentType: file.type,
    upsert: false,
  });
  if (error) {
    throw new Error(`[ticketera] No se pudo subir el adjunto a Storage: ${error.message}`);
  }

  return {
    originalName: file.name.slice(0, 200),
    storedName,
    mimeType: file.type,
    size: file.size,
    filePath: objectPath,
  };
}

export async function readUploadedFile(objectPath) {
  const { data, error } = await storage().download(objectPath);
  if (error) {
    throw new Error(`[ticketera] No se pudo leer el adjunto de Storage: ${error.message}`);
  }
  return Buffer.from(await data.arrayBuffer());
}
