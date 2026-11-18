import { useEffect, useMemo, useState } from 'react'
import {
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Flame,
  Globe,
  Heart,
  Search,
  Sparkles,
  Users,
  X
} from 'lucide-react'
import RecipeCard from '../components/RecipeCard'
import RecipeImage from '../components/RecipeImage'
import CategoryGrid from '../components/CategoryGrid'
import { RECIPES } from '../data/recipes'
import { CONTINENT_INFO, type Continent, type Ctx } from '../types'

interface Props {
  ctx: Ctx
  goExplore: (c?: Continent, query?: string) => void
  goMap: () => void
  goMenu: () => void
}

export default function HomePage({ ctx, goExplore, goMap, goMenu }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedContinent, setSelectedContinent] = useState<Continent | 'todos'>('todos')
  const [carouselIdx, setCarouselIdx] = useState(0)

  const featuredRecipes = useMemo(() => RECIPES.filter(r => r.recipeOfTheDay), [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setCarouselIdx(i => (i + 1) % featuredRecipes.length)
    }, 6500)
    return () => window.clearInterval(id)
  }, [featuredRecipes.length])

  const currentSlide = featuredRecipes[carouselIdx] ?? RECIPES[0]
  const isFavSlide = ctx.favs.includes(currentSlide.id)

  const filteredRecipes = useMemo(() => {
    const norm = (s: string) =>
      s
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
    const q = norm(searchQuery.trim())

    return RECIPES.filter(r => {
      const matchContinent =
        selectedContinent === 'todos' ||
        r.continent === selectedContinent ||
        r.secondaryContinent === selectedContinent
      if (!matchContinent) return false
      if (!q) return true
      const haystack = norm(
        `${r.name} ${r.origin} ${r.description} ${r.ingredients.map(i => i.name).join(' ')}`
      )
      return haystack.includes(q)
    })
  }, [searchQuery, selectedContinent])

  const prevSlide = () =>
    setCarouselIdx(i => (i - 1 + featuredRecipes.length) % featuredRecipes.length)
  const nextSlide = () => setCarouselIdx(i => (i + 1) % featuredRecipes.length)

  return (
    <>
      {/* HERO CON BUSCADOR CENTRAL */}
      <section className="hero">
        <div className="snow" aria-hidden>
          ❄ ✦ ❅ 🌍 ❄ ✦ ❅
        </div>
        <div className="hero-content-center">
          <p className="eyebrow">
            <Globe size={16} /> Navidad Global: Recetario Mundial
          </p>
          <h1>Tradiciones gastronómicas navideñas de todo el mundo</h1>
          <p className="hero-sub">
            Explora 8 platillos emblemáticos de América, Europa y Oceanía con ingredientes
            interactivos, pasos multimedia, estructura JSON y planificador de cena.
          </p>

          {/* Buscador Central */}
          <div className="central-search-box" role="search">
            <Search size={22} className="search-icon" />
            <input
              type="search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Busca por platillo, país o ingrediente (ej. Bacalao, Venezuela, Pavlova, Pavo)…"
              aria-label="Buscador central de recetas navideñas"
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Limpiar búsqueda"
              >
                <X size={18} />
              </button>
            )}
            <button className="btn gold" onClick={() => goExplore( undefined, searchQuery )}>
              Buscar
            </button>
          </div>

          {/* Etiquetas rápidas de países */}
          <div className="quick-pills">
            <span>Explorar rápido:</span>
            {['México', 'Venezuela', 'Argentina', 'Francia', 'Alemania', 'Australia'].map(pais => (
              <button
                key={pais}
                className={`mini-pill ${searchQuery.toLowerCase() === pais.toLowerCase() ? 'active' : ''}`}
                onClick={() =>
                  setSearchQuery(prev => (prev.toLowerCase() === pais.toLowerCase() ? '' : pais))
                }
              >
                {pais}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CARRUSEL DE "RECETAS DEL DÍA" */}
      <section className="section">
        <div className="section-head">
          <div>
            <span className="section-kicker">
              <Sparkles size={16} /> Selección destacada
            </span>
            <h2>Carrusel de Recetas del Día</h2>
          </div>
          <div className="carousel-controls">
            <button className="circle-btn" onClick={prevSlide} aria-label="Receta anterior">
              <ChevronLeft size={20} />
            </button>
            <span className="carousel-counter">
              {carouselIdx + 1} / {featuredRecipes.length}
            </span>
            <button className="circle-btn" onClick={nextSlide} aria-label="Siguiente receta">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="carousel-banner">
          <div className="carousel-media">
            <RecipeImage recipe={currentSlide} className="carousel-img" />
            <span className="carousel-badge">
              {currentSlide.dayBadge ?? '⭐ Receta del Día'}
            </span>
          </div>
          <div className="carousel-info">
            <div className="carousel-meta-top">
              <span className="origin-badge-inline">
                {currentSlide.flag} {currentSlide.origin}
              </span>
              <span className="tag">
                {CONTINENT_INFO[currentSlide.continent].emoji}{' '}
                {CONTINENT_INFO[currentSlide.continent].label}
              </span>
            </div>
            <h3>{currentSlide.name}</h3>
            <p className="carousel-desc">{currentSlide.description}</p>
            <blockquote className="cultural-quote">{currentSlide.culturalNote}</blockquote>

            <div className="meta big">
              <span>
                <Clock size={18} /> {currentSlide.time} min totales
              </span>
              <span>
                <Users size={18} /> {currentSlide.servings} porciones
              </span>
              <span>
                <Flame size={18} /> Dificultad {currentSlide.difficulty}
              </span>
            </div>

            <div className="carousel-actions">
              <button className="btn gold" onClick={() => ctx.open(currentSlide.id)}>
                Abrir receta paso a paso
              </button>
              <button className="btn outline" onClick={() => ctx.addRecipeToMenu(currentSlide)}>
                <CalendarCheck size={18} /> Añadir a Mi Menú
              </button>
              <button
                className={`btn ${isFavSlide ? 'red' : 'outline'}`}
                onClick={() => ctx.toggleFav(currentSlide)}
              >
                <Heart size={18} fill={isFavSlide ? 'currentColor' : 'none'} />
                {isFavSlide ? 'En Favoritos' : 'Favorito'}
              </button>
            </div>

            <div className="carousel-dots" role="tablist" aria-label="Selector de receta del día">
              {featuredRecipes.map((r, idx) => (
                <button
                  key={r.id}
                  role="tab"
                  aria-selected={idx === carouselIdx}
                  className={`dot ${idx === carouselIdx ? 'active' : ''}`}
                  onClick={() => setCarouselIdx(idx)}
                >
                  {r.flag.split(' ')[0]} {r.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NAVEGACIÓN RÁPIDA POR CONTINENTES */}
      <section className="section">
        <div className="section-head">
          <div>
            <span className="section-kicker">
              <Compass size={16} /> Regiones gastronómicas
            </span>
            <h2>Navegación Rápida por Continentes</h2>
          </div>
          {selectedContinent !== 'todos' && (
            <button className="btn outline" onClick={() => setSelectedContinent('todos')}>
              Ver todos los continentes
            </button>
          )}
        </div>
        <CategoryGrid
          selected={selectedContinent}
          onPick={c => setSelectedContinent(prev => (prev === c ? 'todos' : c))}
        />
      </section>

      {/* CATÁLOGO DE LOS 8 PLATILLOS TRADICIONALES */}
      <section className="section">
        <div className="section-head">
          <div>
            <h2>
              Recetario Internacional{' '}
              {selectedContinent !== 'todos'
                ? `· ${CONTINENT_INFO[selectedContinent].label}`
                : '· 8 Platillos del Mundo'}
            </h2>
            <p className="lead">
              Mostrando {filteredRecipes.length} de {RECIPES.length} platillos tradicionales
              documentados.
            </p>
          </div>
          <div className="chips">
            <button
              className={`chip ${selectedContinent === 'todos' ? 'on' : ''}`}
              onClick={() => setSelectedContinent('todos')}
            >
              Todos ({RECIPES.length})
            </button>
            {(Object.keys(CONTINENT_INFO) as Continent[]).map(c => (
              <button
                key={c}
                className={`chip ${selectedContinent === c ? 'on' : ''}`}
                onClick={() => setSelectedContinent(c)}
              >
                {CONTINENT_INFO[c].emoji} {CONTINENT_INFO[c].label}
              </button>
            ))}
          </div>
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="empty">
            <span>🌍</span>
            <h3>No encontramos platillos con ese criterio</h3>
            <p>Intenta con otro país, continente o ingrediente en el buscador central.</p>
            <button
              className="btn"
              onClick={() => {
                setSearchQuery('')
                setSelectedContinent('todos')
              }}
            >
              Mostrar las 8 recetas mundiales
            </button>
          </div>
        ) : (
          <div className="grid">
            {filteredRecipes.map(r => (
              <RecipeCard key={r.id} recipe={r} ctx={ctx} />
            ))}
          </div>
        )}
      </section>

      {/* ACCESOS A HERRAMIENTAS ADICIONALES */}
      <section className="section">
        <h2>Herramientas Interactivas</h2>
        <div className="tools-promo-grid">
          <div className="tool-promo-card">
            <span className="tool-icon">🗺️</span>
            <div>
              <h3>Mapa Interactivo Mundial</h3>
              <p>
                Explora visualmente los 8 platillos tradicionales ubicando cada país en el mapa y
                conociendo su historia de Nochebuena.
              </p>
              <button className="btn" onClick={goMap}>
                Abrir Mapa Mundial
              </button>
            </div>
          </div>
          <div className="tool-promo-card">
            <span className="tool-icon">📋</span>
            <div>
              <h3>Planificador &ldquo;Mi Menú Navideño&rdquo;</h3>
              <p>
                Arma tu cena combinando entrada, plato fuerte y postre internacional, ajusta el
                número de invitados y genera tu lista de ingredientes.
              </p>
              <button className="btn gold" onClick={goMenu}>
                Planificar Mi Menú
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
