import path from "node:path";
import fs from "node:fs/promises";
import crypto from "node:crypto";

// Ruta fija (no vía env var) para que el bundler pueda acotar el tracing de
// archivos al desplegar; ver src/lib/uploads.js en el README si hace falta
// moverla a almacenamiento en la nube más adelante.
const UPLOADS_ROOT = "uploads";
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8 MB

const ALLOWED_TYPES = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "application/pdf": ".pdf",
  "text/plain": ".txt",
};

export class UploadError extends Error {}

export async function saveUploadedFile(file, ticketNumber) {
  if (!(file instanceof File)) {
    throw new UploadError("Archivo inválido.");
  }
  if (file.size === 0) {
    throw new UploadError("El archivo está vacío.");
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new UploadError(`El archivo "${file.name}" supera el tamaño máximo permitido (8MB).`);
  }

  const extension = ALLOWED_TYPES[file.type];
  if (!extension) {
    throw new UploadError(
      `Tipo de archivo no permitido: "${file.name}". Solo se aceptan PNG, JPG, PDF y TXT.`
    );
  }

  const dir = path.join(process.cwd(), UPLOADS_ROOT, ticketNumber);
  await fs.mkdir(dir, { recursive: true });

  const storedName = `${crypto.randomUUID()}${extension}`;
  const absolutePath = path.join(dir, storedName);
  const relativePath = path.join(UPLOADS_ROOT, ticketNumber, storedName);

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(absolutePath, buffer);

  return {
    originalName: file.name.slice(0, 200),
    storedName,
    mimeType: file.type,
    size: file.size,
    filePath: relativePath,
  };
}

export function resolveUploadPath(relativePath) {
  return path.resolve(process.cwd(), relativePath);
}
