import {
  IconUsers,
  IconCalendar,
  IconLayers,
  IconLink,
  IconClock,
  IconPaw,
  IconPulse,
  IconWrench,
  IconRoute,
  IconFile,
  IconClipboard,
  IconBell,
  IconChart,
  IconFolder,
  IconMonitor,
  IconTablet,
  IconPhone,
  IconMail,
  IconGrid,
  IconLock,
  IconCard,
  IconServer,
  IconGlobe,
  IconSpark,
  IconShield,
  IconWallet,
  IconDatabase,
} from "@/components/marketing/icons";

/**
 * Resuelve el ícono de una aplicación, módulo o integración a partir de una
 * clave de texto, para que src/data/businessApplications.js sea datos puros.
 * Mismo patrón que serviceIcons.js.
 */
export default function AppIcon({ name, className = "" }) {
  switch (name) {
    case "users":
      return <IconUsers className={className} />;
    case "calendar":
      return <IconCalendar className={className} />;
    case "link":
      return <IconLink className={className} />;
    case "clock":
      return <IconClock className={className} />;
    case "paw":
      return <IconPaw className={className} />;
    case "pulse":
      return <IconPulse className={className} />;
    case "wrench":
      return <IconWrench className={className} />;
    case "route":
      return <IconRoute className={className} />;
    case "file":
      return <IconFile className={className} />;
    case "clipboard":
      return <IconClipboard className={className} />;
    case "bell":
      return <IconBell className={className} />;
    case "chart":
      return <IconChart className={className} />;
    case "folder":
      return <IconFolder className={className} />;
    case "monitor":
      return <IconMonitor className={className} />;
    case "tablet":
      return <IconTablet className={className} />;
    case "phone":
      return <IconPhone className={className} />;
    case "mail":
      return <IconMail className={className} />;
    case "grid":
      return <IconGrid className={className} />;
    case "lock":
      return <IconLock className={className} />;
    case "card":
      return <IconCard className={className} />;
    case "server":
      return <IconServer className={className} />;
    case "globe":
      return <IconGlobe className={className} />;
    case "spark":
      return <IconSpark className={className} />;
    case "shield":
      return <IconShield className={className} />;
    case "wallet":
      return <IconWallet className={className} />;
    case "database":
      return <IconDatabase className={className} />;
    case "layers":
    default:
      return <IconLayers className={className} />;
  }
}
