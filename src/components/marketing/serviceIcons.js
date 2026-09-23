import {
  IconCart,
  IconCalendar,
  IconUsers,
  IconLayers,
  IconDatabase,
  IconLayout,
  IconSettings,
  IconTag,
  IconLink,
  IconSliders,
  IconSpark,
} from "@/components/marketing/icons";

/**
 * Resuelve el ícono de un servicio a partir de una clave de texto.
 *
 * Existe para que src/data/servicesPricing.js sea datos puros (`icon: "cart"`)
 * y no tenga que importar componentes de React — exactamente lo que hará falta
 * el día que los servicios vengan de la base de datos o de una API.
 */
export default function ServiceIcon({ name, className = "" }) {
  switch (name) {
    case "cart":
      return <IconCart className={className} />;
    case "calendar":
      return <IconCalendar className={className} />;
    case "users":
      return <IconUsers className={className} />;
    case "database":
      return <IconDatabase className={className} />;
    case "layout":
      return <IconLayout className={className} />;
    case "settings":
      return <IconSettings className={className} />;
    case "tag":
      return <IconTag className={className} />;
    case "link":
      return <IconLink className={className} />;
    case "sliders":
      return <IconSliders className={className} />;
    case "spark":
      return <IconSpark className={className} />;
    case "layers":
    default:
      return <IconLayers className={className} />;
  }
}
