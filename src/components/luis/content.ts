/**
 * Everything Luis reads in the app lives here, in Spanish and English.
 * Edit this file to adapt the plan (meal times, suggestions, places, tips)
 * to what his doctor or nutritionist recommends — no other code changes needed.
 */

export type Lang = 'es' | 'en';
export type L = { es: string; en: string };

export const PROFILE = {
  name: 'Luis',
  /** Daily water goal in glasses (~250 ml each). */
  waterGoal: 8,
};

// ---------------------------------------------------------------- UI strings

export const UI = {
  appName: { es: 'Mi Plan', en: 'My Plan' },
  tabs: {
    today: { es: 'Hoy', en: 'Today' },
    out: { es: 'Comer fuera', en: 'Eating out' },
    guide: { es: 'Guía', en: 'Guide' },
    progress: { es: 'Progreso', en: 'Progress' },
  },
  greeting: {
    morning: { es: 'Buenos días', en: 'Good morning' },
    afternoon: { es: 'Buenas tardes', en: 'Good afternoon' },
    evening: { es: 'Buenas noches', en: 'Good evening' },
  },
  todayProgress: { es: 'Avance de hoy', en: "Today's progress" },
  meals: { es: 'Comidas del día', en: "Today's meals" },
  next: { es: 'Siguiente', en: 'Up next' },
  ideas: { es: 'Ideas', en: 'Ideas' },
  done: { es: 'Listo', en: 'Done' },
  markDone: { es: 'Marcar como hecho', en: 'Mark as done' },
  water: { es: 'Agua', en: 'Water' },
  glasses: { es: 'vasos', en: 'glasses' },
  habits: { es: 'Hábitos', en: 'Habits' },
  tipOfDay: { es: 'Consejo del día', en: 'Tip of the day' },
  craving: { es: 'Tengo hambre o antojo', en: "I'm hungry or craving something" },
  cravingTitle: { es: 'Antes de comer, prueba esto', en: 'Before eating, try this' },
  cravingSteps: [
    { es: 'Toma un vaso grande de agua y espera 10 minutos.', en: 'Drink a big glass of water and wait 10 minutes.' },
    { es: '¿Es hambre de verdad o aburrimiento/estrés?', en: 'Is it real hunger, or boredom/stress?' },
    { es: 'Si sí es hambre, elige algo de la lista de abajo.', en: "If it's real hunger, pick something from the list below." },
  ],
  cravingSweet: { es: 'Algo dulce', en: 'Something sweet' },
  cravingSalty: { es: 'Algo salado', en: 'Something salty' },
  cravingFilling: { es: 'Algo que llene', en: 'Something filling' },
  close: { es: 'Cerrar', en: 'Close' },
  outIntro: {
    es: '¿Dónde vas a comer? Elige el lugar y te digo qué conviene.',
    en: "Where are you eating? Pick the place and I'll tell you what to order.",
  },
  best: { es: 'Mejor opción', en: 'Best choice' },
  ok: { es: 'Con moderación', en: 'In moderation' },
  avoid: { es: 'Mejor evitar', en: 'Better to avoid' },
  trick: { es: 'Truco', en: 'Trick' },
  goldenRules: { es: 'Reglas de oro al comer fuera', en: 'Golden rules when eating out' },
  back: { es: 'Volver', en: 'Back' },
  weight: { es: 'Peso', en: 'Weight' },
  addWeight: { es: 'Registrar peso', en: 'Log weight' },
  weightHint: {
    es: 'Pésate una vez por semana, en la mañana, antes de desayunar.',
    en: 'Weigh yourself once a week, in the morning, before breakfast.',
  },
  save: { es: 'Guardar', en: 'Save' },
  goal: { es: 'Meta', en: 'Goal' },
  setGoal: { es: 'Poner meta', en: 'Set goal' },
  start: { es: 'Inicio', en: 'Start' },
  current: { es: 'Actual', en: 'Current' },
  lost: { es: 'Bajado', en: 'Lost' },
  toGo: { es: 'Faltan', en: 'To go' },
  history: { es: 'Historial', en: 'History' },
  last7: { es: 'Últimos 7 días', en: 'Last 7 days' },
  streak: { es: 'Racha', en: 'Streak' },
  days: { es: 'días', en: 'days' },
  noWeights: {
    es: 'Aún no hay registros. Anota tu primer peso para ver tu avance.',
    en: 'No entries yet. Log your first weight to see your progress.',
  },
  remove: { es: 'Borrar', en: 'Delete' },
  installTitle: { es: 'Instala la app en tu teléfono', en: 'Install the app on your phone' },
  installBody: {
    es: 'Así la abres desde la pantalla de inicio, como cualquier app, y funciona sin internet.',
    en: 'Open it from your home screen like any app, and it works offline.',
  },
  installButton: { es: 'Instalar', en: 'Install' },
  installIos: {
    es: 'Toca el botón Compartir (cuadro con flecha ↑) y luego "Agregar a inicio".',
    en: 'Tap the Share button (square with ↑ arrow), then "Add to Home Screen".',
  },
  installOther: {
    es: 'Abre el menú del navegador (⋮) y elige "Instalar app" o "Agregar a pantalla de inicio".',
    en: 'Open the browser menu (⋮) and choose "Install app" or "Add to Home screen".',
  },
  later: { es: 'Ahora no', en: 'Not now' },
  disclaimer: {
    es: 'Guía general de alimentación. No sustituye a tu médico o nutriólogo: si tienes diabetes, presión alta o tomas medicamentos, consulta cualquier cambio con ellos.',
    en: 'General eating guidance. It does not replace your doctor or dietitian: if you have diabetes, high blood pressure, or take medication, check any change with them.',
  },
};

// ---------------------------------------------------------------- Meals

export type Meal = { id: string; time: string; name: L; ideas: L[] };

export const MEALS: Meal[] = [
  {
    id: 'breakfast',
    time: '08:00',
    name: { es: 'Desayuno', en: 'Breakfast' },
    ideas: [
      { es: '2 huevos a la mexicana + 1 tortilla de maíz + fruta', en: '2 eggs with tomato, onion & chile + 1 corn tortilla + fruit' },
      { es: 'Avena cocida con canela y manzana (sin azúcar)', en: 'Cooked oatmeal with cinnamon and apple (no sugar)' },
      { es: 'Yogur griego natural + nueces + fresas', en: 'Plain Greek yogurt + walnuts + strawberries' },
      { es: 'Molletes con pan integral, frijoles y pico de gallo (poco queso)', en: 'Whole-grain toast with beans, pico de gallo and a little cheese' },
    ],
  },
  {
    id: 'snack1',
    time: '11:00',
    name: { es: 'Colación', en: 'Snack' },
    ideas: [
      { es: 'Una fruta + un puñito de almendras', en: 'A piece of fruit + a small handful of almonds' },
      { es: 'Pepino, jícama o zanahoria con limón y chile', en: 'Cucumber, jicama or carrot with lime and chili' },
      { es: 'Un yogur natural', en: 'A plain yogurt' },
    ],
  },
  {
    id: 'lunch',
    time: '14:30',
    name: { es: 'Comida', en: 'Lunch' },
    ideas: [
      { es: 'Pechuga asada + ensalada grande + ½ taza de arroz', en: 'Grilled chicken + big salad + ½ cup rice' },
      { es: 'Caldo de pollo o res con muchas verduras + 1 tortilla', en: 'Chicken or beef soup with lots of veggies + 1 tortilla' },
      { es: 'Pescado a la plancha + verduras al vapor + frijoles de la olla', en: 'Grilled fish + steamed veggies + whole beans' },
      { es: 'Tacos de bistec asado (2-3) con mucha verdura y salsa', en: 'Grilled steak tacos (2–3) with lots of veggies and salsa' },
    ],
  },
  {
    id: 'snack2',
    time: '17:30',
    name: { es: 'Colación', en: 'Snack' },
    ideas: [
      { es: 'Palomitas naturales (sin mantequilla), 2 tazas', en: 'Plain popcorn (no butter), 2 cups' },
      { es: 'Queso panela en cubitos + jitomate', en: 'Cubed fresh cheese + tomato' },
      { es: 'Una fruta', en: 'A piece of fruit' },
    ],
  },
  {
    id: 'dinner',
    time: '20:00',
    name: { es: 'Cena', en: 'Dinner' },
    ideas: [
      { es: 'Ensalada con atún o pollo deshebrado', en: 'Salad with tuna or shredded chicken' },
      { es: 'Quesadillas de nopal con queso panela (2)', en: 'Cactus and fresh-cheese quesadillas (2)' },
      { es: 'Huevo con verduras + té sin azúcar', en: 'Eggs with veggies + unsweetened tea' },
      { es: 'Sopa de verduras + un poco de pollo', en: 'Vegetable soup + a little chicken' },
    ],
  },
];

// ---------------------------------------------------------------- Habits

export type Habit = { id: string; label: L; emoji: string };

export const HABITS: Habit[] = [
  { id: 'walk', emoji: '🚶', label: { es: 'Caminar 30 minutos', en: 'Walk 30 minutes' } },
  { id: 'veggies', emoji: '🥗', label: { es: 'Verduras en 2 comidas', en: 'Veggies in 2 meals' } },
  { id: 'nosoda', emoji: '🚫', label: { es: 'Sin refresco ni jugo', en: 'No soda or juice' } },
  { id: 'slow', emoji: '🍽️', label: { es: 'Comer despacio, sin pantalla', en: 'Eat slowly, no screens' } },
  { id: 'sleep', emoji: '😴', label: { es: 'Dormir 7 horas', en: 'Sleep 7 hours' } },
];

// ---------------------------------------------------------------- Tips

export const TIPS: L[] = [
  { es: 'Empieza cada comida con la verdura: llena más y ayuda a comer menos de lo demás.', en: 'Start every meal with the veggies: they fill you up so you eat less of the rest.' },
  { es: 'Usa un plato más chico. Se ve lleno y comes menos sin darte cuenta.', en: "Use a smaller plate. It looks full and you eat less without noticing." },
  { es: 'Si tienes hambre entre comidas, primero toma agua. Muchas veces es sed.', en: "If you're hungry between meals, drink water first. Often it's thirst." },
  { es: 'No vayas al súper con hambre: compras más cosas que no necesitas.', en: "Don't go grocery shopping hungry: you'll buy things you don't need." },
  { es: 'Un mal día no arruina nada. Lo que cuenta es lo que haces la mayoría de los días.', en: "One bad day ruins nothing. What counts is what you do most days." },
  { es: 'Camina 10 minutos después de comer: ayuda a controlar el azúcar en la sangre.', en: 'Walk 10 minutes after eating: it helps control blood sugar.' },
  { es: 'Deja de comer cuando estés satisfecho, no cuando estés lleno.', en: 'Stop eating when you feel satisfied, not stuffed.' },
  { es: 'Ten fruta lavada y a la vista. Lo que ves es lo que comes.', en: 'Keep fruit washed and in sight. What you see is what you eat.' },
  { es: 'El refresco y el jugo son azúcar líquida. El agua mineral con limón es buena alternativa.', en: 'Soda and juice are liquid sugar. Sparkling water with lime is a good swap.' },
  { es: 'Cena ligero y al menos 2 horas antes de dormir.', en: 'Eat a light dinner at least 2 hours before bed.' },
  { es: 'Las tortillas cuentan: 2 o 3 por comida es suficiente.', en: 'Tortillas count: 2 or 3 per meal is enough.' },
  { es: 'Prepara de más en la comida y guarda una porción para mañana.', en: 'Cook extra at lunch and save a portion for tomorrow.' },
  { es: 'Dormir mal da más hambre al día siguiente. El descanso también es parte del plan.', en: "Poor sleep makes you hungrier the next day. Rest is part of the plan too." },
  { es: 'Lee las etiquetas: si el azúcar aparece entre los 3 primeros ingredientes, mejor déjalo.', en: 'Read labels: if sugar is among the first 3 ingredients, put it back.' },
];

export const CRAVINGS: { sweet: L[]; salty: L[]; filling: L[] } = {
  sweet: [
    { es: 'Fruta congelada (uvas o plátano)', en: 'Frozen fruit (grapes or banana)' },
    { es: 'Yogur natural con canela', en: 'Plain yogurt with cinnamon' },
    { es: '2 cuadritos de chocolate amargo (70%+)', en: '2 squares of dark chocolate (70%+)' },
    { es: 'Gelatina sin azúcar', en: 'Sugar-free jello' },
  ],
  salty: [
    { es: 'Pepino o jícama con limón, sal y chile', en: 'Cucumber or jicama with lime, salt and chili' },
    { es: 'Palomitas naturales', en: 'Plain popcorn' },
    { es: 'Un puñito de cacahuates naturales', en: 'A small handful of plain peanuts' },
    { es: 'Aceitunas o pepinillos', en: 'Olives or pickles' },
  ],
  filling: [
    { es: 'Un huevo cocido', en: 'A hard-boiled egg' },
    { es: 'Queso panela con jitomate', en: 'Fresh cheese with tomato' },
    { es: 'Una taza de caldo o consomé', en: 'A cup of broth' },
    { es: 'Rollitos de jamón de pavo con pepino', en: 'Turkey ham rolled around cucumber' },
  ],
};

// ---------------------------------------------------------------- Eating out

export type Place = {
  id: string;
  emoji: string;
  name: L;
  best: L[];
  ok: L[];
  avoid: L[];
  trick: L;
};

export const PLACES: Place[] = [
  {
    id: 'tacos',
    emoji: '🌮',
    name: { es: 'Taquería', en: 'Taco stand' },
    best: [
      { es: 'Tacos de bistec, pollo o arrachera asados', en: 'Grilled steak, chicken or skirt-steak tacos' },
      { es: 'Tacos de pescado a la plancha', en: 'Grilled fish tacos' },
      { es: 'Nopales, cebollitas y salsa a gusto', en: 'Cactus, grilled onions and salsa as you like' },
    ],
    ok: [
      { es: 'Al pastor (máximo 3)', en: 'Al pastor (3 max)' },
      { es: 'Frijoles charros', en: 'Charro beans' },
    ],
    avoid: [
      { es: 'Suadero, tripa, campechanos con chorizo', en: 'Suadero, tripe, chorizo mixes' },
      { es: 'Gringas, volcanes, cosas con mucho queso', en: 'Gringas, volcanes, anything loaded with cheese' },
      { es: 'Refresco', en: 'Soda' },
    ],
    trick: {
      es: 'Pide 3 tacos con una sola tortilla cada uno, y acompaña con pepino y rábanos.',
      en: 'Order 3 tacos with a single tortilla each, and add cucumber and radishes.',
    },
  },
  {
    id: 'fonda',
    emoji: '🍲',
    name: { es: 'Fonda / comida corrida', en: 'Diner / set menu' },
    best: [
      { es: 'Sopa o caldo de verduras de entrada', en: 'Vegetable soup or broth to start' },
      { es: 'Guisado de pollo o res en salsa (no frito)', en: 'Chicken or beef stewed in sauce (not fried)' },
      { es: 'Ensalada y frijoles de la olla', en: 'Salad and whole (not refried) beans' },
    ],
    ok: [
      { es: 'Arroz (media porción)', en: 'Rice (half portion)' },
      { es: 'Agua fresca: pide que sea con poca azúcar', en: 'Agua fresca: ask for little sugar' },
    ],
    avoid: [
      { es: 'Milanesa, chiles rellenos capeados, flautas', en: 'Breaded cutlets, battered stuffed chiles, flautas' },
      { es: 'Postre del día', en: 'Dessert of the day' },
    ],
    trick: {
      es: 'Cambia el arroz por más verdura o ensalada. Casi siempre te lo hacen.',
      en: "Swap the rice for more veggies or salad. They'll almost always do it.",
    },
  },
  {
    id: 'burgers',
    emoji: '🍔',
    name: { es: 'Comida rápida', en: 'Fast food' },
    best: [
      { es: 'Hamburguesa sencilla (una carne) sin queso extra', en: 'Single-patty burger, no extra cheese' },
      { es: 'Ensalada con pollo a la parrilla', en: 'Salad with grilled chicken' },
      { es: 'Agua o refresco sin azúcar', en: 'Water or diet soda' },
    ],
    ok: [
      { es: 'Papas chicas, compartidas', en: 'Small fries, shared' },
      { es: 'Wrap de pollo a la parrilla', en: 'Grilled chicken wrap' },
    ],
    avoid: [
      { es: 'Combos agrandados', en: 'Super-sized combos' },
      { es: 'Doble carne, tocino, pollo empanizado', en: 'Double patty, bacon, breaded chicken' },
      { es: 'Malteadas', en: 'Milkshakes' },
    ],
    trick: {
      es: 'No pidas combo: pide la hamburguesa sola y agua. Te ahorras como 500 calorías.',
      en: 'Skip the combo: order the burger alone with water. Saves about 500 calories.',
    },
  },
  {
    id: 'pizza',
    emoji: '🍕',
    name: { es: 'Pizza', en: 'Pizza' },
    best: [
      { es: 'Masa delgada con verduras o pollo', en: 'Thin crust with veggies or chicken' },
      { es: 'Una ensalada antes', en: 'A salad first' },
    ],
    ok: [
      { es: '2 rebanadas, no más', en: '2 slices, no more' },
      { es: 'Hawaiana o de jamón', en: 'Hawaiian or ham' },
    ],
    avoid: [
      { es: 'Orilla rellena de queso, masa gruesa', en: 'Cheese-stuffed crust, deep dish' },
      { es: 'Pepperoni + salchicha + extra queso', en: 'Pepperoni + sausage + extra cheese' },
      { es: 'Alitas y pan de ajo', en: 'Wings and garlic bread' },
    ],
    trick: {
      es: 'Sirve tus 2 rebanadas en un plato y aléjate de la caja.',
      en: 'Put your 2 slices on a plate and walk away from the box.',
    },
  },
  {
    id: 'chinese',
    emoji: '🥡',
    name: { es: 'Comida china', en: 'Chinese food' },
    best: [
      { es: 'Pollo o res con verduras salteadas', en: 'Chicken or beef stir-fried with veggies' },
      { es: 'Arroz blanco al vapor (poco)', en: 'Steamed white rice (a little)' },
      { es: 'Sopa wonton o sopa de verduras', en: 'Wonton or vegetable soup' },
    ],
    ok: [
      { es: 'Chop suey', en: 'Chop suey' },
      { es: 'Pollo a la naranja: media porción', en: 'Orange chicken: half portion' },
    ],
    avoid: [
      { es: 'Todo lo capeado o "crispy"', en: 'Anything battered or "crispy"' },
      { es: 'Arroz frito, chow mein, rollos primavera', en: 'Fried rice, chow mein, egg rolls' },
      { es: 'Buffet libre', en: 'All-you-can-eat buffet' },
    ],
    trick: {
      es: 'Pide la salsa aparte y usa poca: ahí está mucha del azúcar y la sal.',
      en: 'Ask for sauce on the side and use little: that is where much of the sugar and salt is.',
    },
  },
  {
    id: 'sushi',
    emoji: '🍣',
    name: { es: 'Sushi', en: 'Sushi' },
    best: [
      { es: 'Sashimi, nigiri, rollos naturales', en: 'Sashimi, nigiri, plain rolls' },
      { es: 'Ensalada de pepino o kani', en: 'Cucumber or crab salad' },
      { es: 'Sopa miso', en: 'Miso soup' },
    ],
    ok: [
      { es: 'Un rollo normal (8 piezas)', en: 'One regular roll (8 pieces)' },
      { es: 'Yakimeshi: compartido', en: 'Fried rice: shared' },
    ],
    avoid: [
      { es: 'Rollos empanizados o con queso crema', en: 'Tempura or cream-cheese rolls' },
      { es: 'Salsa de anguila, mayonesa spicy', en: 'Eel sauce, spicy mayo' },
      { es: 'Mucha salsa de soya (mucha sal)', en: 'Lots of soy sauce (very salty)' },
    ],
    trick: {
      es: 'Empieza con sopa miso y ensalada; luego un solo rollo es suficiente.',
      en: 'Start with miso soup and salad; then a single roll is enough.',
    },
  },
  {
    id: 'chicken',
    emoji: '🍗',
    name: { es: 'Pollo asado / rosticería', en: 'Rotisserie chicken' },
    best: [
      { es: 'Pollo asado sin piel', en: 'Roast chicken without the skin' },
      { es: 'Ensalada, nopales, cebollitas', en: 'Salad, cactus, grilled onions' },
      { es: 'Frijoles charros (porción chica)', en: 'Charro beans (small portion)' },
    ],
    ok: [
      { es: '2-3 tortillas', en: '2–3 tortillas' },
      { es: 'Arroz: media porción', en: 'Rice: half portion' },
    ],
    avoid: [
      { es: 'Pollo frito o broaster', en: 'Fried chicken' },
      { es: 'Papas fritas y espagueti con crema', en: 'Fries and creamy spaghetti' },
    ],
    trick: {
      es: 'Quitarle la piel al pollo le quita casi la mitad de la grasa.',
      en: 'Removing the skin takes away almost half the fat.',
    },
  },
  {
    id: 'store',
    emoji: '🏪',
    name: { es: 'Tienda / OXXO', en: 'Convenience store' },
    best: [
      { es: 'Agua natural o mineral', en: 'Still or sparkling water' },
      { es: 'Cacahuates o almendras naturales (bolsita chica)', en: 'Plain peanuts or almonds (small bag)' },
      { es: 'Fruta, pepino o jícama en vaso', en: 'Fruit, cucumber or jicama cup' },
      { es: 'Yogur natural, huevo cocido, queso', en: 'Plain yogurt, boiled egg, cheese stick' },
    ],
    ok: [
      { es: 'Barra de proteína o de avena (revisa azúcar)', en: 'Protein or oat bar (check sugar)' },
      { es: 'Sándwich de pavo', en: 'Turkey sandwich' },
      { es: 'Café americano sin azúcar', en: 'Black coffee, no sugar' },
    ],
    avoid: [
      { es: 'Refrescos, jugos, bebidas energéticas', en: 'Soda, juice, energy drinks' },
      { es: 'Papitas, pan dulce, galletas', en: 'Chips, pastries, cookies' },
      { es: 'Hot dogs y nachos', en: 'Hot dogs and nachos' },
    ],
    trick: {
      es: 'Si tienes que comprar algo, busca proteína (huevo, queso, nueces) antes que harinas.',
      en: 'If you must buy something, look for protein (egg, cheese, nuts) before carbs.',
    },
  },
  {
    id: 'cafe',
    emoji: '☕',
    name: { es: 'Cafetería', en: 'Coffee shop' },
    best: [
      { es: 'Café americano o espresso', en: 'Black coffee or espresso' },
      { es: 'Té sin azúcar', en: 'Unsweetened tea' },
      { es: 'Capuchino chico con leche light', en: 'Small cappuccino with skim milk' },
    ],
    ok: [
      { es: 'Sándwich o baguette de pavo', en: 'Turkey sandwich or baguette' },
      { es: 'Avena o yogur con fruta', en: 'Oatmeal or yogurt with fruit' },
    ],
    avoid: [
      { es: 'Frappés, bebidas con crema batida', en: 'Frappuccinos, whipped-cream drinks' },
      { es: 'Panqués, croissants, galletas', en: 'Muffins, croissants, cookies' },
    ],
    trick: {
      es: 'Un frappé grande puede tener más azúcar que 2 refrescos. Pide el café más simple.',
      en: 'A large frappé can have more sugar than 2 sodas. Order the simplest coffee.',
    },
  },
  {
    id: 'party',
    emoji: '🎉',
    name: { es: 'Fiesta / carne asada', en: 'Party / barbecue' },
    best: [
      { es: 'Carne asada, pollo o salchicha de pavo', en: 'Grilled steak, chicken or turkey sausage' },
      { es: 'Nopales, cebollitas, guacamole (poco)', en: 'Cactus, grilled onions, a little guacamole' },
      { es: 'Agua mineral con limón', en: 'Sparkling water with lime' },
    ],
    ok: [
      { es: '1-2 cervezas light o una copa de vino', en: '1–2 light beers or a glass of wine' },
      { es: 'Una rebanada chica de pastel', en: 'A small slice of cake' },
    ],
    avoid: [
      { es: 'Chorizo, chicharrón, botanas fritas', en: 'Chorizo, pork rinds, fried snacks' },
      { es: 'Refresco con alcohol, micheladas preparadas', en: 'Mixed drinks with soda, loaded micheladas' },
      { es: 'Regresar por segundo plato', en: 'Going back for seconds' },
    ],
    trick: {
      es: 'Come algo ligero antes de ir y alterna cada bebida con un vaso de agua.',
      en: 'Eat something light before you go and alternate each drink with a glass of water.',
    },
  },
];

export const GOLDEN_RULES: L[] = [
  { es: 'Elige asado, a la plancha o al vapor en vez de frito o capeado.', en: 'Choose grilled, broiled or steamed over fried or battered.' },
  { es: 'Pide salsas y aderezos aparte.', en: 'Ask for sauces and dressings on the side.' },
  { es: 'Toma agua, no refresco ni jugo.', en: 'Drink water, not soda or juice.' },
  { es: 'Si la porción es grande, aparta la mitad para llevar desde el inicio.', en: 'If the portion is big, box half of it right away.' },
  { es: 'No hay que limpiar el plato. Para cuando estés satisfecho.', en: "You don't have to clean the plate. Stop when satisfied." },
];

// ---------------------------------------------------------------- Guide

export const PLATE = {
  title: { es: 'El plato ideal', en: 'The ideal plate' },
  intro: {
    es: 'Sirve así cada comida principal. No necesitas contar calorías.',
    en: "Serve every main meal like this. You don't need to count calories.",
  },
  parts: [
    { pct: 50, color: '#4caf50', label: { es: 'Verduras', en: 'Vegetables' }, examples: { es: 'Ensalada, nopales, calabaza, brócoli, ejotes, chayote', en: 'Salad, cactus, zucchini, broccoli, green beans, chayote' } },
    { pct: 25, color: '#e57373', label: { es: 'Proteína', en: 'Protein' }, examples: { es: 'Pollo, pescado, huevo, res magra, frijoles, atún', en: 'Chicken, fish, eggs, lean beef, beans, tuna' } },
    { pct: 25, color: '#ffb74d', label: { es: 'Carbohidrato', en: 'Carbs' }, examples: { es: 'Tortilla, arroz, papa, pasta, pan integral', en: 'Tortilla, rice, potato, pasta, whole-grain bread' } },
  ],
};

export const HAND = {
  title: { es: 'Porciones con tu mano', en: 'Portions with your hand' },
  items: [
    { emoji: '✋', label: { es: 'Palma', en: 'Palm' }, desc: { es: 'Proteína: carne, pollo, pescado', en: 'Protein: meat, chicken, fish' } },
    { emoji: '✊', label: { es: 'Puño', en: 'Fist' }, desc: { es: 'Carbohidrato: arroz, pasta, fruta', en: 'Carbs: rice, pasta, fruit' } },
    { emoji: '🤲', label: { es: 'Dos manos', en: 'Two hands' }, desc: { es: 'Verduras: todo lo que quepa', en: 'Veggies: as much as fits' } },
    { emoji: '👍', label: { es: 'Pulgar', en: 'Thumb' }, desc: { es: 'Grasa: aceite, crema, mantequilla', en: 'Fat: oil, cream, butter' } },
  ],
};

export const TRAFFIC = {
  title: { es: 'Semáforo de alimentos', en: 'Food traffic light' },
  green: {
    label: { es: 'Libre — cuando quieras', en: 'Go — anytime' },
    items: { es: 'Verduras, agua, té y café sin azúcar, caldos, pepino, jícama, nopales, lechuga, jitomate, limón, chile', en: 'Vegetables, water, unsweetened tea & coffee, broth, cucumber, jicama, cactus, lettuce, tomato, lime, chili' },
  },
  yellow: {
    label: { es: 'Con medida — en porciones', en: 'Slow — in portions' },
    items: { es: 'Tortillas, arroz, frijoles, fruta, pan integral, avena, huevo, pollo, pescado, queso panela, aguacate, nueces', en: 'Tortillas, rice, beans, fruit, whole-grain bread, oats, eggs, chicken, fish, fresh cheese, avocado, nuts' },
  },
  red: {
    label: { es: 'Ocasional — de vez en cuando', en: 'Stop — only occasionally' },
    items: { es: 'Refresco, jugos, pan dulce, galletas, frituras, embutidos, capeados, postres, alcohol, comida rápida', en: 'Soda, juice, pastries, cookies, chips, processed meats, battered food, desserts, alcohol, fast food' },
  },
};

export const SHOPPING = {
  title: { es: 'Lista del súper', en: 'Shopping list' },
  groups: [
    { name: { es: 'Verduras y frutas', en: 'Produce' }, items: { es: ['Lechuga o espinaca', 'Jitomate', 'Pepino', 'Nopales', 'Calabacitas', 'Brócoli', 'Cebolla y chile', 'Limones', 'Manzanas', 'Fresas o papaya'], en: ['Lettuce or spinach', 'Tomatoes', 'Cucumbers', 'Cactus paddles', 'Zucchini', 'Broccoli', 'Onion & chilies', 'Limes', 'Apples', 'Strawberries or papaya'] } },
    { name: { es: 'Proteína', en: 'Protein' }, items: { es: ['Pechuga de pollo', 'Huevo', 'Atún en agua', 'Pescado (tilapia)', 'Bistec de res magro', 'Queso panela', 'Yogur griego natural'], en: ['Chicken breast', 'Eggs', 'Tuna in water', 'Fish (tilapia)', 'Lean beef steak', 'Fresh cheese', 'Plain Greek yogurt'] } },
    { name: { es: 'Despensa', en: 'Pantry' }, items: { es: ['Tortillas de maíz', 'Frijoles', 'Avena', 'Arroz', 'Almendras o cacahuates', 'Aceite de oliva', 'Agua mineral'], en: ['Corn tortillas', 'Beans', 'Oats', 'Rice', 'Almonds or peanuts', 'Olive oil', 'Sparkling water'] } },
  ],
};
