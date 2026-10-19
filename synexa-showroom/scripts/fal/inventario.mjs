/**
 * Inventario de imágenes FAL de SYNEXA Showroom (Paso 4).
 * Solo describe QUÉ se generaría. No llama a FAL ni usa FAL_KEY.
 *
 * Cada imagen: { empresa, id, tipo, uso, prompt, modelo, w, h, archivo, aprobacion }.
 * Los prompts van en inglés (mejor adherencia de los modelos). Regla común: sin
 * texto, sin logotipos, sin marcas de agua dentro de la imagen.
 */

// ---------------------------------------------------------------- Modelos
// Precios verificados en las páginas de FAL el 2026-10-18; pueden cambiar.
export const MODELOS = {
  flux2pro: {
    endpoint: "fal-ai/flux-2-pro",
    nombre: "FLUX.2 [pro]",
    // $0.03 el primer megapíxel + $0.015 por cada megapíxel adicional (entrada + salida).
    precio: (w, h, redondeo) => {
      const mp = (w * h) / 1e6;
      const n = Math.max(1, redondeo(mp));
      return 0.03 + 0.015 * (n - 1);
    },
  },
  nano2k: {
    endpoint: "fal-ai/nano-banana-2",
    nombre: "Nano Banana 2 (2K)",
    resolucion: "2K",
    precio: () => 0.12,
  },
  nano: {
    endpoint: "fal-ai/nano-banana-2",
    nombre: "Nano Banana 2 (1K)",
    resolucion: "1K",
    // $0.08 por imagen a 1K. Admite hasta 14 imágenes de referencia (consistencia de personajes/producto).
    precio: () => 0.08,
  },
};

// ---------------------------------------------------------------- Formatos
export const FORMATOS = {
  hero: { ar: "16:9", w: 1792, h: 1008, uso: "Hero de portada" },
  banner: { ar: "21:9", w: 1920, h: 822, uso: "Banner panorámico" },
  tarjeta: { ar: "4:3", w: 1536, h: 1152, uso: "Tarjeta / galería" },
  vertical: { ar: "3:4", w: 1152, h: 1536, uso: "Imagen vertical" },
  cuadrada: { ar: "1:1", w: 1024, h: 1024, uso: "Producto / avatar" },
};

const BASE = "Professional commercial photograph, ultra-detailed, realistic textures, natural color grading. No visible text, lettering, logos, brand emblems, badges or watermarks anywhere in the image. Any vehicles or products are generic and fictional, with no real-world brand identity.";

const img = (id, tipo, uso, subject, extra = {}) => ({ id, tipo, uso, subject, ...extra });
const productos = (prefijo, lista, uso) => lista.map((s, i) => img(`${prefijo}-${String(i + 1).padStart(2, "0")}`, "cuadrada", uso, `${s}, product photography on a clean seamless studio background, soft shadow`));
const retrato = (id, uso, s) => img(id, "vertical", uso, `Corporate headshot of a fictional ${s}, looking at camera, natural smile`, { modelo: "nano", w: 1024, h: 1365 });

// ---------------------------------------------------------------- Empresas
export const EMPRESAS = [
  {
    id: "brillo-car", nombre: "BrilloCar Detailing", piloto: true,
    estilo: "premium automotive photography, dramatic low-key studio lighting, deep graphite tones with electric blue rim light, glossy reflections, shallow depth of field",
    imagenes: [
      img("hero", "hero", "Hero de la landing", "A dark metallic sports sedan with a flawless mirror-finish paint in a clean detailing garage, electric blue light strips reflecting on the hood, wide cinematic composition with empty space on the left"),
      img("banner-capot", "banner", "Banner de beneficios", "Extreme close-up of a perfectly polished car hood with water beads and blue light reflections"),
      img("interior", "tarjeta", "Servicio interior", "Immaculate premium car interior, black leather seats and steering wheel, soft side light"),
      img("profesional", "tarjeta", "Quién lo hace", "A detailing professional in dark uniform applying ceramic coating to a car door with a microfiber applicator, focused, garage background"),
      img("antes", "tarjeta", "Antes / después", "The same grey hatchback with dull, swirl-marked, dusty paint under harsh fluorescent light, side three-quarter view", { modelo: "nano", w: 1024, h: 768 }),
      img("despues", "tarjeta", "Antes / después", "The same grey hatchback after professional detailing, deep glossy paint, side three-quarter view, same angle and garage", { modelo: "nano", w: 1024, h: 768, ref: "antes" }),
      img("galeria-1", "tarjeta", "Galería de resultados", "White SUV with glossy ceramic-coated paint, water beading, evening garage light"),
      img("galeria-2", "tarjeta", "Galería de resultados", "Red coupe wheel and brake caliper cleaned and shining, close-up"),
      img("galeria-3", "tarjeta", "Galería de resultados", "Black pickup truck polished to a mirror finish outdoors at golden hour"),
    ],
  },
  {
    id: "molino-sur", nombre: "Molino Sur",
    estilo: "warm artisan food and lifestyle photography, soft morning window light, cream, coffee-brown and terracotta palette, rustic wood and linen textures",
    imagenes: [
      img("hero", "hero", "Hero de inicio", "Freshly baked sourdough loaves on a wooden counter in an artisan bakery, warm morning light, steam, flour dust"),
      img("banner", "banner", "Banner de horarios", "Wide view of a boutique bakery cafe interior with pastry display and hanging lamps"),
      img("fachada", "vertical", "Ubicación", "Charming boutique bakery storefront with wooden facade, green plants and terracotta tones, morning light"),
      img("cafeteria", "tarjeta", "Nosotros", "Cozy cafe interior with wooden tables, ceramic cups and large window"),
      img("pasteleria", "tarjeta", "Productos destacados", "Gourmet pastries and croissants on a ceramic plate, soft natural light"),
      img("barista", "tarjeta", "Café", "Barista pouring latte art in a ceramic cup, hands and cup in focus, warm tones"),
      img("pan-rustico", "cuadrada", "Producto", "Rustic bread loaf with a crisp scored crust on linen cloth"),
      img("galeria", "tarjeta", "Galería", "Display shelf of artisan breads and buns in a bakery"),
    ],
  },
  {
    id: "novasur", nombre: "NovaSur Ingeniería", piloto: true,
    estilo: "corporate industrial photography, overcast diffused daylight, petrol blue and steel grey palette, clean modern facilities, wide-angle documentary composition",
    imagenes: [
      img("hero", "hero", "Hero corporativo", "Modern industrial plant at blue hour with engineers in white helmets and high-visibility vests walking in the foreground, steel structures, wide cinematic"),
      img("banner", "banner", "Banner de servicios", "Panoramic view of a modern industrial installation with pipes and tanks under a clear sky"),
      img("ingenieros", "tarjeta", "Quiénes somos", "Two engineers in safety helmets reviewing blueprints on a tablet inside a plant"),
      img("proyecto-1", "tarjeta", "Ficha de proyecto", "Newly built industrial warehouse exterior with steel cladding"),
      img("proyecto-2", "tarjeta", "Ficha de proyecto", "Electrical substation with transformers and cable trays, clean and organized"),
      img("proyecto-3", "tarjeta", "Ficha de proyecto", "Industrial maintenance work on a large pump system by technicians"),
      img("equipamiento", "tarjeta", "Servicios", "Close-up of technical measuring equipment and tools laid out on a workbench"),
      retrato("equipo-1", "Equipo profesional", "male civil engineer in a navy polo, plain light-grey background"),
      retrato("equipo-2", "Equipo profesional", "female electrical engineer in a navy blazer, plain light-grey background"),
    ],
  },
  {
    id: "arista", nombre: "Arista Propiedades",
    estilo: "luxury real estate photography, bright natural light, deep navy and warm gold accents in styling, clean architectural lines, wide-angle interiors",
    imagenes: [
      img("hero", "hero", "Hero", "Contemporary two-storey house at dusk with warm glowing windows and landscaped garden, wide cinematic"),
      img("banner", "banner", "Banner de búsqueda", "Panoramic skyline of a modern residential district with premium apartment towers at golden hour"),
      ...[
        "Modern white house with a large terrace and pool", "Premium apartment building facade with glass balconies", "Minimalist townhouse with wood and concrete facade",
        "Suburban contemporary house with a double garage and lawn", "Penthouse terrace with city view at sunset", "Family house with a pitched roof and a garden",
        "Loft style apartment building brick facade", "Beachfront modern apartment building",
      ].map((s, i) => img(`propiedad-${i + 1}`, "tarjeta", "Listado de propiedades", s)),
      img("living", "vertical", "Ficha / galería", "Bright designer living room with neutral sofa, large windows and warm wood floor"),
      img("cocina", "vertical", "Ficha / galería", "Designer kitchen with island, marble countertop and pendant lights"),
      img("dormitorio", "vertical", "Ficha / galería", "Calm master bedroom with linen bedding and city view"),
      retrato("agente", "Equipo comercial", "real estate agent in a dark suit, plain neutral background"),
    ],
  },
  {
    id: "punto-barrio", nombre: "Punto Barrio Market",
    estilo: "bright and friendly retail photography, clean daylight, green, white and orange palette, generic unbranded packaging only",
    imagenes: [
      img("hero", "hero", "Hero", "Modern neighborhood minimarket storefront with fresh produce displayed outside, friendly daylight"),
      img("banner", "banner", "Banner de categorías", "Aisle of a tidy neighborhood grocery store with organized shelves of generic unbranded products"),
      img("abarrotes", "tarjeta", "Categoría", "Shelves of pantry staples: rice, pasta, legumes in plain unbranded packaging"),
      img("frutas", "tarjeta", "Categoría", "Colorful display of fresh fruits and vegetables in wooden crates"),
      ...productos("producto", [
        "Bunch of ripe bananas", "Red apples in a pile", "Tomatoes on the vine", "Fresh lettuce head", "Carrots bunch", "Potatoes in a mesh bag",
        "Plain white bread loaf in clear bag", "Carton of milk with plain generic label", "Dozen brown eggs in a carton", "Block of generic cheese",
        "Glass bottle of orange juice, no label", "Plain bottled water", "Generic cola-style bottle without label", "Bag of rice, plain packaging", "Spaghetti pasta in plain packaging",
        "Olive oil bottle, plain label", "Plain cereal box with abstract colors", "Canned tomatoes, plain label", "Jar of jam, plain label", "Bag of sugar, plain packaging",
        "Cleaning spray bottle, plain label", "Roll of paper towels", "Coffee jar, plain label", "Packaged cookies in plain wrapper",
      ], "Catálogo de productos"),
    ],
  },
  {
    id: "vertice-bikes", nombre: "Vértice Bikes",
    estilo: "high-contrast sports product photography, matte black studio backdrop with sporty green accent light, crisp reflections, dynamic",
    imagenes: [
      img("hero", "hero", "Hero", "Mountain biker mid-jump on a forest trail at golden hour, motion, dramatic light, space on the left for text"),
      img("banner", "banner", "Banner", "Row of bicycles of different types in a modern bike shop with black walls"),
      img("urbana", "tarjeta", "Lifestyle", "Urban commuter bicycle leaning on a wall in a city street at dawn"),
      img("ruta", "tarjeta", "Lifestyle", "Road cyclist climbing a mountain road, wide landscape"),
      ...productos("bici", [
        "Full-suspension mountain bike, black and green frame", "Hardtail mountain bike, matte black", "Urban commuter bike with fenders", "Carbon road bike, black with green details",
        "Gravel bike, olive green", "Electric city bike with integrated battery", "Kids mountain bike, green",
      ], "Catálogo de bicicletas").map((x) => ({ ...x, tipo: "tarjeta", prompt_formato: "side profile of the full bike" })),
      ...productos("accesorio", ["Cycling helmet, black and green", "Cycling gloves pair", "Water bottle and cage", "LED bike light set"], "Catálogo de accesorios"),
    ],
  },
  {
    id: "lumina-pro", nombre: "Lúmina Pro", piloto: true,
    estilo: "dramatic stage and technical product photography, deep navy and violet light, haze and beams, clean studio for products",
    imagenes: [
      img("hero", "hero", "Hero", "Professional concert stage with moving head fixtures casting violet and blue beams through haze, empty stage, wide cinematic"),
      img("banner", "banner", "Banner de eventos", "Wide shot of a corporate event hall with professional LED lighting and truss"),
      img("evento-1", "tarjeta", "Recomendación por evento", "Wedding reception with warm uplighting and pin spots on a dance floor"),
      img("evento-2", "tarjeta", "Recomendación por evento", "DJ booth at a nightclub with laser and LED wash lighting, no people faces visible"),
      img("evento-3", "tarjeta", "Recomendación por evento", "Live band concert stage with front truss and spotlights"),
      img("tecnica-1", "tarjeta", "Ficha técnica", "Close-up of a moving head light's lens and housing, technical detail"),
      img("tecnica-2", "tarjeta", "Ficha técnica", "Rack of audio amplifiers and processors with indicator lights, clean cabling"),
      ...productos("equipo", [
        "Moving head spot light fixture", "Moving head beam light fixture", "LED par wash light", "LED bar light", "Laser projector",
        "Strobe light unit", "Fog machine", "Digital audio mixing console", "DJ controller", "Powered line-array speaker", "Subwoofer cabinet", "Wireless microphone set",
      ], "Catálogo técnico"),
    ],
  },
  {
    id: "huella-viva", nombre: "Huella Viva",
    estilo: "warm homey lifestyle and product photography, soft natural light, sage green, cream and terracotta palette, generic unbranded packaging",
    imagenes: [
      img("hero", "hero", "Hero", "Golden retriever and a tabby cat resting together on a sunlit living room floor, cozy home, space on the right"),
      img("banner", "banner", "Banner", "Pet store shelf display with natural wood shelves, baskets and plants"),
      img("perro", "vertical", "Lifestyle", "Happy dog playing with a rope toy in a garden"),
      img("gato", "vertical", "Lifestyle", "Cat sitting inside a cozy cat bed by a window"),
      img("alimento-lifestyle", "tarjeta", "Alimentos", "Bowl of dry pet food next to a ceramic water bowl, kitchen floor"),
      ...productos("producto", [
        "Bag of dry dog food, plain sage green packaging", "Bag of dry cat food, plain cream packaging", "Wet food cans for pets, plain labels", "Rope dog toy",
        "Plush squeaky toy", "Cat scratching post", "Round cozy pet bed, beige", "Stainless steel pet bowl", "Dog leash and collar set", "Pet carrier bag", "Feather cat wand toy", "Cat tunnel toy",
      ], "Catálogo"),
    ],
  },
  {
    id: "rango", nombre: "Rango Activewear",
    estilo: "premium sportswear editorial photography, black, white and orange accents, hard directional light, urban gym and track settings",
    imagenes: [
      img("hero", "hero", "Hero", "Athlete mid-stride sprinting on an urban running track at sunrise, orange light, dynamic, fictional model"),
      img("banner", "banner", "Banner de colección", "Row of folded sports apparel in black and orange on a concrete shelf"),
      img("editorial-1", "vertical", "Editorial", "Female athlete in black leggings and orange top stretching in a modern gym, fictional model"),
      img("editorial-2", "vertical", "Editorial", "Male athlete in training hoodie lacing running shoes on city steps, fictional model"),
      img("editorial-3", "vertical", "Editorial", "Two athletes training with kettlebells in a dark gym, fictional models"),
      ...productos("producto", [
        "Black performance t-shirt", "Orange running shorts", "Black compression leggings", "Grey training hoodie", "Sports bra, black",
        "Windbreaker jacket, orange and black", "Running shoes, plain white and orange, no logos", "Training shoes, black, no logos", "Gym duffle bag, black", "Cap, black", "Water bottle, matte black", "Gym socks pair",
      ], "Catálogo con variantes"),
    ],
  },
  {
    id: "puerto-fm", nombre: "Puerto FM",
    estilo: "contemporary broadcast studio photography, navy and warm orange accent light, microphones with soft bokeh, clean and professional",
    imagenes: [
      img("hero", "hero", "Hero", "Contemporary radio studio with a boom microphone and glowing on-air lamp, navy tones and orange accents, wide"),
      img("banner", "banner", "Banner programación", "Panoramic view of a radio broadcast booth with mixing console and monitors"),
      img("microfonos", "tarjeta", "Estudio", "Close-up of two professional broadcast microphones with pop filters"),
      img("consola", "tarjeta", "Estudio", "Radio audio console with faders and lights, close-up"),
      img("cabina", "tarjeta", "Estudio", "Radio host's desk with headphones and microphone, empty seat"),
      retrato("locutor-1", "Locutores", "male radio host in his 40s with headphones around his neck"),
      retrato("locutor-2", "Locutores", "female radio host in her 30s, smiling, studio background"),
      retrato("locutor-3", "Locutores", "young male radio host in a casual jacket"),
    ],
  },
  {
    id: "tiempo-retro", nombre: "Tiempo Retro",
    estilo: "vintage-inspired warm photography, teal and retro orange, cream tones, soft film grain, nostalgic atmosphere",
    imagenes: [
      img("hero", "hero", "Hero", "Vintage radio studio with wood panels, ribbon microphone and glowing amber lights, nostalgic wide shot"),
      img("banner", "banner", "Banner de archivo", "Wall of vinyl records in a retro listening room"),
      img("equipos", "tarjeta", "Estudio", "Vintage audio equipment: reel-to-reel recorder and tube amplifier on a wooden desk"),
      img("vinilos", "tarjeta", "Archivo", "Stack of vinyl records beside a turntable with the tonearm down"),
      img("decada-70", "tarjeta", "Ambientes por década", "1970s living room with wood paneling, a record player and orange armchair"),
      img("decada-80", "tarjeta", "Ambientes por década", "1980s bedroom with a cassette boombox and neon-toned posters, no readable text"),
      img("decada-90", "tarjeta", "Ambientes por década", "1990s teen room with a portable CD player and headphones"),
      retrato("locutor-1", "Locutores", "male radio host in his 50s with a mustache, vintage style shirt"),
      retrato("locutor-2", "Locutores", "female radio host in her 40s with retro hairstyle"),
      retrato("locutor-3", "Locutores", "male radio host in his 30s with glasses and a cardigan"),
      img("programa", "tarjeta", "Presentación de programas", "Radio hosts' desk with a vintage microphone, a notebook and a coffee cup"),
    ],
  },
  {
    id: "frecuencia-mix", nombre: "Frecuencia Mix", piloto: true,
    estilo: "modern premium broadcast and music-culture photography, deep blue with teal and moderate violet light, neon-free subtle glows, editorial",
    imagenes: [
      img("hero", "hero", "Hero", "Premium radio studio with curved LED backdrop in deep blue and teal, professional microphones and mixing desk, wide cinematic"),
      img("banner", "banner", "Banner comunidad", "Panoramic crowd silhouettes at a music festival at dusk with teal and violet lights"),
      img("cabina", "tarjeta", "Estudio", "Radio booth with two hosts' microphones and a large monitor, no people"),
      img("equipamiento", "tarjeta", "Estudio", "Close-up of a professional audio interface and faders with teal backlight"),
      img("ambiente-1", "tarjeta", "Contenido musical", "Live DJ set in a small club with teal and violet glow, no readable faces"),
      img("ambiente-2", "tarjeta", "Contenido musical", "Guitarist silhouette on a small stage with warm backlight"),
      img("editorial", "tarjeta", "Editorial", "Headphones resting on a vinyl record with soft violet light"),
      retrato("locutor-1", "Locutores", "female radio host in her 30s with short hair, smiling"),
      retrato("locutor-2", "Locutores", "male radio host in his 30s with a beard, headphones on neck"),
      retrato("locutor-3", "Locutores", "young non-binary radio host in a denim jacket"),
    ],
  },
  {
    id: "barba-norte", nombre: "Barba Norte",
    estilo: "moody premium barbershop photography, black, beige and copper tones, warm tungsten light, leather and wood textures",
    imagenes: [
      img("hero", "hero", "Hero", "Premium barbershop interior with leather chairs, copper fixtures and warm light, empty, cinematic wide"),
      img("banner", "banner", "Banner", "Barber station with mirror, tools and warm lamps in a row"),
      img("local", "tarjeta", "Local", "Waiting area of a barbershop with a leather sofa and vintage details"),
      retrato("barbero-1", "Equipo", "male barber with a full beard wearing a black apron"),
      retrato("barbero-2", "Equipo", "male barber in his 30s with a styled pompadour and black shirt"),
      retrato("barbero-3", "Equipo", "female barber with tattoos on her forearms and a black apron"),
      img("corte-1", "vertical", "Servicios", "Barber fading a client's hair with clippers, close-up from behind"),
      img("corte-2", "vertical", "Servicios", "Straight razor beard shave with hot towel, close-up"),
      img("corte-3", "vertical", "Servicios", "Finished classic haircut seen from the side, no face detail"),
      img("herramientas", "tarjeta", "Herramientas", "Barber tools: scissors, comb and razor on a leather mat"),
      img("sillon", "tarjeta", "Local", "Vintage leather barber chair by a window"),
    ],
  },
  {
    id: "trama", nombre: "Trama Arquitectura",
    estilo: "contemporary architecture photography, sand, black and white palette, soft overcast light, strong geometry, minimal and calm",
    imagenes: [
      img("hero", "hero", "Hero", "Minimalist concrete and timber house at dusk with warm interior glow, wide cinematic"),
      img("proyecto-1", "tarjeta", "Proyecto asignado", "Modern low-rise cultural center with sand-colored facade and large glass"),
      img("proyecto-2", "tarjeta", "Proyecto asignado", "Contemporary single-family house with a courtyard and wooden screens"),
      img("proyecto-3", "tarjeta", "Proyecto asignado", "Small office building with a perforated metal facade"),
      img("proyecto-4", "tarjeta", "Proyecto asignado", "Coastal house with large terraces and sand-colored concrete"),
      img("interior-1", "vertical", "Portafolio", "Minimalist contemporary living room with a double-height ceiling and natural light"),
      img("interior-2", "vertical", "Portafolio", "Stair with wooden steps in a bright contemporary home"),
      img("interior-3", "vertical", "Portafolio", "Kitchen with light oak cabinets and a stone island"),
      img("equipo", "tarjeta", "Estudio", "Architects reviewing a model and drawings around a large table in a bright studio, fictional people"),
      img("maqueta", "tarjeta", "Proceso", "Detailed white architectural scale model on a table, close-up"),
      img("planos", "tarjeta", "Documentos", "Architectural plans with no readable text spread on a desk with a scale ruler and pencil"),
    ],
  },
  {
    id: "rutastock", nombre: "RutaStock",
    estilo: "clean logistics and operations photography, blue, white and green accents, bright industrial light, organized and efficient",
    imagenes: [
      img("hero", "hero", "Hero", "Modern distribution center interior with organized pallet racks and a forklift, bright light, wide"),
      img("centro", "tarjeta", "Operación", "Exterior of a logistics center with loading docks and delivery trucks at morning"),
      img("bodega", "tarjeta", "Inventario", "Warehouse aisle with high racks and boxes neatly labeled without readable text"),
      img("distribucion", "tarjeta", "Distribución", "White delivery vans lined up at loading bays"),
      img("productos", "tarjeta", "Productos", "Organized shelves with boxed goods and plastic crates, close-up"),
      retrato("operaciones-1", "Equipo", "male warehouse supervisor in a high-visibility vest"),
      retrato("operaciones-2", "Equipo", "female logistics coordinator with a tablet and safety vest"),
      img("escaneo", "tarjeta", "Inventario", "Worker scanning a box with a handheld scanner in a warehouse, face not visible"),
    ],
  },
  {
    id: "servimant", nombre: "Servimant",
    estilo: "industrial service photography, dark navy, technical orange and grey, workshop lighting, authentic and gritty but clean",
    imagenes: [
      img("hero", "hero", "Hero", "Two maintenance technicians in orange safety gear inspecting an industrial machine in a plant, wide cinematic"),
      img("tecnicos", "tarjeta", "Técnicos", "Technician tightening bolts on a large industrial motor, close and focused"),
      img("equipos", "tarjeta", "Equipos", "Industrial compressors and control cabinets in a clean plant room"),
      img("taller", "tarjeta", "Taller", "Mechanical workshop with a lathe and tool wall, tidy"),
      img("instalaciones", "tarjeta", "Instalaciones", "Industrial pipe installation with pressure gauges and valves"),
      img("vehiculo", "tarjeta", "Flota", "Generic white service van with orange stripe and toolboxes, no logos or text"),
      retrato("tecnico-1", "Equipo", "male maintenance technician in a navy uniform"),
      retrato("tecnico-2", "Equipo", "female maintenance supervisor with a safety helmet under arm"),
    ],
  },
  {
    id: "mesaflow", nombre: "MesaFlow",
    estilo: "modern corporate technology photography, dark navy and teal accents, clean offices, soft screen glow, professional",
    imagenes: [
      img("hero", "hero", "Hero", "Modern IT support operations room with large monitors and teal accent lighting, specialists at desks seen from behind, wide"),
      img("oficina", "tarjeta", "Oficina", "Bright open-plan office with desks and plants"),
      img("equipos", "tarjeta", "Tecnología", "Laptop, headset and second monitor on a clean desk, close-up"),
      img("mesa-soporte", "tarjeta", "Mesa de soporte", "Support desk with a headset and dual monitors with abstract dashboards (no readable text)"),
      img("centro", "tarjeta", "Centro de trabajo", "Meeting room with a glass wall and a whiteboard without text"),
      retrato("especialista-1", "Especialistas", "female IT support specialist with a headset"),
      retrato("especialista-2", "Especialistas", "male systems administrator in a casual shirt"),
      retrato("especialista-3", "Especialistas", "male service desk manager in a navy shirt"),
    ],
  },
  {
    id: "brasa-costa", nombre: "Brasa Costa",
    estilo: "contemporary restaurant and gourmet food photography, terracotta, cream and black palette, warm candlelight and side light",
    imagenes: [
      img("hero", "hero", "Hero (sitio rediseñado)", "Contemporary coastal restaurant interior with terracotta walls, wood tables and warm lighting, wide cinematic"),
      img("banner", "banner", "Banner", "Chef's grill with flames and cuts of meat, dramatic warm light"),
      img("plato-1", "cuadrada", "Carta", "Gourmet grilled seafood platter with lemon and herbs, top-down"),
      img("plato-2", "cuadrada", "Carta", "Plated beef tenderloin with sauce and vegetables, fine dining"),
      img("plato-3", "cuadrada", "Carta", "Fresh ceviche in a ceramic bowl with cilantro and red onion"),
      img("plato-4", "cuadrada", "Carta", "Chocolate dessert with berries on a dark plate"),
      img("terraza", "tarjeta", "Ambiente", "Seaside restaurant terrace at sunset with string lights and set tables"),
      img("cocina", "tarjeta", "Cocina", "Professional kitchen with chefs plating dishes, motion, faces not visible"),
      img("interior", "tarjeta", "Ambiente", "Dining room with leather banquettes and warm pendant lights"),
    ],
  },
  {
    id: "puentesync", nombre: "PuenteSync",
    estilo: "editorial technology photography, navy, teal and white, clean glass offices and abstract light trails, calm and professional",
    imagenes: [
      img("hero", "hero", "Hero", "Modern glass corporate office at dusk with teal light trails across the city beyond, wide cinematic"),
      img("ambiente", "tarjeta", "Ambiente corporativo", "Bright modern office lobby with a reception desk and plants"),
      img("equipo", "tarjeta", "Equipo", "Two colleagues collaborating at a screen showing abstract flow diagrams without text"),
      img("infraestructura", "tarjeta", "Infraestructura", "Conceptual photograph of fiber optic cables glowing teal in a dark server aisle"),
      img("editorial", "banner", "Editorial", "Abstract wide photo of two glowing teal bridges of light connecting over a dark blue background"),
    ],
  },
];

// ---------------------------------------------------------------- Expansión
export function expandir() {
  const lista = [];
  for (const e of EMPRESAS) {
    for (const i of e.imagenes) {
      const f = FORMATOS[i.tipo];
      // Calibración 2026-10-18: Nano Banana 2 para escenas y coherencia; FLUX.2 pro para productos limpios.
      const porTipo = { hero: "nano2k", banner: "nano2k", tarjeta: "nano", vertical: "nano", cuadrada: "flux2pro" };
      const modelo = i.modelo ?? porTipo[i.tipo];
      const w = i.w ?? f.w;
      const h = i.h ?? f.h;
      const extra = i.prompt_formato ? `, ${i.prompt_formato}` : "";
      lista.push({
        empresa: e.id,
        piloto: !!e.piloto,
        id: i.id,
        tipo: i.tipo,
        uso: i.uso,
        prompt: `${i.subject}${extra}. ${e.estilo}. ${BASE}`,
        modelo,
        endpoint: MODELOS[modelo].endpoint,
        formato: f.ar,
        w, h,
        referencia: i.ref ?? null,
        archivo: `public/assets/${e.id}/${i.id}.webp`,
        aprobacion: "pendiente",
        costoReal: null,
      });
    }
  }
  return lista;
}

const redondeoNormal = Math.round; // coincide con los ejemplos de FAL (1920x1080 = $0.045)
const redondeoArriba = Math.ceil; // peor caso

export const costo = (x, peor = false) => MODELOS[x.modelo].precio(x.w, x.h, peor ? redondeoArriba : redondeoNormal);
