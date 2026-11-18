import { useState } from 'react'
import type { Recipe } from '../types'

// Muestra la foto; si falla (sin conexión) usa un degradado con emoji.
export default function RecipeImage({ recipe, className = '' }: { recipe: Recipe; className?: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div className={`img-fallback ${className}`} role="img" aria-label={recipe.name}>{recipe.emoji}</div>
  return <img className={className} src={recipe.img} alt={recipe.name} loading="lazy" onError={() => setFailed(true)} />
}
