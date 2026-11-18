import { CalendarPlus, Clock, Flame, Heart, Users } from 'lucide-react'
import RecipeImage from './RecipeImage'
import { CONTINENT_INFO, COURSE_LABEL, type Ctx, type Recipe } from '../types'

export default function RecipeCard({ recipe, ctx }: { recipe: Recipe; ctx: Ctx }) {
  const fav = ctx.favs.includes(recipe.id)
  const continent = CONTINENT_INFO[recipe.continent]
  const checkedCount = (ctx.checkedIngredients[recipe.id] ?? []).length

  return (
    <article className="card">
      <div className="card-img">
        <RecipeImage recipe={recipe} />
        <span className="origin-pill">
          {recipe.flag} {recipe.origin}
        </span>
        <button
          className={`fav ${fav ? 'on' : ''}`}
          onClick={() => ctx.toggleFav(recipe)}
          aria-label={fav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          title={fav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
        >
          <Heart size={18} fill={fav ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="card-body">
        <div className="card-tags">
          <span className="tag">
            {continent.emoji} {continent.label}
          </span>
          <span className="tag subtle">{COURSE_LABEL[recipe.course]}</span>
        </div>
        <h3>{recipe.name}</h3>
        <p className="card-desc">{recipe.description}</p>
        <p className="meta">
          <span>
            <Clock size={15} /> {recipe.time} min
          </span>
          <span>
            <Users size={15} /> {recipe.servings} porc.
          </span>
          <span>
            <Flame size={15} /> {recipe.difficulty}
          </span>
        </p>
        {checkedCount > 0 && (
          <p className="ing-progress-pill">
            ✓ {checkedCount}/{recipe.ingredients.length} ingredientes listos
          </p>
        )}
        <div className="card-actions">
          <button className="btn" onClick={() => ctx.open(recipe.id)}>
            Ver receta
          </button>
          <button
            className="btn outline icon-only"
            onClick={() => ctx.addRecipeToMenu(recipe)}
            title="Añadir a Mi Menú Navideño"
            aria-label={`Añadir ${recipe.name} a Mi Menú Navideño`}
          >
            <CalendarPlus size={18} />
          </button>
        </div>
      </div>
    </article>
  )
}
