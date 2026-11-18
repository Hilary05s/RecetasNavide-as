import { useMemo } from 'react'
import {
  CalendarCheck,
  Clock,
  Globe,
  Minus,
  Plus,
  RotateCcw,
  Shuffle,
  Sparkles,
  Users,
  Utensils
} from 'lucide-react'
import RecipeImage from '../components/RecipeImage'
import { RECIPES } from '../data/recipes'
import type { Ctx, Recipe } from '../types'

function scaleQty(qty: string, factor: number): string {
  if (Math.abs(factor - 1) < 0.01) return qty
  return qty.replace(/(\d+(?:\.\d+)?)/g, m => {
    const n = parseFloat(m) * factor
    return Number.isInteger(n) ? String(n) : n.toFixed(1).replace(/\.0$/, '')
  })
}

export default function ShoppingPage({ ctx }: { ctx: Ctx }) {
  const { menuPlan, setMenuPlan, open, notify } = ctx

  const slots: {
    key: 'entradaId' | 'platoFuerteId' | 'acompananteId' | 'postreId'
    label: string
    subtitle: string
    recommendedIds: string[]
  }[] = [
    {
      key: 'entradaId',
      label: '1. Entrada / Plato Frío',
      subtitle: 'Para abrir el apetito antes del banquete',
      recommendedIds: ['vitel-tone', 'bacalao-vizcaina', 'hallacas-navidenas']
    },
    {
      key: 'platoFuerteId',
      label: '2. Plato Fuerte Principal',
      subtitle: 'El centro de la mesa de Nochebuena',
      recommendedIds: ['pavo-relleno', 'weihnachtsgans', 'bacalao-vizcaina', 'hallacas-navidenas']
    },
    {
      key: 'acompananteId',
      label: '3. Especialidad Tradicional / Recalentado',
      subtitle: 'Segundo plato para compartir en familia',
      recommendedIds: ['hallacas-navidenas', 'bacalao-vizcaina', 'vitel-tone', 'pavo-relleno']
    },
    {
      key: 'postreId',
      label: '4. Gran Postre Navideño',
      subtitle: 'El cierre dulce para el brindis de medianoche',
      recommendedIds: ['buche-de-noel', 'pavlova-frutos-rojos', 'christmas-pudding']
    }
  ]

  const selectedRecipes = useMemo(() => {
    const ids = [
      menuPlan.entradaId,
      menuPlan.platoFuerteId,
      menuPlan.acompananteId,
      menuPlan.postreId
    ].filter(Boolean)
    const uniqueIds = Array.from(new Set(ids))
    return uniqueIds
      .map(id => RECIPES.find(r => r.id === id))
      .filter((r): r is Recipe => Boolean(r))
  }, [menuPlan])

  const totalTime = selectedRecipes.reduce((acc, r) => acc + r.time, 0)
  const countriesList = Array.from(new Set(selectedRecipes.flatMap(r => r.countries)))

  const consolidatedIngredients = useMemo(() => {
    return selectedRecipes.flatMap(r => {
      const factor = menuPlan.guests / r.servings
      return r.ingredients.map(ing => ({
        key: `${r.id}::${ing.name}`,
        recipeName: r.name,
        flag: r.flag,
        name: ing.name,
        scaledQty: scaleQty(ing.qty, factor)
      }))
    })
  }, [selectedRecipes, menuPlan.guests])

  const toggleMenuIng = (key: string) => {
    setMenuPlan(prev => {
      const exists = prev.checkedMenuIngredients.includes(key)
      return {
        ...prev,
        checkedMenuIngredients: exists
          ? prev.checkedMenuIngredients.filter(x => x !== key)
          : [...prev.checkedMenuIngredients, key]
      }
    })
  }

  const randomizeMenu = () => {
    const fuertes = ['pavo-relleno', 'weihnachtsgans', 'bacalao-vizcaina']
    const especiales = ['hallacas-navidenas', 'bacalao-vizcaina']
    const postres = ['buche-de-noel', 'pavlova-frutos-rojos', 'christmas-pudding']
    const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

    setMenuPlan(prev => ({
      ...prev,
      entradaId: 'vitel-tone',
      platoFuerteId: pick(fuertes),
      acompananteId: pick(especiales),
      postreId: pick(postres),
      checkedMenuIngredients: []
    }))
    notify('✨ ¡Menú Navideño Internacional generado!')
  }

  return (
    <section className="section">
      <div className="section-head">
        <div>
          <span className="section-kicker">
            <CalendarCheck size={16} /> Organizador de Cena
          </span>
          <h2>Planificador &ldquo;Mi Menú Navideño&rdquo;</h2>
          <p className="lead">
            Diseña tu menú internacional por tiempos, ajusta el número de invitados y obtén la lista
            consolidada de ingredientes.
          </p>
        </div>
        <div className="chips">
          <button className="btn gold" onClick={randomizeMenu}>
            <Shuffle size={16} /> Sugerir combinación mundial
          </button>
        </div>
      </div>

      {/* BARRA DE RESUMEN DEL MENÚ Y COMENSALES */}
      <div className="menu-summary-bar">
        <div className="summary-stat">
          <Users size={22} />
          <div>
            <small>Invitados a la cena</small>
            <div className="servings-stepper">
              <button
                onClick={() =>
                  setMenuPlan(p => ({ ...p, guests: Math.max(2, p.guests - 2) }))
                }
                aria-label="Menos invitados"
              >
                <Minus size={14} />
              </button>
              <strong>{menuPlan.guests} personas</strong>
              <button
                onClick={() =>
                  setMenuPlan(p => ({ ...p, guests: Math.min(40, p.guests + 2) }))
                }
                aria-label="Más invitados"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="summary-stat">
          <Utensils size={22} />
          <div>
            <small>Platillos en tu menú</small>
            <strong>{selectedRecipes.length} tiempos seleccionados</strong>
          </div>
        </div>

        <div className="summary-stat">
          <Clock size={22} />
          <div>
            <small>Tiempo estimado acumulado</small>
            <strong>
              {Math.floor(totalTime / 60)} h {totalTime % 60} min
            </strong>
          </div>
        </div>

        <div className="summary-stat">
          <Globe size={22} />
          <div>
            <small>Países en tu mesa</small>
            <strong>{countriesList.join(', ') || 'Selecciona tus platillos'}</strong>
          </div>
        </div>
      </div>

      {/* SELECTOR DE LOS 4 TIEMPOS DEL MENÚ */}
      <div className="menu-slots-grid">
        {slots.map(slot => {
          const currentId = menuPlan[slot.key]
          const currentRecipe = RECIPES.find(r => r.id === currentId)
          return (
            <div key={slot.key} className="menu-slot-card">
              <div className="slot-header">
                <strong>{slot.label}</strong>
                <small>{slot.subtitle}</small>
              </div>
              <select
                value={currentId}
                onChange={e =>
                  setMenuPlan(prev => ({ ...prev, [slot.key]: e.target.value }))
                }
                aria-label={slot.label}
              >
                <option value="">-- Sin asignar --</option>
                {RECIPES.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.flag} {r.name} ({r.origin})
                  </option>
                ))}
              </select>

              {currentRecipe ? (
                <div className="slot-preview">
                  <RecipeImage recipe={currentRecipe} className="slot-img" />
                  <div className="slot-preview-info">
                    <span className="origin-badge-inline">
                      {currentRecipe.flag} {currentRecipe.origin}
                    </span>
                    <h4>{currentRecipe.name}</h4>
                    <p>
                      ⏱️ {currentRecipe.time} min · Dificultad {currentRecipe.difficulty}
                    </p>
                    <button className="text-btn" onClick={() => open(currentRecipe.id)}>
                      Abrir receta e instrucciones →
                    </button>
                  </div>
                </div>
              ) : (
                <div className="slot-empty">
                  <Sparkles size={20} />
                  <span>Elige un platillo para este tiempo</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* NOTAS DEL ANFITRIÓN Y LISTA CONSOLIDADA DE INGREDIENTES DEL MENÚ */}
      <div className="two-col">
        <div className="panel">
          <h2>Notas de Mi Cena Navideña</h2>
          <p className="panel-sub">
            Escribe recordatorios de bebidas, horarios de horneado o asignación de platos entre tus
            invitados.
          </p>
          <textarea
            className="menu-notes"
            rows={7}
            value={menuPlan.notes}
            onChange={e => setMenuPlan(p => ({ ...p, notes: e.target.value }))}
            placeholder="Ej. Desalar el bacalao desde el 22 de diciembre. Hornear el pavo a las 17:00 h y montar la Pavlova justo antes del brindis…"
          />
        </div>

        <div className="panel">
          <div className="panel-head">
            <h2>Ingredientes del Menú ({menuPlan.guests} invitados)</h2>
            {menuPlan.checkedMenuIngredients.length > 0 && (
              <button
                className="text-btn"
                onClick={() =>
                  setMenuPlan(p => ({ ...p, checkedMenuIngredients: [] }))
                }
              >
                <RotateCcw size={14} /> Desmarcar todo
              </button>
            )}
          </div>
          <p className="panel-sub">
            Cantidades escaladas automáticamente para {menuPlan.guests} porciones.
          </p>

          {consolidatedIngredients.length === 0 ? (
            <div className="empty">
              <span>🍽️</span>
              <h3>Selecciona al menos un platillo</h3>
              <p>Tus ingredientes aparecerán aquí calculados según tus invitados.</p>
            </div>
          ) : (
            <ul className="ing-checklist compact">
              {consolidatedIngredients.map(item => {
                const done = menuPlan.checkedMenuIngredients.includes(item.key)
                return (
                  <li key={item.key} className={done ? 'checked' : ''}>
                    <label>
                      <input
                        type="checkbox"
                        checked={done}
                        onChange={() => toggleMenuIng(item.key)}
                      />
                      <span className="ing-text">
                        <b>{item.scaledQty}</b> {item.name}
                        <small className="ing-note">
                          {' '}
                          · {item.flag} {item.recipeName}
                        </small>
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
