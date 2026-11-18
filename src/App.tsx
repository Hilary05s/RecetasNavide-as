import { useCallback, useEffect, useRef, useState } from 'react'
import { BookOpen, CalendarCheck, Globe, Home, Map, User } from 'lucide-react'
import HomePage from './pages/HomePage'
import RecipesPage from './pages/RecipesPage'
import CategoriesPage from './pages/CategoriesPage'
import FavoritesPage from './pages/FavoritesPage'
import ShoppingPage from './pages/ShoppingPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import { RECIPES } from './data/recipes'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { Continent, Ctx, MenuPlan, Recipe } from './types'

type Name = 'home' | 'recipes' | 'map' | 'menu' | 'profile' | 'detail'
interface View {
  name: Name
  id?: string
  continent: Continent | 'todos'
  query?: string
  from: Name
}

const NAV: { name: Name; label: string; icon: typeof Home }[] = [
  { name: 'home', label: 'Inicio', icon: Home },
  { name: 'recipes', label: 'Recetario (8)', icon: BookOpen },
  { name: 'map', label: 'Mapa Mundial', icon: Map },
  { name: 'menu', label: 'Mi Menú Navideño', icon: CalendarCheck },
  { name: 'profile', label: 'Perfil y Favoritos', icon: User }
]

const DEFAULT_MENU: MenuPlan = {
  guests: 8,
  entradaId: 'vitel-tone',
  platoFuerteId: 'pavo-relleno',
  acompananteId: 'bacalao-vizcaina',
  postreId: 'buche-de-noel',
  notes:
    'Desalar el bacalao 36 horas antes. Preparar el Vitel Toné la víspera para intensificar su sabor.',
  checkedMenuIngredients: []
}

export default function App() {
  const [view, setView] = useState<View>({
    name: 'home',
    continent: 'todos',
    from: 'home'
  })
  const [favs, setFavs] = useLocalStorage<string[]>('ng-favoritos', [
    'bacalao-vizcaina',
    'buche-de-noel'
  ])
  const [checkedIngredients, setCheckedIngredients] = useLocalStorage<
    Record<string, string[]>
  >('ng-ingredientes-marcados', {})
  const [completedSteps, setCompletedSteps] = useLocalStorage<Record<string, number[]>>(
    'ng-pasos-completados',
    {}
  )
  const [menuPlan, setMenuPlan] = useLocalStorage<MenuPlan>('ng-menu-navideno', DEFAULT_MENU)
  const [toast, setToast] = useState('')
  const timer = useRef<number>()

  const notify = useCallback((m: string) => {
    setToast(m)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setToast(''), 2600)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [view])

  const go = (name: Name, continent: Continent | 'todos' = 'todos', query = '') =>
    setView(v => ({
      name,
      continent,
      query,
      from: v.name === 'detail' ? v.from : v.name
    }))

  const goExplore = (c?: Continent, query?: string) =>
    go('recipes', c ?? 'todos', query ?? '')

  const toggleFav = (r: Recipe) => {
    const on = favs.includes(r.id)
    setFavs(on ? favs.filter(x => x !== r.id) : [...favs, r.id])
    notify(
      on
        ? `"${r.name}" quitada de tu perfil de favoritos`
        : `❤ "${r.name}" guardada en tu perfil de favoritos`
    )
  }

  const toggleIngredient = (recipeId: string, ingName: string) => {
    setCheckedIngredients(prev => {
      const current = prev[recipeId] ?? []
      const exists = current.includes(ingName)
      const next = exists ? current.filter(i => i !== ingName) : [...current, ingName]
      return { ...prev, [recipeId]: next }
    })
  }

  const clearRecipeIngredients = (recipeId: string) => {
    setCheckedIngredients(prev => ({ ...prev, [recipeId]: [] }))
    notify('Casillas de ingredientes reiniciadas')
  }

  const toggleStep = (recipeId: string, stepNumber: number) => {
    setCompletedSteps(prev => {
      const current = prev[recipeId] ?? []
      const exists = current.includes(stepNumber)
      const next = exists
        ? current.filter(s => s !== stepNumber)
        : [...current, stepNumber]
      return { ...prev, [recipeId]: next }
    })
  }

  const addRecipeToMenu = (r: Recipe) => {
    setMenuPlan(prev => {
      if (r.course === 'entrada') return { ...prev, entradaId: r.id }
      if (r.course === 'postre') return { ...prev, postreId: r.id }
      if (!prev.platoFuerteId || prev.platoFuerteId === r.id) {
        return { ...prev, platoFuerteId: r.id }
      }
      return { ...prev, acompananteId: r.id }
    })
    notify(`📋 "${r.name}" añadida al planificador "Mi Menú Navideño"`)
  }

  const ctx: Ctx = {
    favs,
    toggleFav,
    open: id =>
      setView(v => ({
        name: 'detail',
        id,
        continent: v.continent,
        from: v.name === 'detail' ? v.from : v.name
      })),
    checkedIngredients,
    toggleIngredient,
    clearRecipeIngredients,
    completedSteps,
    toggleStep,
    menuPlan,
    setMenuPlan,
    addRecipeToMenu,
    notify
  }

  const recipe = RECIPES.find(r => r.id === view.id)
  const active = view.name === 'detail' ? view.from : view.name
  const menuCount = [
    menuPlan.entradaId,
    menuPlan.platoFuerteId,
    menuPlan.acompananteId,
    menuPlan.postreId
  ].filter(Boolean).length

  return (
    <div className="app">
      <header className="top">
        <button className="brand" onClick={() => go('home')}>
          <Globe size={26} />
          <div className="brand-text">
            <span>Navidad Global</span>
            <small>Recetario Mundial</small>
          </div>
        </button>
        <nav>
          {NAV.map(n => (
            <button
              key={n.name}
              className={active === n.name ? 'on' : ''}
              onClick={() => go(n.name)}
            >
              <n.icon size={19} />
              <span>{n.label}</span>
              {n.name === 'profile' && favs.length > 0 && (
                <b className="badge">{favs.length}</b>
              )}
              {n.name === 'menu' && menuCount > 0 && <b className="badge gold">{menuCount}</b>}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {view.name === 'home' && (
          <HomePage
            ctx={ctx}
            goExplore={goExplore}
            goMap={() => go('map')}
            goMenu={() => go('menu')}
          />
        )}
        {view.name === 'recipes' && (
          <RecipesPage
            key={`${view.continent}-${view.query ?? ''}`}
            ctx={ctx}
            initialContinent={view.continent}
            initialQuery={view.query}
          />
        )}
        {view.name === 'map' && <CategoriesPage ctx={ctx} />}
        {view.name === 'menu' && <ShoppingPage ctx={ctx} />}
        {view.name === 'profile' && (
          <FavoritesPage ctx={ctx} goExplore={() => goExplore()} />
        )}
        {view.name === 'detail' && recipe && (
          <RecipeDetailPage recipe={recipe} ctx={ctx} onBack={() => go(view.from)} />
        )}
      </main>

      <footer className="foot">
        <p>
          🌍 Navidad Global: Recetario Mundial · 8 Platillos Tradicionales Internacionales
        </p>
        <small>
          México/España · Venezuela · Argentina/Italia · EE. UU./Canadá · Francia · Reino Unido ·
          Alemania · Australia/Nueva Zelanda
        </small>
      </footer>

      <div className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  )
}
