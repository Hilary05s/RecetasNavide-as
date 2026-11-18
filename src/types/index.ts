export type Continent = 'america' | 'europa' | 'oceania'
export type Difficulty = 'Fácil' | 'Media' | 'Alta'
export type CourseType = 'entrada' | 'plato-fuerte' | 'postre'

export interface Ingredient {
  qty: string
  name: string
  notes?: string
}

export interface RecipeStep {
  stepNumber: number
  title: string
  instruction: string
  durationMin?: number
  mediaType: 'foto' | 'video-guia' | 'tip-chef'
  mediaLabel: string
  mediaCaption: string
  mediaImg: string
  tip?: string
}

export interface MapPin {
  country: string
  flag: string
  x: number // porcentaje horizontal en el mapa (0-100)
  y: number // porcentaje vertical en el mapa (0-100)
  tradition: string
}

export interface Recipe {
  id: string
  name: string
  origin: string
  countries: string[]
  flag: string
  continent: Continent
  secondaryContinent?: Continent
  course: CourseType
  emoji: string
  img: string
  prepTime: number
  cookTime: number
  time: number
  servings: number
  difficulty: Difficulty
  description: string
  culturalNote: string
  recipeOfTheDay: boolean
  dayBadge?: string
  ingredients: Ingredient[]
  steps: RecipeStep[]
  pins: MapPin[]
}

export interface MenuPlan {
  guests: number
  entradaId: string
  platoFuerteId: string
  acompananteId: string
  postreId: string
  notes: string
  checkedMenuIngredients: string[]
}

export interface UserProfile {
  name: string
  title: string
  avatar: string
  favoriteContinent: Continent | 'todos'
  bio: string
}

export interface Ctx {
  favs: string[]
  toggleFav: (r: Recipe) => void
  open: (id: string) => void
  checkedIngredients: Record<string, string[]>
  toggleIngredient: (recipeId: string, ingName: string) => void
  clearRecipeIngredients: (recipeId: string) => void
  completedSteps: Record<string, number[]>
  toggleStep: (recipeId: string, stepNumber: number) => void
  menuPlan: MenuPlan
  setMenuPlan: (updater: MenuPlan | ((prev: MenuPlan) => MenuPlan)) => void
  addRecipeToMenu: (r: Recipe) => void
  notify: (msg: string) => void
}

export const CONTINENT_INFO: Record<
  Continent,
  { label: string; emoji: string; countries: string; description: string; accent: string }
> = {
  america: {
    label: 'América',
    emoji: '🌎',
    countries: 'México, Venezuela, Argentina, EE. UU. y Canadá',
    description: 'Fusión de tradiciones mestizas, hojas de plátano, pavos dorados y banquetes familiares de Nochebuena.',
    accent: '#b3122e'
  },
  europa: {
    label: 'Europa',
    emoji: '🌍',
    countries: 'España, Italia, Francia, Reino Unido y Alemania',
    description: 'Recetas centenarias de invierno: asados festivos, bacalao tradicional y alta repostería navideña.',
    accent: '#0f3d2e'
  },
  oceania: {
    label: 'Oceanía',
    emoji: '🌏',
    countries: 'Australia y Nueva Zelanda',
    description: 'Navidad bajo el sol del verano austral con merengues crujientes y frutos rojos frescos.',
    accent: '#c9a227'
  }
}

export const COURSE_LABEL: Record<CourseType, string> = {
  entrada: 'Entrada / Plato Frío',
  'plato-fuerte': 'Plato Fuerte Tradicional',
  postre: 'Postre Navideño'
}
