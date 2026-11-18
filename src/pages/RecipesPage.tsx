import { useMemo, useState } from 'react'
import { Code2, Copy, Search } from 'lucide-react'
import RecipeCard from '../components/RecipeCard'
import { RECIPES, toRecipeJSON } from '../data/recipes'
import { CONTINENT_INFO, type Continent, type CourseType, type Ctx } from '../types'

const CONTINENT_TABS: { id: Continent | 'todos'; label: string }[] = [
  { id: 'todos', label: '🌍 Todos (8)' },
  { id: 'america', label: '🌎 América' },
  { id: 'europa', label: '🌍 Europa' },
  { id: 'oceania', label: '🌏 Oceanía' }
]

export default function RecipesPage({
  ctx,
  initialContinent = 'todos',
  initialQuery = ''
}: {
  ctx: Ctx
  initialContinent?: Continent | 'todos'
  initialQuery?: string
}) {
  const [q, setQ] = useState(initialQuery)
  const [continent, setContinent] = useState<Continent | 'todos'>(initialContinent)
  const [course, setCourse] = useState<CourseType | 'todos'>('todos')
  const [diff, setDiff] = useState('todas')
  const [showAllJson, setShowAllJson] = useState(false)

  const list = useMemo(() => {
    const norm = (s: string) =>
      s
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
    const query = norm(q.trim())

    return RECIPES.filter(r => {
      const matchQuery =
        !query ||
        norm(`${r.name} ${r.origin} ${r.description} ${r.ingredients.map(i => i.name).join(' ')}`).includes(
          query
        )
      const matchContinent =
        continent === 'todos' || r.continent === continent || r.secondaryContinent === continent
      const matchCourse = course === 'todos' || r.course === course
      const matchDiff = diff === 'todas' || r.difficulty === diff
      return matchQuery && matchContinent && matchCourse && matchDiff
    })
  }, [q, continent, course, diff])

  const reset = () => {
    setQ('')
    setContinent('todos')
    setCourse('todos')
    setDiff('todas')
  }

  const copyDatabaseJson = () => {
    const json = JSON.stringify(list.map(toRecipeJSON), null, 2)
    navigator.clipboard?.writeText(json)
    ctx.notify('📋 Base de datos JSON copiada al portapapeles')
  }

  return (
    <section className="section">
      <div className="section-head">
        <div>
          <h2>Catálogo de Recetas Internacionales</h2>
          <p className="lead">
            Los 8 platillos tradicionales navideños documentados con ingredientes, tiempos y estructura JSON.
          </p>
        </div>
        <button className="btn outline" onClick={() => setShowAllJson(v => !v)}>
          <Code2 size={17} /> {showAllJson ? 'Ocultar JSON Global' : 'Exportar JSON ({8} recetas)'}
        </button>
      </div>

      {showAllJson && (
        <div className="json-viewer">
          <div className="json-header">
            <div>
              <strong>📦 Colección JSON ({list.length} platillos filtrados)</strong>
              <p>Estructura estandarizada del recetario mundial lista para usar en tu sitio.</p>
            </div>
            <button className="btn gold" onClick={copyDatabaseJson}>
              <Copy size={16} /> Copiar JSON
            </button>
          </div>
          <pre>{JSON.stringify(list.map(toRecipeJSON), null, 2)}</pre>
        </div>
      )}

      <div className="filters">
        <label className="search">
          <Search size={18} />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Buscar por nombre, país o ingrediente…"
          />
        </label>
        <div className="chips">
          {CONTINENT_TABS.map(t => (
            <button
              key={t.id}
              className={`chip ${continent === t.id ? 'on' : ''}`}
              onClick={() => setContinent(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <select
          value={course}
          onChange={e => setCourse(e.target.value as CourseType | 'todos')}
          aria-label="Tipo de plato"
        >
          <option value="todos">Todos los tiempos</option>
          <option value="entrada">Entrada / Plato Frío</option>
          <option value="plato-fuerte">Plato Fuerte</option>
          <option value="postre">Postre Navideño</option>
        </select>
        <select value={diff} onChange={e => setDiff(e.target.value)} aria-label="Dificultad">
          <option value="todas">Cualquier dificultad</option>
          <option value="Fácil">Fácil</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
      </div>

      {continent !== 'todos' && (
        <div className="continent-banner">
          <span>{CONTINENT_INFO[continent].emoji}</span>
          <div>
            <strong>Región {CONTINENT_INFO[continent].label}</strong>
            <p>{CONTINENT_INFO[continent].description}</p>
          </div>
        </div>
      )}

      {list.length === 0 ? (
        <div className="empty">
          <span>🔍</span>
          <h3>No encontramos recetas con esos filtros</h3>
          <p>Prueba con otro país, continente o limpia los filtros activos.</p>
          <button className="btn" onClick={reset}>
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid">
          {list.map(r => (
            <RecipeCard key={r.id} recipe={r} ctx={ctx} />
          ))}
        </div>
      )}
    </section>
  )
}
