/**
 * Ejemplos ilustrativos de /aplicaciones-para-negocios.
 *
 * Son ideas de lo que SYNEXA puede construir, no proyectos reales ni
 * productos a la venta. Esta página no muestra precios: los precios viven
 * solo en /servicios-y-precios.
 *
 * `image`: foto (generada con FAL o reutilizada del Showroom) o captura real
 * de una demo (`demo: true`). Sin `image`, la tarjeta usa un encabezado con ícono.
 * `functions[].optional`: función que depende del alcance contratado.
 */

export const APP_GROUPS = [
  { id: "todos", label: "Todos" },
  { id: "vender", label: "Mostrar y vender" },
  { id: "reservas", label: "Reservas y atención" },
  { id: "gestion", label: "Gestión empresarial" },
];

const IMG = "/images/aplicaciones";

/** Los seis primeros se muestran al entrar; el resto, con «Ver más aplicaciones». */
export const APP_EXAMPLES = [
  {
    id: "minimarket",
    service: "catalogo",
    group: "vender",
    sector: "Minimarket",
    title: "Presenta tus productos y facilita los pedidos",
    text: "Una página web muestra tus productos, fotografías, promociones y los datos del local.",
    example: "Un cliente revisa desde su celular lo que hay disponible y envía una consulta o un pedido.",
    functions: [{ label: "Catálogo digital" }, { label: "Consultas o pedidos" }, { label: "Venta online", optional: true }],
    flow: ["Visita la web", "Revisa productos", "Envía su pedido"],
    image: `${IMG}/minimarket.webp`,
    alt: "Fachada de un minimarket de barrio con productos a la vista",
  },
  {
    id: "bicicletas",
    service: "catalogo",
    group: "vender",
    sector: "Tienda de bicicletas",
    title: "Convierte tu catálogo en una vitrina digital",
    text: "El cliente revisa modelos, compara características y conoce los productos antes de ir al local.",
    example: "Una solución más completa puede sumar carrito de compras y pago online.",
    functions: [{ label: "Galería de productos" }, { label: "Fichas de bicicletas" }, { label: "Comercio electrónico", optional: true }],
    flow: ["Explora modelos", "Compara fichas", "Consulta o compra"],
    image: `${IMG}/bicicletas.webp`,
    alt: "Ciclista de montaña en pleno salto sobre un sendero de bosque",
  },
  {
    id: "veterinarias",
    service: "reservas",
    group: "reservas",
    sector: "Veterinarias",
    title: "Organiza la atención de tus pacientes y sus dueños",
    text: "El sitio muestra tus servicios y profesionales y recibe solicitudes de atención. Con más alcance, una aplicación puede administrar citas y fichas de mascotas.",
    example: "Una agenda ordena las horas; una gestión completa también guarda el historial de cada mascota.",
    functions: [{ label: "Servicios veterinarios" }, { label: "Agenda de atención" }, { label: "Gestión de fichas", optional: true }],
    flow: ["Pide una hora", "Se agenda la visita", "Recibe confirmación"],
    image: `${IMG}/veterinaria.webp`,
    alt: "Veterinario revisando a un perro golden retriever en una consulta luminosa",
  },
  {
    id: "clinicas",
    service: "reservas",
    group: "reservas",
    sector: "Clínicas y centros profesionales",
    title: "Facilita las reservas y presenta tus servicios",
    text: "Los visitantes conocen especialidades, profesionales y horarios. Según el alcance, pueden solicitar o reservar una hora.",
    example: "El manejo de datos clínicos sensibles requiere un proyecto específico, con controles de seguridad y privacidad.",
    functions: [{ label: "Presentación de servicios" }, { label: "Perfiles profesionales" }, { label: "Reserva de horas", optional: true }],
    flow: ["Elige especialidad", "Selecciona horario", "Recibe confirmación"],
    image: `${IMG}/clinica.webp`,
    alt: "Profesional de la salud conversando con un paciente en una consulta",
  },
  {
    id: "estetica",
    service: "reservas",
    group: "reservas",
    sector: "Peluquerías y centros de estética",
    title: "Permite que tus clientes soliciten o reserven una hora",
    text: "El cliente revisa los servicios y elige la atención que necesita.",
    example: "Con un sistema de reservas integrado, ve los horarios disponibles y recibe una confirmación.",
    functions: [{ label: "Catálogo de servicios" }, { label: "Agenda" }, { label: "Gestión de reservas", optional: true }],
    flow: ["Elige un servicio", "Selecciona horario", "Recibe confirmación"],
    image: `${IMG}/estetica.webp`,
    alt: "Centro de estética con sillón de tratamiento y profesional preparando la atención",
  },
  {
    id: "talleres",
    service: "aplicacion",
    group: "gestion",
    sector: "Talleres automotrices",
    title: "Organiza reparaciones y atención al cliente",
    text: "Una web muestra tus servicios y recibe solicitudes de evaluación. Una aplicación aparte puede gestionar las órdenes de trabajo.",
    example: "Un vehículo ingresa, se registra la evaluación y el estado de la reparación se va actualizando.",
    functions: [{ label: "Solicitudes de atención" }, { label: "Órdenes de trabajo", optional: true }, { label: "Seguimiento de reparaciones", optional: true }],
    flow: ["Ingresa el vehículo", "Se registra el trabajo", "Se actualiza su estado"],
    image: `${IMG}/taller.webp`,
    alt: "Mecánico con una tablet revisando un auto en un taller ordenado",
  },
  {
    id: "tienda-online",
    service: "tienda-online",
    group: "vender",
    sector: "Tiendas online",
    title: "Vende tus productos por internet",
    text: "Una tienda online reúne catálogo, carrito y proceso de compra, con los pedidos ordenados en un panel.",
    example: "Ejemplo de demostración de SYNEXA: una tienda de mascotas con carrito y pedidos.",
    functions: [{ label: "Catálogo y carrito" }, { label: "Pago online" }, { label: "Gestión de pedidos" }],
    flow: ["Elige un producto", "Agrega al carrito", "Realiza la compra"],
    image: `${IMG}/demo-huella-viva.webp`,
    demo: true,
    alt: "Captura de una demostración de tienda online de mascotas",
  },
  {
    id: "servicios-tecnicos",
    service: "aplicacion",
    group: "gestion",
    sector: "Empresas de servicios técnicos",
    title: "Administra solicitudes y trabajos en terreno",
    text: "La empresa recibe solicitudes desde su web y, con una aplicación interna, organiza las visitas técnicas.",
    example: "Cada visita queda asignada a un técnico y su avance se puede seguir en una sola pantalla.",
    functions: [{ label: "Formularios" }, { label: "Asignación de trabajos" }, { label: "Seguimiento de servicios" }],
    flow: ["Llega la solicitud", "Se asigna un técnico", "Se registra el avance"],
    image: `${IMG}/servicios.webp`,
    alt: "Técnicos con casco revisando maquinaria industrial",
  },
  {
    id: "empresas",
    service: "aplicacion",
    group: "gestion",
    sector: "Empresas y oficinas",
    title: "Centraliza clientes y procesos administrativos",
    text: "Una aplicación reúne información, solicitudes, documentos y estados de trabajo.",
    example: "Un cliente solicita un servicio, la empresa lo registra y administra su avance desde un panel.",
    functions: [{ label: "Portal de clientes" }, { label: "Gestión de solicitudes" }, { label: "Panel administrativo" }],
    flow: ["Cliente hace una solicitud", "Se registra en el panel", "Se informa el avance"],
    image: `${IMG}/oficina.webp`,
    alt: "Equipo trabajando en una oficina moderna con varios computadores",
  },
  {
    id: "portal-clientes",
    service: "portal-clientes",
    group: "gestion",
    sector: "Portal de clientes",
    title: "Un espacio privado para cada cliente",
    text: "Cada cliente accede con su cuenta para ver su información, documentos y solicitudes.",
    example: "Ejemplo de demostración de SYNEXA: un estudio de arquitectura con área privada para sus clientes.",
    functions: [{ label: "Acceso con cuenta" }, { label: "Documentos y archivos" }, { label: "Solicitudes y estados" }],
    flow: ["Inicia sesión", "Consulta su información", "Revisa sus solicitudes"],
    image: `${IMG}/demo-trama.webp`,
    demo: true,
    alt: "Captura de una demostración de estudio de arquitectura con portal de clientes",
  },
  {
    id: "inventario",
    service: "personalizado",
    group: "gestion",
    sector: "Sistemas internos de gestión",
    title: "Ordena los procesos propios de tu empresa",
    text: "Aplicaciones a medida para inventarios, tareas, documentos y reportes que hoy viven en planillas.",
    example: "Ejemplo de demostración de SYNEXA: un panel de bodega con stock, movimientos y alertas.",
    functions: [{ label: "Panel de control" }, { label: "Usuarios y permisos" }, { label: "Reportes" }],
    flow: ["Se registra un movimiento", "Se actualiza el panel", "Se revisan reportes"],
    image: `${IMG}/demo-rutastock.webp`,
    demo: true,
    alt: "Captura de una demostración de panel de inventario para una distribuidora",
  },
  {
    id: "cotizaciones",
    service: "aplicacion",
    group: "gestion",
    sector: "Cotizaciones y gestión comercial",
    title: "Del borrador al documento enviado, con seguimiento",
    text: "Arma cotizaciones con tus productos y servicios, genera el documento y sigue en qué estado está cada una.",
    example: "Más adelante, una cotización aceptada puede convertirse en un proyecto u orden de trabajo.",
    functions: [{ label: "Cotizaciones en PDF" }, { label: "Estados y seguimiento" }, { label: "Clientes y productos" }],
    flow: ["Se arma la cotización", "Se envía al cliente", "Se sigue su estado"],
    icon: "clipboard",
  },
];

export const FIRST_VISIBLE = 6;

/** ¿Qué puede hacer una solución digital? */
export const APP_CAPABILITIES = [
  {
    icon: "globe",
    title: "Mostrar tu negocio",
    text: "Una página web presenta tus servicios, productos, información comercial y formas de contacto.",
    example: "Una empresa de mantención muestra sus servicios y recibe solicitudes de visita.",
  },
  {
    icon: "card",
    title: "Vender o recibir reservas",
    text: "Una tienda online, un catálogo digital o un sistema de reservas facilita la atención y la venta.",
    example: "Una tienda de bicicletas muestra sus productos y, según la solución, permite comprar.",
  },
  {
    icon: "layers",
    title: "Organizar tu empresa",
    text: "Una aplicación web ayuda a administrar clientes, documentos, órdenes de trabajo y procesos.",
    example: "Un taller consulta sus órdenes y revisa el estado de cada reparación.",
  },
];

/** Diferencia entre una web y una aplicación (sin tecnicismos). */
export const APP_LEVELS = [
  { icon: "monitor", title: "Página web", text: "Presenta tu negocio, tus servicios y tu información comercial." },
  { icon: "wallet", title: "Catálogo o tienda online", text: "Muestra productos y, con comercio electrónico, permite comprar." },
  { icon: "calendar", title: "Sistema de reservas", text: "Administra disponibilidad y citas, cuando incluye esa función." },
  { icon: "grid", title: "Aplicación empresarial", text: "Administra información, usuarios, procesos y tareas internas." },
  { icon: "spark", title: "Sistema a medida", text: "Construye funciones especiales para necesidades particulares." },
];

/** Notas breves que reemplazan roles, dispositivos, integraciones y seguridad. */
export const APP_NOTES = [
  { icon: "users", title: "Permisos por persona", text: "Cada persona accede solo a las herramientas e información que necesita, según los permisos configurados." },
  { icon: "tablet", title: "En cualquier dispositivo", text: "Tu solución puede diseñarse para usarse desde computadores, tablets y celulares." },
  { icon: "link", title: "Conexión con otros servicios", text: "Algunos sistemas pueden conectarse con servicios externos, según la viabilidad y el alcance del proyecto." },
  { icon: "shield", title: "Información protegida", text: "Consideramos autenticación, privacidad y permisos para proteger la información de tu negocio." },
];
