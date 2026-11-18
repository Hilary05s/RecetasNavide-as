import { useMemo, useState } from 'react'
import { CalendarPlus, Clock, Compass, Flame, Heart, MapPin as MapPinIcon, Users } from 'lucide-react'
import RecipeImage from '../components/RecipeImage'
import { RECIPES } from '../data/recipes'
import { CONTINENT_INFO, type Continent, type Ctx, type MapPin, type Recipe } from '../types'

interface FlattenedPin extends MapPin {
  recipe: Recipe
}

export default function CategoriesPage({ ctx }: { ctx: Ctx }) {
  const [continentFilter, setContinentFilter] = useState<Continent | 'todos'>('todos')

  const allPins = useMemo<FlattenedPin[]>(() => {
    const pins: FlattenedPin[] = []
    RECIPES.forEach(recipe => {
      if (
        continentFilter === 'todos' ||
        recipe.continent === continentFilter ||
        recipe.secondaryContinent === continentFilter
      ) {
        recipe.pins.forEach(pin => {
          pins.push({ ...pin, recipe })
        })
      }
    })
    return pins
  }, [continentFilter])

  const [selectedPin, setSelectedPin] = useState<FlattenedPin>(() => ({
    ...RECIPES[0].pins[0],
    recipe: RECIPES[0]
  }))

  const activePin =
    allPins.find(
      p => p.country === selectedPin.country && p.recipe.id === selectedPin.recipe.id
    ) ??
    allPins[0] ?? { ...RECIPES[0].pins[0], recipe: RECIPES[0] }

  const activeRecipe = activePin.recipe
  const isFav = ctx.favs.includes(activeRecipe.id)

  return (
    <section className="section">
      <div className="section-head">
        <div>
          <span className="section-kicker">
            <Compass size={16} /> Atlas Gastronómico de Nochebuena
          </span>
          <h2>Mapa Interactivo de Platillos por País</h2>
          <p className="lead">
            Haz clic en cualquier marcador del mapa o selecciona un país para explorar su platillo
            tradicional navideño.
          </p>
        </div>
        <div className="chips">
          <button
            className={`chip ${continentFilter === 'todos' ? 'on' : ''}`}
            onClick={() => setContinentFilter('todos')}
          >
            🌍 Todo el Mundo ({RECIPES.length})
          </button>
          {(Object.keys(CONTINENT_INFO) as Continent[]).map(c => (
            <button
              key={c}
              className={`chip ${continentFilter === c ? 'on' : ''}`}
              onClick={() => setContinentFilter(c)}
            >
              {CONTINENT_INFO[c].emoji} {CONTINENT_INFO[c].label}
            </button>
          ))}
        </div>
      </div>

      <div className="world-map-layout">
        {/* LIENZO DEL MAPA INTERACTIVO */}
        <div className="map-stage">
          <svg
            viewBox="0 0 1000 540"
            className="world-svg"
            role="img"
            aria-label="Mapa mundial interactivo de recetas navideñas"
          >
            <defs>
              <radialGradient id="oceanGrad" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#144c39" />
                <stop offset="100%" stopColor="#09261c" />
              </radialGradient>
            </defs>
            <rect width="1000" height="540" fill="url(#oceanGrad)" rx="18" />

            {/* Líneas de paralelos y meridianos decorativas */}
            {[110, 220, 330, 440].map(y => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="1000"
                y2={y}
                stroke="rgba(255,255,255,0.07)"
                strokeDasharray="6 6"
              />
            ))}
            {[200, 400, 600, 800].map(x => (
              <line
                key={x}
                x1={x}
                y1="0"
                x2={x}
                y2="540"
                stroke="rgba(255,255,255,0.07)"
                strokeDasharray="6 6"
              />
            ))}

            {/* Siluetas estilizadas de los continentes */}
            {/* Norteamérica y Centroamérica */}
            <path
              d="M70,80 Q150,55 260,85 L300,150 Q280,220 230,245 L195,280 L165,260 Q120,210 95,155 Z"
              fill="#1f6b50"
              stroke="#c9a227"
              strokeWidth="1.5"
              opacity="0.82"
            />
            {/* Sudamérica */}
            <path
              d="M250,285 Q315,280 365,335 Q390,395 340,485 L295,500 Q265,435 255,355 Z"
              fill="#1f6b50"
              stroke="#c9a227"
              strokeWidth="1.5"
              opacity="0.82"
            />
            {/* Europa */}
            <path
              d="M440,85 Q520,65 595,95 L605,185 Q540,210 460,200 L435,155 Z"
              fill="#257a5c"
              stroke="#c9a227"
              strokeWidth="1.5"
              opacity="0.88"
            />
            {/* África */}
            <path
              d="M450,220 Q555,215 605,275 Q615,375 545,455 L485,435 Q445,345 450,220 Z"
              fill="#18543f"
              stroke="rgba(201,162,39,0.4)"
              strokeWidth="1"
              opacity="0.55"
            />
            {/* Asia */}
            <path
              d="M605,85 Q775,65 905,135 L885,295 Q765,320 635,255 Z"
              fill="#18543f"
              stroke="rgba(201,162,39,0.4)"
              strokeWidth="1"
              opacity="0.55"
            />
            {/* Oceanía (Australia y Nueva Zelanda) */}
            <path
              d="M770,360 Q855,345 900,395 Q905,455 835,470 Q765,455 770,360 Z"
              fill="#1f6b50"
              stroke="#c9a227"
              strokeWidth="1.5"
              opacity="0.85"
            />
            <path
              d="M920,435 L955,465 L935,485 L908,455 Z"
              fill="#1f6b50"
              stroke="#c9a227"
              strokeWidth="1.5"
              opacity="0.85"
            />

            {/* Etiquetas de continentes en el mapa */}
            <text x="165" y="135" fill="rgba(255,255,255,0.35)" fontSize="14" fontWeight="700">
              AMÉRICA DEL NORTE
            </text>
            <text x="275" y="385" fill="rgba(255,255,255,0.35)" fontSize="14" fontWeight="700">
              SUDAMÉRICA
            </text>
            <text x="485" y="115" fill="rgba(255,255,255,0.35)" fontSize="14" fontWeight="700">
              EUROPA
            </text>
            <text x="790" y="345" fill="rgba(255,255,255,0.35)" fontSize="14" fontWeight="700">
              OCEANÍA
            </text>
          </svg>

          {/* MARCADORES INTERACTIVOS SOBRE EL MAPA */}
          {allPins.map(pin => {
            const isSelected =
              pin.country === activePin.country && pin.recipe.id === activePin.recipe.id
            return (
              <button
                key={`${pin.recipe.id}-${pin.country}`}
                className={`map-pin ${isSelected ? 'selected' : ''}`}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                onClick={() => setSelectedPin(pin)}
                title={`${pin.country}: ${pin.recipe.name}`}
                aria-label={`Explorar ${pin.recipe.name} en ${pin.country}`}
              >
                <span className="pin-flag">{pin.flag}</span>
                <span className="pin-label">{pin.country}</span>
              </button>
            )
          })}

          {/* BARRA INFERIOR DE PAÍSES */}
          <div className="map-country-bar">
            {allPins.map(pin => {
              const isSelected =
                pin.country === activePin.country && pin.recipe.id === activePin.recipe.id
              return (
                <button
                  key={`pill-${pin.recipe.id}-${pin.country}`}
                  className={`country-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedPin(pin)}
                >
                  <span>{pin.flag}</span>
                  <span>{pin.country}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* TARJETA DETALLADA DEL PAÍS / PLATILLO SELECCIONADO */}
        <aside className="map-spotlight">
          <div className="spotlight-img-wrap">
            <RecipeImage recipe={activeRecipe} className="spotlight-img" />
            <span className="origin-pill">
              {activePin.flag} {activePin.country}
            </span>
          </div>
          <div className="spotlight-body">
            <span className="tag">
              <MapPinIcon size={13} /> Origen: {activeRecipe.origin}
            </span>
            <h3>{activeRecipe.name}</h3>
            <p className="spotlight-tradition">
              <strong>Tradición en {activePin.country}:</strong> {activePin.tradition}
            </p>
            <p>{activeRecipe.description}</p>

            <div className="meta">
              <span>
                <Clock size={15} /> {activeRecipe.time} min
              </span>
              <span>
                <Users size={15} /> {activeRecipe.servings} porciones
              </span>
              <span>
                <Flame size={15} /> {activeRecipe.difficulty}
              </span>
            </div>

            <div className="spotlight-actions">
              <button className="btn gold" onClick={() => ctx.open(activeRecipe.id)}>
                Ver receta completa
              </button>
              <button
                className="btn outline"
                onClick={() => ctx.addRecipeToMenu(activeRecipe)}
              >
                <CalendarPlus size={17} /> Añadir a Mi Menú
              </button>
              <button
                className={`btn ${isFav ? 'red' : 'outline'}`}
                onClick={() => ctx.toggleFav(activeRecipe)}
              >
                <Heart size={17} fill={isFav ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
