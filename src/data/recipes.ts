import type { Recipe } from '../types'

export const RECIPES: Recipe[] = [
  {
    id: 'bacalao-vizcaina',
    name: 'Bacalao a la Vizcaína',
    origin: 'México / España',
    countries: ['México', 'España'],
    flag: '🇲🇽 🇪🇸',
    continent: 'america',
    secondaryContinent: 'europa',
    course: 'plato-fuerte',
    emoji: '🐟',
    img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80',
    prepTime: 45,
    cookTime: 60,
    time: 105,
    servings: 8,
    difficulty: 'Media',
    description:
      'Guiso festivo de bacalao desalado desmenuzado en salsa de jitomate asado, aceite de oliva, ajo, papas cambray, aceitunas, alcaparras y chiles güeros.',
    culturalNote:
      'Originario del País Vasco y adoptado en el México virreinal, es el rey indiscutible de la Nochebuena y del famoso recalentado del 25 de diciembre.',
    recipeOfTheDay: true,
    dayBadge: '⭐ Clásico Transatlántico del Día',
    ingredients: [
      { qty: '1 kg', name: 'Bacalao noruego salado sin piel ni espinas', notes: 'Remojado 36 h cambiando el agua' },
      { qty: '1.2 kg', name: 'Jitomates maduros asados', notes: 'Molidos sin semillas' },
      { qty: '1 taza', name: 'Aceite de oliva virgen extra', notes: 'Esencial para la emulsión' },
      { qty: '2 piezas', name: 'Cebollas blancas finamente picadas' },
      { qty: '8 dientes', name: 'Ajo laminado' },
      { qty: '500 g', name: 'Papas cambray cocidas y peladas' },
      { qty: '1 taza', name: 'Aceitunas verdes sin hueso' },
      { qty: '1/3 taza', name: 'Alcaparras drenadas' },
      { qty: '1 lata (200 g)', name: 'Pimientos morrones rojos en tiras' },
      { qty: '8 piezas', name: 'Chiles güeros largos en escabeche' },
      { qty: '1/2 manojo', name: 'Perejil fresco picado' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Desalado y desmenuzado del bacalao',
        instruction:
          'Remoja el bacalao en agua fría durante 36 horas cambiando el agua cada 8 horas. Cuécelo 10 minutos en agua limpia, escurre y desmenúzalo en lascas medianas retirando cualquier espina.',
        durationMin: 15,
        mediaType: 'video-guia',
        mediaLabel: 'Técnica de desalado perfecto',
        mediaCaption: 'Comprueba el punto de sal probando una hebra de la parte más gruesa del lomo.',
        mediaImg: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80',
        tip: 'Reserva media taza del caldo de cocción para ajustar la jugosidad del guiso.'
      },
      {
        stepNumber: 2,
        title: 'Sofrito lento en aceite de oliva',
        instruction:
          'En una cazuela amplia calienta el aceite de oliva a fuego medio-bajo. Acitrona el ajo laminado y la cebolla picada durante 15 minutos hasta que estén transparentes y dulces sin dorarse.',
        durationMin: 15,
        mediaType: 'foto',
        mediaLabel: 'Punto de pochado',
        mediaCaption: 'El aceite de oliva absorbe el aroma del ajo y la cebolla lentamente.',
        mediaImg: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=700&q=80',
        tip: 'No subas el fuego; el secreto vizcaíno está en confitar la cebolla.'
      },
      {
        stepNumber: 3,
        title: 'Reducción de jitomate e integración del bacalao',
        instruction:
          'Vierte el puré de jitomate asado y cocina 20 minutos hasta que cambie de color y el aceite suba a la superficie. Incorpora el bacalao desmenuzado y mezcla con movimientos envolventes.',
        durationMin: 20,
        mediaType: 'tip-chef',
        mediaLabel: 'Salsa ligada',
        mediaCaption: 'La gelatina natural del bacalao espesa la salsa de jitomate.',
        mediaImg: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=700&q=80',
        tip: 'Amasar suavemente la cazuela en vaivén ayuda a emulsionar la salsa.'
      },
      {
        stepNumber: 4,
        title: 'Papas cambray, aceitunas y chiles güeros',
        instruction:
          'Agrega las papas cambray, aceitunas, alcaparras, tiras de pimiento morrón, chiles güeros y perejil picado. Cocina a fuego mínimo 25 minutos más para fundir todos los sabores.',
        durationMin: 25,
        mediaType: 'foto',
        mediaLabel: 'Presentación de Nochebuena',
        mediaCaption: 'Decora con tiras de pimiento rojo y chiles güeros brillantes al servir.',
        mediaImg: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=700&q=80',
        tip: 'Prepáralo un día antes: el reposo nocturno intensifica su sabor.'
      }
    ],
    pins: [
      {
        country: 'México',
        flag: '🇲🇽',
        x: 21,
        y: 48,
        tradition: 'Imprescindible en las cenas del 24 de diciembre y en tortas durante el recalentado.'
      },
      {
        country: 'España',
        flag: '🇪🇸',
        x: 47,
        y: 35,
        tradition: 'Tradición vasca con pimiento choricero que cruzó el Atlántico.'
      }
    ]
  },
  {
    id: 'hallacas-navidenas',
    name: 'Hallacas Navideñas',
    origin: 'Venezuela',
    countries: ['Venezuela'],
    flag: '🇻🇪',
    continent: 'america',
    course: 'plato-fuerte',
    emoji: '🫔',
    img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1000&q=80',
    prepTime: 120,
    cookTime: 60,
    time: 180,
    servings: 12,
    difficulty: 'Alta',
    description:
      'Pastel tradicional de masa de maíz coloreada con onoto, relleno de un guiso perfumado de res, cerdo y gallina con aceitunas, pasas y alcaparras, envuelto en hojas de plátano ahumadas.',
    culturalNote:
      'Símbolo máximo de unión familiar en Venezuela: cada integrante de la familia tiene un rol en la "hallacada", desde limpiar las hojas hasta el amarre final.',
    recipeOfTheDay: true,
    dayBadge: '🌿 Joya del Caribe Navideño',
    ingredients: [
      { qty: '1 kg', name: 'Harina de maíz precocida' },
      { qty: '1/2 taza', name: 'Aceite o manteca coloreada con onoto (achiote)' },
      { qty: '600 g', name: 'Carne de res y 600 g de lomo de cerdo en cubos pequeños' },
      { qty: '500 g', name: 'Pechuga de gallina o pollo cocida y desmechada' },
      { qty: '1/2 taza', name: 'Vino dulce tipo Marsala o papelón rallado' },
      { qty: '1 taza', name: 'Aceitunas rellenas de pimiento' },
      { qty: '1/2 taza', name: 'Pasas rubias y oscuras' },
      { qty: '1/3 taza', name: 'Alcaparras pequeñas' },
      { qty: '24 hojas', name: 'Hojas de plátano asadas y limpias + pabilo de algodón' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Cocción lenta del guiso criollo',
        instruction:
          'Sofríe cebolla, ajo, ají dulce y pimentón. Añade la res y el cerdo, el vino dulce, papelón, alcaparras y caldo. Cocina 45 minutos e incorpora el pollo desmechado hasta lograr un guiso espeso.',
        durationMin: 45,
        mediaType: 'video-guia',
        mediaLabel: 'Textura del guiso caraqueño',
        mediaCaption: 'El guiso debe enfriarse por completo antes de armar las hallacas.',
        mediaImg: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80',
        tip: 'Espesa con un par de cucharadas de harina de maíz disuelta en caldo frío.'
      },
      {
        stepNumber: 2,
        title: 'Amasado dorado con aceite de onoto',
        instruction:
          'Mezcla la harina de maíz con caldo de gallina tibio, sal y el aceite coloreado con semillas de onoto hasta obtener una masa suave, elástica y de color amarillo brillante.',
        durationMin: 20,
        mediaType: 'foto',
        mediaLabel: 'Color dorado tradicional',
        mediaCaption: 'El onoto aporta color festivo y un aroma terroso inconfundible.',
        mediaImg: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80'
      },
      {
        stepNumber: 3,
        title: 'Tendido, adorno y amarre en hoja de plátano',
        instruction:
          'Extiende una esfera de masa sobre la hoja de plátano engrasada. Coloca una porción de guiso en el centro y decora con aceitunas, pasas, alcaparras, tiras de pimentón y aros de cebolla. Envuelve con faja y amarra en cruz con pabilo.',
        durationMin: 40,
        mediaType: 'tip-chef',
        mediaLabel: 'Amarre de tres vueltas',
        mediaCaption: 'Un buen amarre impide que entre agua durante el hervor.',
        mediaImg: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=700&q=80',
        tip: 'Pasa un paño húmedo por las hojas antes de engrasarlas.'
      },
      {
        stepNumber: 4,
        title: 'Hervor y reposo',
        instruction:
          'Introduce las hallacas en una olla grande con agua hirviendo con sal durante 1 hora. Escúrrelas verticalmente para que compacten antes de servir calientes.',
        durationMin: 60,
        mediaType: 'foto',
        mediaLabel: 'Desenvuelto en la mesa',
        mediaCaption: 'Acompaña con pan de jamón y ensalada de gallina.',
        mediaImg: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=700&q=80'
      }
    ],
    pins: [
      {
        country: 'Venezuela',
        flag: '🇻🇪',
        x: 30,
        y: 57,
        tradition: 'Reina de la mesa navideña venezolana acompañada de pan de jamón.'
      }
    ]
  },
  {
    id: 'vitel-tone',
    name: 'Vitel Toné',
    origin: 'Argentina / Italia',
    countries: ['Argentina', 'Italia'],
    flag: '🇦🇷 🇮🇹',
    continent: 'america',
    secondaryContinent: 'europa',
    course: 'entrada',
    emoji: '🥩',
    img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    prepTime: 30,
    cookTime: 90,
    time: 120,
    servings: 10,
    difficulty: 'Media',
    description:
      'Finas láminas de peceto (redondo de ternera) cocido en caldo aromático y bañado en una sedosa emulsión fría de atún, anchoas, yemas, crema y alcaparras.',
    culturalNote:
      'Nacido en el Piamonte italiano como "Vitello Tonnato", los inmigrantes lo convirtieron en el emblema fresco de las cálidas Nochebuenas argentinas.',
    recipeOfTheDay: false,
    ingredients: [
      { qty: '1.5 kg', name: 'Peceto (redondo de ternera) limpio' },
      { qty: '1 pieza', name: 'Zanahoria, 1 cebolla, 2 ramas de apio y laurel para el caldo' },
      { qty: '2 latas (340 g)', name: 'Atún en aceite de oliva de buena calidad' },
      { qty: '4 filetes', name: 'Anchoas en aceite' },
      { qty: '3 piezas', name: 'Yemas de huevo duro' },
      { qty: '200 ml', name: 'Mayonesa casera' },
      { qty: '150 ml', name: 'Crema de leche (nata)' },
      { qty: '1 cda', name: 'Mostaza de Dijon' },
      { qty: '1/2 taza', name: 'Alcaparras para la salsa y decoración' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Hervor suave del peceto en caldo aromático',
        instruction:
          'Sella el peceto o colócalo directamente en una olla con agua, verduras, laurel, granos de pimienta y sal. Cocina a hervor suave durante 75-90 minutos y deja enfriar dentro del mismo caldo.',
        durationMin: 90,
        mediaType: 'tip-chef',
        mediaLabel: 'Enfriado en su propio caldo',
        mediaCaption: 'Enfriar la carne en el líquido evita que se reseque y facilita el corte.',
        mediaImg: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=700&q=80',
        tip: 'Envuelve el peceto frío en film y refrigera 2 horas para lograr rebanadas milimétricas.'
      },
      {
        stepNumber: 2,
        title: 'Emulsión de la salsa tonnata',
        instruction:
          'Procesa en licuadora el atún escurrido, las anchoas, las yemas cocidas, la mostaza, 1 cucharada de alcaparras, la mayonesa, la crema y un cucharón del caldo de cocción frío hasta obtener una crema aterciopelada.',
        durationMin: 10,
        mediaType: 'video-guia',
        mediaLabel: 'Punto de fluidez de la salsa',
        mediaCaption: 'Debe cubrir el dorso de una cuchara de forma pareja y brillante.',
        mediaImg: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=700&q=80'
      },
      {
        stepNumber: 3,
        title: 'Fileteado fino y reposo en frío',
        instruction:
          'Corta el peceto en láminas muy delgadas. Cubre el fondo de una fuente con salsa, acomoda las lonjas encimadas, baña generosamente con el resto de la salsa y decora con alcaparras y huevo duro rallado.',
        durationMin: 20,
        mediaType: 'foto',
        mediaLabel: 'Emplatado clásico porteño',
        mediaCaption: 'Refrigera mínimo 4 horas antes de llevar a la mesa navideña.',
        mediaImg: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80'
      }
    ],
    pins: [
      {
        country: 'Argentina',
        flag: '🇦🇷',
        x: 32,
        y: 80,
        tradition: 'Entrada fría infaltable para el brindis de medianoche en pleno verano austral.'
      },
      {
        country: 'Italia',
        flag: '🇮🇹',
        x: 52,
        y: 34,
        tradition: 'Receta piamontesa de vigilia y fiestas invernales.'
      }
    ]
  },
  {
    id: 'pavo-relleno',
    name: 'Pavo Relleno',
    origin: 'EE. UU. / Canadá',
    countries: ['Estados Unidos', 'Canadá'],
    flag: '🇺🇸 🇨🇦',
    continent: 'america',
    course: 'plato-fuerte',
    emoji: '🦃',
    img: 'https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?auto=format&fit=crop&w=1000&q=80',
    prepTime: 40,
    cookTime: 200,
    time: 240,
    servings: 12,
    difficulty: 'Alta',
    description:
      'Pavo entero horneado con mantequilla de salvia, romero y tomillo, relleno de pan rústico, manzana, apio, nueces pecanas y arándanos rojos, servido con salsa gravy.',
    culturalNote:
      'Centro absoluto del banquete navideño norteamericano; su aroma a hierbas frescas y mantequilla dorada anuncia la cena familiar.',
    recipeOfTheDay: true,
    dayBadge: '🦃 Estrella del Banquete',
    ingredients: [
      { qty: '1 pieza (5.5 kg)', name: 'Pavo entero limpio y descongelado' },
      { qty: '220 g', name: 'Mantequilla sin sal a temperatura ambiente' },
      { qty: '3 cdas', name: 'Salvia, romero y tomillo frescos finamente picados' },
      { qty: '400 g', name: 'Cubos de pan brioche o campesino tostado' },
      { qty: '2 piezas', name: 'Manzanas Honeycrisp o Granny Smith en cubos' },
      { qty: '3 ramas', name: 'Apio picado y 1 cebolla amarilla picada' },
      { qty: '1 taza', name: 'Arándanos rojos deshidratados y 1 taza de nueces pecanas' },
      { qty: '1 L', name: 'Caldo de pavo o pollo para el relleno y gravy' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Mantequilla aromática bajo la piel',
        instruction:
          'Mezcla la mantequilla blanda con las hierbas frescas, ajo, ralladura de naranja, sal y pimienta. Separa con cuidado la piel de la pechuga e introduce la mitad de la mantequilla debajo; unta el resto por fuera.',
        durationMin: 20,
        mediaType: 'video-guia',
        mediaLabel: 'Pechuga jugosa garantizada',
        mediaCaption: 'Colocar mantequilla bajo la piel mantiene la carne húmeda durante las 3 horas de horno.',
        mediaImg: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=700&q=80',
        tip: 'Seca muy bien la piel con papel absorbente antes de untar para que quede crujiente.'
      },
      {
        stepNumber: 2,
        title: 'Preparación del Stuffing (relleno tradicional)',
        instruction:
          'Saltea cebolla, apio y manzana en mantequilla. Mezcla con el pan tostado, nueces pecanas, arándanos y caldo tibio hasta que el pan esté hidratado pero firme.',
        durationMin: 20,
        mediaType: 'foto',
        mediaLabel: 'Relleno rústico de pan y frutos',
        mediaCaption: 'No comprimas demasiado el relleno dentro de la cavidad del pavo.',
        mediaImg: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=700&q=80'
      },
      {
        stepNumber: 3,
        title: 'Horneado lento y glaseado con sus jugos',
        instruction:
          'Hornea a 175 °C durante 3 horas y 20 minutos, bañando el pavo con sus propios jugos cada 40 minutos. Si la piel se dora rápido, cúbrelo holgadamente con papel aluminio.',
        durationMin: 200,
        mediaType: 'tip-chef',
        mediaLabel: 'Control de temperatura interna',
        mediaCaption: 'La parte más gruesa del muslo debe alcanzar 74 °C (165 °F).',
        mediaImg: 'https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?auto=format&fit=crop&w=700&q=80',
        tip: 'Deja reposar el pavo 25 minutos antes de trinchar para redistribuir los jugos.'
      }
    ],
    pins: [
      {
        country: 'Estados Unidos',
        flag: '🇺🇸',
        x: 22,
        y: 36,
        tradition: 'Servido con salsa de arándanos rojos y gravy espeso.'
      },
      {
        country: 'Canadá',
        flag: '🇨🇦',
        x: 23,
        y: 26,
        tradition: 'Tradición invernal acompañada de vegetales glaseados con jarabe de arce.'
      }
    ]
  },
  {
    id: 'buche-de-noel',
    name: 'Bûche de Noël',
    origin: 'Francia',
    countries: ['Francia'],
    flag: '🇫🇷',
    continent: 'europa',
    course: 'postre',
    emoji: '🪵',
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80',
    prepTime: 65,
    cookTime: 15,
    time: 80,
    servings: 10,
    difficulty: 'Media',
    description:
      'Clásico tronco navideño francés de bizcocho genovés flexible de cacao, relleno de crema mousseline de avellanas y cubierto con ganache de chocolate negro estriado como corteza de árbol.',
    culturalNote:
      'Evoca la antigua tradición celta y francesa de quemar un gran tronco de madera en la chimenea durante la noche del solsticio de invierno.',
    recipeOfTheDay: true,
    dayBadge: '🍫 Alta Pastelería Francesa',
    ingredients: [
      { qty: '5 piezas', name: 'Huevos grandes a temperatura ambiente' },
      { qty: '125 g', name: 'Azúcar refinada' },
      { qty: '95 g', name: 'Harina de repostería tamizada' },
      { qty: '30 g', name: 'Cacao puro sin azúcar' },
      { qty: '250 g', name: 'Chocolate oscuro (70% cacao) picado' },
      { qty: '300 ml', name: 'Crema para batir (nata 35% MG)' },
      { qty: '100 g', name: 'Praliné de avellanas o crema de castañas' },
      { qty: '3 cdas', name: 'Azúcar glass y arándanos escarchados para decorar' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Bizcocho biscuit aireado y horneado corto',
        instruction:
          'Bate los huevos con el azúcar durante 8 minutos hasta punto de letra. Incorpora harina y cacao con espátula. Extiende en placa con papel encerado y hornea a 190 °C exactamente 10-12 minutos.',
        durationMin: 20,
        mediaType: 'video-guia',
        mediaLabel: 'Enrollado en caliente',
        mediaCaption: 'Vuelca el bizcocho tibio sobre un paño húmedo y enróllalo de inmediato para darle memoria elástica.',
        mediaImg: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=700&q=80',
        tip: 'No hornees de más o el bizcocho se quebrará al enrollar.'
      },
      {
        stepNumber: 2,
        title: 'Relleno cremoso de praliné y armado',
        instruction:
          'Bate la mitad de la crema fría con el praliné de avellanas. Desenrolla el bizcocho frío, pincela con almíbar ligero, extiende el relleno y vuelve a enrollar con firmeza.',
        durationMin: 25,
        mediaType: 'foto',
        mediaLabel: 'Espiral perfecta',
        mediaCaption: 'Corta un extremo en diagonal y colócalo a un costado para simular una rama.',
        mediaImg: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80'
      },
      {
        stepNumber: 3,
        title: 'Corteza de ganache y nieve de azúcar',
        instruction:
          'Funde el chocolate con la crema restante caliente, deja entibiar y cubre el tronco. Traza surcos con un tenedor imitando la corteza y espolvorea azúcar glass como nieve recién caída.',
        durationMin: 35,
        mediaType: 'tip-chef',
        mediaLabel: 'Acabado de bosque nevado',
        mediaCaption: 'Decora con merenguitos en forma de hongos, ramitas de romero y frutos rojos.',
        mediaImg: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80'
      }
    ],
    pins: [
      {
        country: 'Francia',
        flag: '🇫🇷',
        x: 49,
        y: 31,
        tradition: 'Broche de oro del Réveillon francés en Nochebuena.'
      }
    ]
  },
  {
    id: 'christmas-pudding',
    name: 'Christmas Pudding',
    origin: 'Reino Unido',
    countries: ['Reino Unido'],
    flag: '🇬🇧',
    continent: 'europa',
    course: 'postre',
    emoji: '🍮',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    prepTime: 45,
    cookTime: 240,
    time: 285,
    servings: 10,
    difficulty: 'Media',
    description:
      'Budín británico cocido al vapor, denso y aromático, repleto de frutas secas maceradas en brandy, especias de invierno, cáscara de cítricos y flambeado al momento de servir.',
    culturalNote:
      'Tradicionalmente preparado en el "Stir-up Sunday" cinco semanas antes de Navidad; cada miembro de la familia mueve la mezcla de este a oeste pidiendo un deseo.',
    recipeOfTheDay: false,
    ingredients: [
      { qty: '450 g', name: 'Mezcla de pasas sultanas, corinto, ciruelas e higos picados' },
      { qty: '120 ml', name: 'Brandy o ron oscuro + jugo de 1 naranja' },
      { qty: '100 g', name: 'Mantequilla congelada rallada (o suet tradicional)' },
      { qty: '120 g', name: 'Azúcar mascabado oscuro' },
      { qty: '100 g', name: 'Miga de pan fresco y 60 g de harina' },
      { qty: '2 cdita', name: 'Mezcla de especias (canela, nuez moscada, clavo, jengibre)' },
      { qty: '1 pieza', name: 'Manzana rallada y ralladura de limón y naranja' },
      { qty: '2 piezas', name: 'Huevos batidos' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Maceración nocturna de frutos en brandy',
        instruction:
          'Coloca todas las frutas secas picadas en un tazón con el brandy, el jugo y la ralladura de naranja. Cubre y deja macerar al menos 12 horas para que se hidraten por completo.',
        durationMin: 15,
        mediaType: 'foto',
        mediaLabel: 'Frutos macerados en licor',
        mediaCaption: 'El alcohol conserva la humedad y perfuma toda la miga.',
        mediaImg: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80'
      },
      {
        stepNumber: 2,
        title: 'Integración del Stir-up Sunday',
        instruction:
          'Agrega el azúcar mascabado, miga de pan, harina, especias, manzana rallada, mantequilla rallada y los huevos batidos. Mezcla vigorosamente hasta integrar.',
        durationMin: 20,
        mediaType: 'tip-chef',
        mediaLabel: 'Ritual de la moneda de la suerte',
        mediaCaption: 'Tradicionalmente se escondía una moneda de plata limpia en la mezcla para augurar prosperidad.',
        mediaImg: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=700&q=80'
      },
      {
        stepNumber: 3,
        title: 'Cocción prolongada al vapor y flambeado',
        instruction:
          'Vierte en un molde tipo pudding engrasado, sella con papel encerado y aluminio plegado, y cuece al vapor durante 4 horas. Al servir, desmolda, vierte brandy tibio encima y enciéndelo.',
        durationMin: 240,
        mediaType: 'video-guia',
        mediaLabel: 'Flambeado azul en la mesa',
        mediaCaption: 'Sirve acompañado de Brandy Butter (mantequilla batida con brandy y azúcar glass).',
        mediaImg: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=700&q=80'
      }
    ],
    pins: [
      {
        country: 'Reino Unido',
        flag: '🇬🇧',
        x: 47,
        y: 26,
        tradition: 'Llevado a la mesa con una ramita de acebo y envuelto en llamas azules de brandy.'
      }
    ]
  },
  {
    id: 'weihnachtsgans',
    name: 'Weihnachtsgans',
    origin: 'Alemania',
    countries: ['Alemania'],
    flag: '🇩🇪',
    continent: 'europa',
    course: 'plato-fuerte',
    emoji: '🦢',
    img: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=1000&q=80',
    prepTime: 35,
    cookTime: 180,
    time: 215,
    servings: 8,
    difficulty: 'Alta',
    description:
      'Ganso de Navidad asado lentamente hasta lograr una piel laqueada y crujiente, relleno de manzanas ácidas, castañas, cebolla y artemisa (Beifuß), acompañado de col lombarda.',
    culturalNote:
      'Tradición alemana desde la Edad Media ligada a San Martín y consolidada como el gran asado familiar del 25 de diciembre.',
    recipeOfTheDay: false,
    ingredients: [
      { qty: '1 pieza (4.5 kg)', name: 'Ganso entero limpio' },
      { qty: '4 piezas', name: 'Manzanas Boskoop o verdes en cuartos' },
      { qty: '250 g', name: 'Castañas peladas y cocidas' },
      { qty: '100 g', name: 'Ciruelas pasas sin hueso' },
      { qty: '2 cdas', name: 'Artemisa seca (Beifuß) y mejorana' },
      { qty: '2 piezas', name: 'Cebollas en cuartos' },
      { qty: '500 ml', name: 'Caldo de ave y 150 ml de vino tinto para la salsa' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Relleno de manzanas, castañas y hierbas',
        instruction:
          'Frota el interior y exterior del ganso con sal, pimienta, mejorana y artemisa. Rellena la cavidad con las manzanas, castañas, ciruelas pasas y cebolla, y cierra con palillos o hilo de cocina.',
        durationMin: 25,
        mediaType: 'foto',
        mediaLabel: 'Aromáticos de invierno alemán',
        mediaCaption: 'La artemisa (Beifuß) ayuda a digerir la rica grasa del ganso y aporta un perfume herbal único.',
        mediaImg: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=700&q=80'
      },
      {
        stepNumber: 2,
        title: 'Asado con punzado de piel para extraer grasa',
        instruction:
          'Pincha ligeramente la piel bajo los muslos y las alas sin tocar la carne. Coloca el ganso con la pechuga hacia abajo 1 hora a 170 °C con caldo en la bandeja; luego voltéalo y hornea 2 horas más.',
        durationMin: 180,
        mediaType: 'tip-chef',
        mediaLabel: 'Truco del agua fría al final',
        mediaCaption: 'Pincela con agua fría con sal los últimos 15 minutos a 200 °C para una piel ultra crujiente.',
        mediaImg: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',
        tip: 'Retira con cucharón el exceso de grasa derretida y guárdala: es oro líquido para asar papas.'
      },
      {
        stepNumber: 3,
        title: 'Salsa oscura al vino tinto y emplatado',
        instruction:
          'Desglasa el fondo de cocción desgrasado con vino tinto y caldo, cuela y reduce hasta espesar. Sirve el ganso trinchado con col lombarda braseada (Rotkohl) y albóndigas de papa (Klöße).',
        durationMin: 15,
        mediaType: 'video-guia',
        mediaLabel: 'Acompañamiento tradicional alemán',
        mediaCaption: 'El dulzor ácido de la col morada equilibra la riqueza del ganso.',
        mediaImg: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=700&q=80'
      }
    ],
    pins: [
      {
        country: 'Alemania',
        flag: '🇩🇪',
        x: 52,
        y: 28,
        tradition: 'Servido el primer día de Navidad con Klöße (albóndigas de papa) y Rotkohl.'
      }
    ]
  },
  {
    id: 'pavlova-frutos-rojos',
    name: 'Pavlova de Frutos Rojos',
    origin: 'Australia / Nueva Zelanda',
    countries: ['Australia', 'Nueva Zelanda'],
    flag: '🇦🇺 🇳🇿',
    continent: 'oceania',
    course: 'postre',
    emoji: '🍓',
    img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1000&q=80',
    prepTime: 30,
    cookTime: 90,
    time: 120,
    servings: 8,
    difficulty: 'Fácil',
    description:
      'Corona de merengue horneado, crujiente por fuera y suave como malvavisco por dentro, cubierta de crema batida fresca, fresas, frambuesas, zarzamoras, arándanos y menta.',
    culturalNote:
      'Creada en honor a la bailarina rusa Anna Pavlova durante su gira de 1926 por Oceanía, es el postre insignia de la Navidad veraniega en el hemisferio sur.',
    recipeOfTheDay: true,
    dayBadge: '🍓 Navidad de Verano en Oceanía',
    ingredients: [
      { qty: '6 piezas', name: 'Claras de huevo a temperatura ambiente (sin rastro de yema)' },
      { qty: '300 g', name: 'Azúcar blanca extrafina (caster sugar)' },
      { qty: '2 cditas', name: 'Fécula de maíz (Maicena)' },
      { qty: '1 cdita', name: 'Vinagre blanco o jugo de limón' },
      { qty: '1 cdita', name: 'Extracto de vainilla' },
      { qty: '400 ml', name: 'Crema para batir muy fría' },
      { qty: '500 g', name: 'Mix de frutos rojos frescos (fresas, frambuesas, arándanos y moras)' },
      { qty: '2 piezas', name: 'Pulpa de maracuyá o hojas de menta fresca (opcional)' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Merengue firme y brillante',
        instruction:
          'Bate las claras a punto de nieve suave y añade el azúcar cucharada por cucharada batiendo 30 segundos entre cada adición. Cuando no se sientan granos de azúcar al frotar entre los dedos, incorpora fécula, vinagre y vainilla.',
        durationMin: 15,
        mediaType: 'video-guia',
        mediaLabel: 'Prueba de los dedos sin grano',
        mediaCaption: 'La fécula y el vinagre crean el centro húmedo tipo malvavisco característico de la Pavlova.',
        mediaImg: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=700&q=80',
        tip: 'Usa un tazón de metal o vidrio perfectamente limpio y libre de grasa.'
      },
      {
        stepNumber: 2,
        title: 'Formado de corona y secado lento en horno',
        instruction:
          'Forma un círculo alto de merengue con una ligera depresión central sobre papel encerado. Hornea a 120 °C durante 90 minutos. Apaga el horno y deja enfriar por completo adentro con la puerta entreabierta.',
        durationMin: 90,
        mediaType: 'tip-chef',
        mediaLabel: 'Enfriado gradual sin grietas',
        mediaCaption: 'El cambio brusco de temperatura colapsa el merengue; déjalo reposar dentro del horno apagado.',
        mediaImg: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=80'
      },
      {
        stepNumber: 3,
        title: 'Montaje con crema chantilly y frutos rojos',
        instruction:
          'Justo antes de servir, rellena el centro con la crema batida sin endulzar en exceso y corona con una montaña abundante de frutos rojos frescos y hojas de menta.',
        durationMin: 15,
        mediaType: 'foto',
        mediaLabel: 'Corona festiva austral',
        mediaCaption: 'Arma la Pavlova máximo 30 minutos antes de llevarla a la mesa para conservar su corteza crujiente.',
        mediaImg: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=80'
      }
    ],
    pins: [
      {
        country: 'Australia',
        flag: '🇦🇺',
        x: 84,
        y: 76,
        tradition: 'Estrella de los almuerzos navideños al aire libre el 25 de diciembre.'
      },
      {
        country: 'Nueva Zelanda',
        flag: '🇳🇿',
        x: 93,
        y: 83,
        tradition: 'Coronada con frutos rojos y flores de Pohutukawa (el árbol de Navidad neozelandés).'
      }
    ]
  }
]

/**
 * Devuelve la estructura JSON limpia y estandarizada de una receta
 * para facilitar su integración o exportación en cualquier cliente o API.
 */
export function toRecipeJSON(r: Recipe) {
  return {
    id: r.id,
    platillo: r.name,
    origen: r.origin,
    paises: r.countries,
    continente: r.continent,
    continenteSecundario: r.secondaryContinent ?? null,
    categoriaCurso: r.course,
    tiempos: {
      preparacionMin: r.prepTime,
      coccionMin: r.cookTime,
      totalMin: r.time
    },
    porciones: r.servings,
    dificultad: r.difficulty,
    descripcion: r.description,
    notaCultural: r.culturalNote,
    ingredientes: r.ingredients.map(i => ({
      cantidad: i.qty,
      ingrediente: i.name,
      notas: i.notes ?? null
    })),
    pasos: r.steps.map(s => ({
      orden: s.stepNumber,
      titulo: s.title,
      instruccion: s.instruction,
      duracionEstimadaMin: s.durationMin ?? null,
      multimedia: {
        tipo: s.mediaType,
        etiqueta: s.mediaLabel,
        descripcion: s.mediaCaption,
        urlImagen: s.mediaImg
      },
      tipChef: s.tip ?? null
    }))
  }
}
