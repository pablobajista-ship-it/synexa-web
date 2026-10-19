/** Ruta de un archivo de public/assets respetando el `base` de Vite (publicación bajo subdirectorio). */
export const rutaAsset = (ruta: string) => `${import.meta.env.BASE_URL}${ruta.replace(/^\//, "")}`;
