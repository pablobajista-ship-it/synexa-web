function Icon({ children, className = "" }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function IconCheck(props) {
  return (
    <Icon {...props}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </Icon>
  );
}

export function IconArrowRight(props) {
  return (
    <Icon {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Icon>
  );
}

export function IconCart(props) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="20" r="1" fill="currentColor" stroke="none" />
      <circle cx="18" cy="20" r="1" fill="currentColor" stroke="none" />
      <path d="M2 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 7H6" />
    </Icon>
  );
}

export function IconCalendar(props) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </Icon>
  );
}

export function IconUsers(props) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 4.2c1.7.4 3 2 3 3.8s-1.3 3.4-3 3.8M21 20c0-2.8-1.9-5.1-4.5-5.8" />
    </Icon>
  );
}

export function IconLayers(props) {
  return (
    <Icon {...props}>
      <path d="M12 3l8 4.2-8 4.2-8-4.2L12 3z" />
      <path d="M4 12l8 4.2 8-4.2M4 16.2L12 20.4l8-4.2" />
    </Icon>
  );
}

export function IconDatabase(props) {
  return (
    <Icon {...props}>
      <ellipse cx="12" cy="5.5" rx="8" ry="3" />
      <path d="M4 5.5v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      <path d="M4 11.5v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </Icon>
  );
}

export function IconLayout(props) {
  return (
    <Icon {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 9v11" />
    </Icon>
  );
}

export function IconSettings(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H4a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H10a1.7 1.7 0 0 0 1-1.5V4a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V10a1.7 1.7 0 0 0 1.5 1h.2a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1z" />
    </Icon>
  );
}

export function IconTag(props) {
  return (
    <Icon {...props}>
      <path d="M20.6 12.3 12.7 20a2 2 0 0 1-2.8 0l-6-6a2 2 0 0 1 0-2.8L11.7 3.4a2 2 0 0 1 1.4-.6H19a2 2 0 0 1 2 2v5.7a2 2 0 0 1-.4 1.2z" />
      <circle cx="15.5" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function IconLink(props) {
  return (
    <Icon {...props}>
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M11 6.5 12.7 4.8a3.2 3.2 0 0 1 4.5 4.5L15.5 11" />
      <path d="M13 17.5 11.3 19.2a3.2 3.2 0 0 1-4.5-4.5L8.5 13" />
    </Icon>
  );
}

export function IconSliders(props) {
  return (
    <Icon {...props}>
      <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h13M21 18h-1" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="17" cy="18" r="2" />
    </Icon>
  );
}

export function IconSpark(props) {
  return (
    <Icon {...props}>
      <path d="M12 3l1.9 5.3L19 10l-5.1 1.7L12 17l-1.9-5.3L5 10l5.1-1.7L12 3z" />
      <path d="M18.5 15.5l.7 1.9 1.8.6-1.8.6-.7 1.9-.7-1.9-1.8-.6 1.8-.6.7-1.9z" />
    </Icon>
  );
}

export function IconShield(props) {
  return (
    <Icon {...props}>
      <path d="M12 3l7.5 3v5.2c0 4.3-3 8.2-7.5 9.6-4.5-1.4-7.5-5.3-7.5-9.6V6L12 3z" />
      <path d="M9 12.2l2.1 2.1L15.2 10" />
    </Icon>
  );
}

export function IconClock(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.3l3.4 2" />
    </Icon>
  );
}

export function IconX(props) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Icon>
  );
}

export function IconWallet(props) {
  return (
    <Icon {...props}>
      <path d="M3 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2" />
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <circle cx="16.5" cy="14" r="1.2" fill="currentColor" stroke="none" />
    </Icon>
  );
}

/* --- Iconografía para Aplicaciones para Negocios --- */

export function IconPaw(props) {
  return (
    <Icon {...props}>
      <ellipse cx="7" cy="8.5" rx="1.9" ry="2.4" />
      <ellipse cx="12" cy="6.6" rx="1.9" ry="2.5" />
      <ellipse cx="17" cy="8.5" rx="1.9" ry="2.4" />
      <path d="M12 12.4c2.4 0 4.6 1.9 4.6 4 0 1.6-1.2 2.6-2.7 2.6-.9 0-1.3-.4-1.9-.4s-1 .4-1.9.4c-1.5 0-2.7-1-2.7-2.6 0-2.1 2.2-4 4.6-4z" />
    </Icon>
  );
}

export function IconPulse(props) {
  return (
    <Icon {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M6.5 12.5h2.8l1.5-3.4 2.2 6 1.5-2.6h3" />
    </Icon>
  );
}

export function IconWrench(props) {
  return (
    <Icon {...props}>
      <path d="M15.6 3.6a5.2 5.2 0 0 0-6.2 6.7l-5.6 5.6a2 2 0 0 0 0 2.8l1.5 1.5a2 2 0 0 0 2.8 0l5.6-5.6a5.2 5.2 0 0 0 6.7-6.2l-3 3-2.8-.7-.7-2.8 3-3z" />
    </Icon>
  );
}

export function IconRoute(props) {
  return (
    <Icon {...props}>
      <circle cx="6" cy="5.5" r="2.5" />
      <circle cx="18" cy="18.5" r="2.5" />
      <path d="M8.5 5.5H14a3.5 3.5 0 0 1 0 7h-4a3.5 3.5 0 0 0 0 7h5.5" />
    </Icon>
  );
}

export function IconFile(props) {
  return (
    <Icon {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" />
      <path d="M14 3v5h5M9 13h6M9 16.5h4" />
    </Icon>
  );
}

export function IconClipboard(props) {
  return (
    <Icon {...props}>
      <path d="M9 4.5H7.5a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V6.5a2 2 0 0 0-2-2H15" />
      <rect x="9" y="2.8" width="6" height="3.4" rx="1" />
      <path d="M9 11.5h6M9 15h4" />
    </Icon>
  );
}

export function IconBell(props) {
  return (
    <Icon {...props}>
      <path d="M18 8.6a6 6 0 1 0-12 0c0 5-2 6.4-2 6.4h16s-2-1.4-2-6.4z" />
      <path d="M10.3 19a2 2 0 0 0 3.4 0" />
    </Icon>
  );
}

export function IconChart(props) {
  return (
    <Icon {...props}>
      <path d="M4 20V4M4 20h16" />
      <path d="M8 16.5V12M12 16.5V7.5M16.5 16.5v-6" />
    </Icon>
  );
}

export function IconFolder(props) {
  return (
    <Icon {...props}>
      <path d="M3 7.5a2 2 0 0 1 2-2h3.6l2 2.4H19a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7.5z" />
    </Icon>
  );
}

export function IconMonitor(props) {
  return (
    <Icon {...props}>
      <rect x="2.5" y="4" width="19" height="12.5" rx="2" />
      <path d="M9 20.5h6M12 16.5v4" />
    </Icon>
  );
}

export function IconTablet(props) {
  return (
    <Icon {...props}>
      <rect x="5" y="2.5" width="14" height="19" rx="2.2" />
      <path d="M10.7 18.6h2.6" />
    </Icon>
  );
}

export function IconPhone(props) {
  return (
    <Icon {...props}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
      <path d="M10.8 18.6h2.4" />
    </Icon>
  );
}

export function IconMail(props) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6 8.5-6" />
    </Icon>
  );
}

export function IconGrid(props) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
    </Icon>
  );
}

export function IconLock(props) {
  return (
    <Icon {...props}>
      <rect x="4.5" y="10" width="15" height="10.5" rx="2" />
      <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
      <circle cx="12" cy="15.2" r="1.2" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function IconCard(props) {
  return (
    <Icon {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.2" />
      <path d="M2.5 9.8h19M6 15h3.5" />
    </Icon>
  );
}

/* --- Iconografía de infraestructura --- */

export function IconServer(props) {
  return (
    <Icon {...props}>
      <rect x="3" y="4" width="18" height="6.5" rx="1.8" />
      <rect x="3" y="13.5" width="18" height="6.5" rx="1.8" />
      <path d="M6.8 7.25h.01M6.8 16.75h.01" strokeWidth="2.4" />
      <path d="M10.5 7.25h4M10.5 16.75h4" />
    </Icon>
  );
}

export function IconGlobe(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.3 9.5h17.4M3.3 14.5h17.4" />
      <path d="M12 3c2.4 2.6 3.6 5.6 3.6 9s-1.2 6.4-3.6 9c-2.4-2.6-3.6-5.6-3.6-9S9.6 5.6 12 3z" />
    </Icon>
  );
}

export function IconExternal(props) {
  return (
    <Icon {...props}>
      <path d="M14 4h6v6" />
      <path d="M20 4l-8.5 8.5" />
      <path d="M18 13.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5.5" />
    </Icon>
  );
}

export function IconPlus(props) {
  return (
    <Icon {...props}>
      <path d="M12 5v14M5 12h14" />
    </Icon>
  );
}

export function IconEquals(props) {
  return (
    <Icon {...props}>
      <path d="M5 9.5h14M5 14.5h14" />
    </Icon>
  );
}

export function IconArrowDown(props) {
  return (
    <Icon {...props}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </Icon>
  );
}
