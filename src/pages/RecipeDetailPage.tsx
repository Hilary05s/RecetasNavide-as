import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  CalendarPlus,
  CheckCircle2,
  ChefHat,
  Clock,
  Code2,
  Copy,
  Film,
  Flame,
  Heart,
  Image as ImageIcon,
  Minus,
  Play,
  Plus,
  RotateCcw,
  Sparkles,
  Timer,
  Users
} from 'lucide-react'
import RecipeImage from '../components/RecipeImage'
import { toRecipeJSON } from '../data/recipes'
import { CONTINENT_INFO, COURSE_LABEL, type Ctx, type Recipe } from '../types'

interface Props {
  recipe: Recipe
  ctx: Ctx
  onBack: () => void
}

function scaleQuantity(qty: string, factor: number): string {
  if (Math.abs(factor - 1) < 0.01) return qty
  return qty.replace(/(\d+(?:\.\d+)?)/g, match => {
    const val = parseFloat(match) * factor
    return Number.isInteger(val) ? String(val) : val.toFixed(1).replace(/\.0$/, '')
  })
}

export default function RecipeDetailPage({ recipe, ctx, onBack }: Props) {
  const [customServings, setCustomServings] = useState(recipe.servings)
  const [showJson, setShowJson] = useState(false)
  const [activeTimerStep, setActiveTimerStep] = useState<number | null>(null)
  const [secondsLeft, setSecondsLeft] = useState(0)

  useEffect(() => {
    setCustomServings(recipe.servings)
    setActiveTimerStep(null)
    setSecondsLeft(0)
  }, [recipe])

  useEffect(() => {
    if (activeTimerStep === null || secondsLeft <= 0) return
    const id = window.setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) {
          ctx.notify(`⏰ ¡Tiempo completado para el paso ${activeTimerStep}!`)
          setActiveTimerStep(null)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [activeTimerStep, secondsLeft, ctx])

  const fav = ctx.favs.includes(recipe.id)
  const checkedList = ctx.checkedIngredients[recipe.id] ?? []
  const doneSteps = ctx.completedSteps[recipe.id] ?? []
  const factor = customServings / recipe.servings
  const continent = CONTINENT_INFO[recipe.continent]

  const progressPct = Math.round((checkedList.length / recipe.ingredients.length) * 100)
  const stepsPct = Math.round((doneSteps.length / recipe.steps.length) * 100)

  const startStepTimer = (stepNumber: number, minutes: number) => {
    if (activeTimerStep === stepNumber) {
      setActiveTimerStep(null)
      setSecondsLeft(0)
      return
    }
    setActiveTimerStep(stepNumber)
    setSecondsLeft(minutes * 60)
    ctx.notify(`⏱️ Temporizador iniciado: ${minutes} min (Paso ${stepNumber})`)
  }

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  const copyJson = () => {
    const text = JSON.stringify(toRecipeJSON(recipe), null, 2)
    navigator.clipboard?.writeText(text)
    ctx.notify('📋 Estructura JSON copiada al portapapeles')
  }

  return (
    <section className="section detail">
      <div className="detail-topbar">
        <button className="link" onClick={onBack}>
          <ArrowLeft size={18} /> Volver al recetario
        </button>
        <div className="detail-badges">
          <span className="origin-badge-inline">
            {recipe.flag} {recipe.origin}
          </span>
          <span className="tag">
            {continent.emoji} {continent.label}
          </span>
          <span className="tag subtle">{COURSE_LABEL[recipe.course]}</span>
        </div>
      </div>

      <div className="detail-hero-grid">
        <div className="detail-img-wrap">
          <RecipeImage recipe={recipe} className="detail-img" />
        </div>
        <div className="detail-header-info">
          <h1>{recipe.name}</h1>
          <p className="lead">{recipe.description}</p>
          <blockquote className="cultural-quote">{recipe.culturalNote}</blockquote>

          {/* INDICADORES VISUALES DE TIEMPO, PORCIONES Y DIFICULTAD */}
          <div className="visual-indicators">
            <div className="indicator-box">
              <Clock size={22} />
              <div>
                <small>Preparación</small>
                <strong>{recipe.prepTime} min</strong>
              </div>
            </div>
            <div className="indicator-box">
              <Timer size={22} />
              <div>
                <small>Cocción</small>
                <strong>{recipe.cookTime} min</strong>
              </div>
            </div>
            <div className="indicator-box highlight">
              <Sparkles size={22} />
              <div>
                <small>Tiempo Total</small>
                <strong>{recipe.time} min</strong>
              </div>
            </div>
            <div className="indicator-box">
              <Flame size={22} />
              <div>
                <small>Dificultad</small>
                <strong>{recipe.difficulty}</strong>
              </div>
            </div>
            <div className="indicator-box servings-box">
              <Users size={22} />
              <div>
                <small>Porciones</small>
                <div className="servings-stepper">
                  <button
                    onClick={() => setCustomServings(s => Math.max(2, s - 2))}
                    aria-label="Disminuir porciones"
                  >
                    <Minus size={14} />
                  </button>
                  <strong>{customServings}</strong>
                  <button
                    onClick={() => setCustomServings(s => Math.min(36, s + 2))}
                    aria-label="Aumentar porciones"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="actions">
            <button
              className={`btn ${fav ? 'red' : 'outline'}`}
              onClick={() => ctx.toggleFav(recipe)}
            >
              <Heart size={17} fill={fav ? 'currentColor' : 'none'} />
              {fav ? 'Guardada en Favoritos' : 'Guardar en Favoritos'}
            </button>
            <button className="btn gold" onClick={() => ctx.addRecipeToMenu(recipe)}>
              <CalendarPlus size={17} /> Añadir a Mi Menú Navideño
            </button>
            <button className="btn outline" onClick={() => setShowJson(v => !v)}>
              <Code2 size={17} /> {showJson ? 'Ocultar JSON' : 'Ver Estructura JSON'}
            </button>
          </div>
        </div>
      </div>

      {/* VISOR DE ESTRUCTURA JSON DOCUMENTADA */}
      {showJson && (
        <div className="json-viewer">
          <div className="json-header">
            <div>
              <strong>📄 Estructura de datos JSON ({recipe.id}.json)</strong>
              <p>Esquema listo para integración en API o base de datos documental.</p>
            </div>
            <button className="btn gold" onClick={copyJson}>
              <Copy size={16} /> Copiar JSON
            </button>
          </div>
          <pre>{JSON.stringify(toRecipeJSON(recipe), null, 2)}</pre>
        </div>
      )}

      <div className="two-col">
        {/* LISTA DE INGREDIENTES INTERACTIVA CON CASILLAS DE VERIFICACIÓN */}
        <div className="panel">
          <div className="panel-head">
            <h2>Ingredientes</h2>
            {checkedList.length > 0 && (
              <button
                className="text-btn"
                onClick={() => ctx.clearRecipeIngredients(recipe.id)}
                title="Desmarcar todos"
              >
                <RotateCcw size={14} /> Reiniciar
              </button>
            )}
          </div>

          <p className="panel-sub">
            Marca las casillas conforme tengas listos tus ingredientes
            {customServings !== recipe.servings && ` (ajustado a ${customServings} porciones)`}.
          </p>

          <div className="progress-bar-wrap" aria-label="Progreso de ingredientes">
            <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <p className="progress-caption">
            {checkedList.length} de {recipe.ingredients.length} ingredientes verificados (
            {progressPct}%)
          </p>

          <ul className="ing-checklist">
            {recipe.ingredients.map(i => {
              const isChecked = checkedList.includes(i.name)
              return (
                <li key={i.name} className={isChecked ? 'checked' : ''}>
                  <label>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => ctx.toggleIngredient(recipe.id, i.name)}
                    />
                    <span className="ing-text">
                      <b>{scaleQuantity(i.qty, factor)}</b> {i.name}
                      {i.notes && <small className="ing-note"> · {i.notes}</small>}
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
        </div>

        {/* PASOS DETALLADOS ACOMPAÑADOS DE MULTIMEDIA */}
        <div className="panel">
          <div className="panel-head">
            <h2>Preparación Paso a Paso con Multimedia</h2>
            <span className="tag">
              {doneSteps.length}/{recipe.steps.length} pasos completados ({stepsPct}%)
            </span>
          </div>

          <div className="steps-multimedia">
            {recipe.steps.map(s => {
              const isDone = doneSteps.includes(s.stepNumber)
              const isTimerRunning = activeTimerStep === s.stepNumber

              return (
                <article
                  key={s.stepNumber}
                  className={`step-card ${isDone ? 'step-done' : ''}`}
                >
                  <div className="step-card-header">
                    <div className="step-number-badge">{s.stepNumber}</div>
                    <div className="step-title-wrap">
                      <h3>{s.title}</h3>
                      {s.durationMin && (
                        <button
                          className={`step-timer-btn ${isTimerRunning ? 'running' : ''}`}
                          onClick={() => startStepTimer(s.stepNumber, s.durationMin!)}
                        >
                          <Play size={13} />
                          {isTimerRunning
                            ? `En curso: ${formatTimer(secondsLeft)}`
                            : `Temporizador: ${s.durationMin} min`}
                        </button>
                      )}
                    </div>
                    <button
                      className={`step-check-btn ${isDone ? 'on' : ''}`}
                      onClick={() => ctx.toggleStep(recipe.id, s.stepNumber)}
                      title={isDone ? 'Marcar como pendiente' : 'Marcar paso completado'}
                    >
                      <CheckCircle2 size={20} />
                      <span>{isDone ? 'Completado' : 'Marcar paso'}</span>
                    </button>
                  </div>

                  <p className="step-instruction">{s.instruction}</p>

                  {/* BLOQUE MULTIMEDIA DEL PASO */}
                  <div className="step-media-box">
                    <div className="step-media-thumb">
                      <img src={s.mediaImg} alt={s.mediaLabel} loading="lazy" />
                      <span className={`media-type-pill ${s.mediaType}`}>
                        {s.mediaType === 'video-guia' && (
                          <>
                            <Film size={13} /> Video-Guía Visual
                          </>
                        )}
                        {s.mediaType === 'foto' && (
                          <>
                            <ImageIcon size={13} /> Referencia Visual
                          </>
                        )}
                        {s.mediaType === 'tip-chef' && (
                          <>
                            <ChefHat size={13} /> Técnica del Chef
                          </>
                        )}
                      </span>
                    </div>
                    <div className="step-media-caption">
                      <strong>{s.mediaLabel}</strong>
                      <p>{s.mediaCaption}</p>
                      {s.tip && <div className="chef-tip">💡 Consejo: {s.tip}</div>}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
