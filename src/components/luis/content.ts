/**
 * Everything Luis reads in the app lives here (all in Spanish).
 * Edit this file to adapt the plan (meal times, suggestions, places, tips)
 * to what his doctor or nutritionist recommends — no other code changes needed.
 */

export const PROFILE = {
  name: 'Luis',
  /** Daily water goal in glasses (~250 ml each). */
  waterGoal: 8,
};

// ---------------------------------------------------------------- UI strings

export const UI = {
  appName: 'Mi Plan',
  tabs: {
    today: 'Hoy',
    out: 'Comer fuera',
    guide: 'Guía',
    progress: 'Progreso',
  },
  greeting: {
    morning: 'Buenos días',
    afternoon: 'Buenas tardes',
    evening: 'Buenas noches',
  },
  todayProgress: 'Avance de hoy',
  meals: 'Comidas del día',
  next: 'Siguiente',
  ideas: 'Ideas',
  done: 'Listo',
  markDone: 'Marcar como hecho',
  water: 'Agua',
  glasses: 'vasos',
  habits: 'Hábitos',
  tipOfDay: 'Consejo del día',
  craving: 'Tengo hambre o antojo',
  cravingTitle: 'Antes de comer, prueba esto',
  cravingSteps: [
    'Toma un vaso grande de agua y espera 10 minutos.',
    '¿Es hambre de verdad o aburrimiento/estrés?',
    'Si sí es hambre, elige algo de la lista de abajo.',
  ],
  cravingSweet: 'Algo dulce',
  cravingSalty: 'Algo salado',
  cravingFilling: 'Algo que llene',
  close: 'Cerrar',
  outIntro: '¿Dónde vas a comer? Elige el lugar y te digo qué conviene.',
  best: 'Mejor opción',
  ok: 'Con moderación',
  avoid: 'Mejor evitar',
  trick: 'Truco',
  goldenRules: 'Reglas de oro al comer fuera',
  back: 'Volver',
  weight: 'Peso',
  addWeight: 'Registrar peso',
  weightHint: 'Pésate una vez por semana, en la mañana, antes de desayunar.',
  save: 'Guardar',
  goal: 'Meta',
  setGoal: 'Poner meta',
  start: 'Inicio',
  current: 'Actual',
  lost: 'Bajado',
  toGo: 'Faltan',
  history: 'Historial',
  last7: 'Últimos 7 días',
  streak: 'Racha',
  days: 'días',
  noWeights: 'Aún no hay registros. Anota tu primer peso para ver tu avance.',
  remove: 'Borrar',
  installTitle: 'Instala la app en tu teléfono',
  installBody: 'Así la abres desde la pantalla de inicio, como cualquier app, y funciona sin internet.',
  installButton: 'Instalar',
  installIos: 'Toca el botón Compartir (cuadro con flecha ↑) y luego "Agregar a inicio".',
  installOther: 'Abre el menú del navegador (⋮) y elige "Instalar app" o "Agregar a pantalla de inicio".',
  later: 'Ahora no',
  disclaimer: 'Guía general de alimentación. No sustituye a tu médico o nutriólogo: si tienes diabetes, presión alta o tomas medicamentos, consulta cualquier cambio con ellos.',
};

// ---------------------------------------------------------------- Meals

export type Meal = { id: string; time: string; name: string; ideas: string[] };

export const MEALS: Meal[] = [
  {
    id: 'breakfast',
    time: '08:00',
    name: 'Desayuno',
    ideas: [
      '2 huevos a la mexicana + 1 tortilla de maíz + fruta',
      'Avena cocida con canela y manzana (sin azúcar)',
      'Yogur griego natural + nueces + fresas',
      'Molletes con pan integral, frijoles y pico de gallo (poco queso)',
    ],
  },
  {
    id: 'snack1',
    time: '11:00',
    name: 'Colación',
    ideas: [
      'Una fruta + un puñito de almendras',
      'Pepino, jícama o zanahoria con limón y chile',
      'Un yogur natural',
    ],
  },
  {
    id: 'lunch',
    time: '14:30',
    name: 'Comida',
    ideas: [
      'Pechuga asada + ensalada grande + ½ taza de arroz',
      'Caldo de pollo o res con muchas verduras + 1 tortilla',
      'Pescado a la plancha + verduras al vapor + frijoles de la olla',
      'Tacos de bistec asado (2-3) con mucha verdura y salsa',
    ],
  },
  {
    id: 'snack2',
    time: '17:30',
    name: 'Colación',
    ideas: [
      'Palomitas naturales (sin mantequilla), 2 tazas',
      'Queso panela en cubitos + jitomate',
      'Una fruta',
    ],
  },
  {
    id: 'dinner',
    time: '20:00',
    name: 'Cena',
    ideas: [
      'Ensalada con atún o pollo deshebrado',
      'Quesadillas de nopal con queso panela (2)',
      'Huevo con verduras + té sin azúcar',
      'Sopa de verduras + un poco de pollo',
    ],
  },
];

// ---------------------------------------------------------------- Habits

export type Habit = { id: string; label: string; emoji: string };

export const HABITS: Habit[] = [
  { id: 'walk', emoji: '🚶', label: 'Caminar 30 minutos' },
  { id: 'veggies', emoji: '🥗', label: 'Verduras en 2 comidas' },
  { id: 'nosoda', emoji: '🚫', label: 'Sin refresco ni jugo' },
  { id: 'slow', emoji: '🍽️', label: 'Comer despacio, sin pantalla' },
  { id: 'sleep', emoji: '😴', label: 'Dormir 7 horas' },
];

// ---------------------------------------------------------------- Tips

export const TIPS: string[] = [
  'Empieza cada comida con la verdura: llena más y ayuda a comer menos de lo demás.',
  'Usa un plato más chico. Se ve lleno y comes menos sin darte cuenta.',
  'Si tienes hambre entre comidas, primero toma agua. Muchas veces es sed.',
  'No vayas al súper con hambre: compras más cosas que no necesitas.',
  'Un mal día no arruina nada. Lo que cuenta es lo que haces la mayoría de los días.',
  'Camina 10 minutos después de comer: ayuda a controlar el azúcar en la sangre.',
  'Deja de comer cuando estés satisfecho, no cuando estés lleno.',
  'Ten fruta lavada y a la vista. Lo que ves es lo que comes.',
  'El refresco y el jugo son azúcar líquida. El agua mineral con limón es buena alternativa.',
  'Cena ligero y al menos 2 horas antes de dormir.',
  'Las tortillas cuentan: 2 o 3 por comida es suficiente.',
  'Prepara de más en la comida y guarda una porción para mañana.',
  'Dormir mal da más hambre al día siguiente. El descanso también es parte del plan.',
  'Lee las etiquetas: si el azúcar aparece entre los 3 primeros ingredientes, mejor déjalo.',
];

export const CRAVINGS: { sweet: string[]; salty: string[]; filling: string[] } = {
  sweet: [
    'Fruta congelada (uvas o plátano)',
    'Yogur natural con canela',
    '2 cuadritos de chocolate amargo (70%+)',
    'Gelatina sin azúcar',
  ],
  salty: [
    'Pepino o jícama con limón, sal y chile',
    'Palomitas naturales',
    'Un puñito de cacahuates naturales',
    'Aceitunas o pepinillos',
  ],
  filling: [
    'Un huevo cocido',
    'Queso panela con jitomate',
    'Una taza de caldo o consomé',
    'Rollitos de jamón de pavo con pepino',
  ],
};

// ---------------------------------------------------------------- Eating out

export type Place = {
  id: string;
  emoji: string;
  name: string;
  best: string[];
  ok: string[];
  avoid: string[];
  trick: string;
};

export const PLACES: Place[] = [
  {
    id: 'tacos',
    emoji: '🌮',
    name: 'Taquería',
    best: [
      'Tacos de bistec, pollo o arrachera asados',
      'Tacos de pescado a la plancha',
      'Nopales, cebollitas y salsa a gusto',
    ],
    ok: [
      'Al pastor (máximo 3)',
      'Frijoles charros',
    ],
    avoid: [
      'Suadero, tripa, campechanos con chorizo',
      'Gringas, volcanes, cosas con mucho queso',
      'Refresco',
    ],
    trick: 'Pide 3 tacos con una sola tortilla cada uno, y acompaña con pepino y rábanos.',
  },
  {
    id: 'fonda',
    emoji: '🍲',
    name: 'Fonda / comida corrida',
    best: [
      'Sopa o caldo de verduras de entrada',
      'Guisado de pollo o res en salsa (no frito)',
      'Ensalada y frijoles de la olla',
    ],
    ok: [
      'Arroz (media porción)',
      'Agua fresca: pide que sea con poca azúcar',
    ],
    avoid: [
      'Milanesa, chiles rellenos capeados, flautas',
      'Postre del día',
    ],
    trick: 'Cambia el arroz por más verdura o ensalada. Casi siempre te lo hacen.',
  },
  {
    id: 'burgers',
    emoji: '🍔',
    name: 'Comida rápida',
    best: [
      'Hamburguesa sencilla (una carne) sin queso extra',
      'Ensalada con pollo a la parrilla',
      'Agua o refresco sin azúcar',
    ],
    ok: [
      'Papas chicas, compartidas',
      'Wrap de pollo a la parrilla',
    ],
    avoid: [
      'Combos agrandados',
      'Doble carne, tocino, pollo empanizado',
      'Malteadas',
    ],
    trick: 'No pidas combo: pide la hamburguesa sola y agua. Te ahorras como 500 calorías.',
  },
  {
    id: 'pizza',
    emoji: '🍕',
    name: 'Pizza',
    best: [
      'Masa delgada con verduras o pollo',
      'Una ensalada antes',
    ],
    ok: [
      '2 rebanadas, no más',
      'Hawaiana o de jamón',
    ],
    avoid: [
      'Orilla rellena de queso, masa gruesa',
      'Pepperoni + salchicha + extra queso',
      'Alitas y pan de ajo',
    ],
    trick: 'Sirve tus 2 rebanadas en un plato y aléjate de la caja.',
  },
  {
    id: 'chinese',
    emoji: '🥡',
    name: 'Comida china',
    best: [
      'Pollo o res con verduras salteadas',
      'Arroz blanco al vapor (poco)',
      'Sopa wonton o sopa de verduras',
    ],
    ok: [
      'Chop suey',
      'Pollo a la naranja: media porción',
    ],
    avoid: [
      'Todo lo capeado o "crispy"',
      'Arroz frito, chow mein, rollos primavera',
      'Buffet libre',
    ],
    trick: 'Pide la salsa aparte y usa poca: ahí está mucha del azúcar y la sal.',
  },
  {
    id: 'sushi',
    emoji: '🍣',
    name: 'Sushi',
    best: [
      'Sashimi, nigiri, rollos naturales',
      'Ensalada de pepino o kani',
      'Sopa miso',
    ],
    ok: [
      'Un rollo normal (8 piezas)',
      'Yakimeshi: compartido',
    ],
    avoid: [
      'Rollos empanizados o con queso crema',
      'Salsa de anguila, mayonesa spicy',
      'Mucha salsa de soya (mucha sal)',
    ],
    trick: 'Empieza con sopa miso y ensalada; luego un solo rollo es suficiente.',
  },
  {
    id: 'chicken',
    emoji: '🍗',
    name: 'Pollo asado / rosticería',
    best: [
      'Pollo asado sin piel',
      'Ensalada, nopales, cebollitas',
      'Frijoles charros (porción chica)',
    ],
    ok: [
      '2-3 tortillas',
      'Arroz: media porción',
    ],
    avoid: [
      'Pollo frito o broaster',
      'Papas fritas y espagueti con crema',
    ],
    trick: 'Quitarle la piel al pollo le quita casi la mitad de la grasa.',
  },
  {
    id: 'store',
    emoji: '🏪',
    name: 'Tienda / OXXO',
    best: [
      'Agua natural o mineral',
      'Cacahuates o almendras naturales (bolsita chica)',
      'Fruta, pepino o jícama en vaso',
      'Yogur natural, huevo cocido, queso',
    ],
    ok: [
      'Barra de proteína o de avena (revisa azúcar)',
      'Sándwich de pavo',
      'Café americano sin azúcar',
    ],
    avoid: [
      'Refrescos, jugos, bebidas energéticas',
      'Papitas, pan dulce, galletas',
      'Hot dogs y nachos',
    ],
    trick: 'Si tienes que comprar algo, busca proteína (huevo, queso, nueces) antes que harinas.',
  },
  {
    id: 'cafe',
    emoji: '☕',
    name: 'Cafetería',
    best: [
      'Café americano o espresso',
      'Té sin azúcar',
      'Capuchino chico con leche light',
    ],
    ok: [
      'Sándwich o baguette de pavo',
      'Avena o yogur con fruta',
    ],
    avoid: [
      'Frappés, bebidas con crema batida',
      'Panqués, croissants, galletas',
    ],
    trick: 'Un frappé grande puede tener más azúcar que 2 refrescos. Pide el café más simple.',
  },
  {
    id: 'party',
    emoji: '🎉',
    name: 'Fiesta / carne asada',
    best: [
      'Carne asada, pollo o salchicha de pavo',
      'Nopales, cebollitas, guacamole (poco)',
      'Agua mineral con limón',
    ],
    ok: [
      '1-2 cervezas light o una copa de vino',
      'Una rebanada chica de pastel',
    ],
    avoid: [
      'Chorizo, chicharrón, botanas fritas',
      'Refresco con alcohol, micheladas preparadas',
      'Regresar por segundo plato',
    ],
    trick: 'Come algo ligero antes de ir y alterna cada bebida con un vaso de agua.',
  },
];

export const GOLDEN_RULES: string[] = [
  'Elige asado, a la plancha o al vapor en vez de frito o capeado.',
  'Pide salsas y aderezos aparte.',
  'Toma agua, no refresco ni jugo.',
  'Si la porción es grande, aparta la mitad para llevar desde el inicio.',
  'No hay que limpiar el plato. Para cuando estés satisfecho.',
];

// ---------------------------------------------------------------- Guide

export const PLATE = {
  title: 'El plato ideal',
  intro: 'Sirve así cada comida principal. No necesitas contar calorías.',
  parts: [
    { pct: 50, color: '#4caf50', label: 'Verduras', examples: 'Ensalada, nopales, calabaza, brócoli, ejotes, chayote' },
    { pct: 25, color: '#e57373', label: 'Proteína', examples: 'Pollo, pescado, huevo, res magra, frijoles, atún' },
    { pct: 25, color: '#ffb74d', label: 'Carbohidrato', examples: 'Tortilla, arroz, papa, pasta, pan integral' },
  ],
};

export const HAND = {
  title: 'Porciones con tu mano',
  items: [
    { emoji: '✋', label: 'Palma', desc: 'Proteína: carne, pollo, pescado' },
    { emoji: '✊', label: 'Puño', desc: 'Carbohidrato: arroz, pasta, fruta' },
    { emoji: '🤲', label: 'Dos manos', desc: 'Verduras: todo lo que quepa' },
    { emoji: '👍', label: 'Pulgar', desc: 'Grasa: aceite, crema, mantequilla' },
  ],
};

export const TRAFFIC = {
  title: 'Semáforo de alimentos',
  green: {
    label: 'Libre — cuando quieras',
    items: 'Verduras, agua, té y café sin azúcar, caldos, pepino, jícama, nopales, lechuga, jitomate, limón, chile',
  },
  yellow: {
    label: 'Con medida — en porciones',
    items: 'Tortillas, arroz, frijoles, fruta, pan integral, avena, huevo, pollo, pescado, queso panela, aguacate, nueces',
  },
  red: {
    label: 'Ocasional — de vez en cuando',
    items: 'Refresco, jugos, pan dulce, galletas, frituras, embutidos, capeados, postres, alcohol, comida rápida',
  },
};

export const SHOPPING = {
  title: 'Lista del súper',
  groups: [
    { name: 'Verduras y frutas', items: ['Lechuga o espinaca', 'Jitomate', 'Pepino', 'Nopales', 'Calabacitas', 'Brócoli', 'Cebolla y chile', 'Limones', 'Manzanas', 'Fresas o papaya'] },
    { name: 'Proteína', items: ['Pechuga de pollo', 'Huevo', 'Atún en agua', 'Pescado (tilapia)', 'Bistec de res magro', 'Queso panela', 'Yogur griego natural'] },
    { name: 'Despensa', items: ['Tortillas de maíz', 'Frijoles', 'Avena', 'Arroz', 'Almendras o cacahuates', 'Aceite de oliva', 'Agua mineral'] },
  ],
};
