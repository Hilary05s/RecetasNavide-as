import { useState } from 'react'
import { Award, CheckCircle2, Edit3, Globe, Heart, Save, UserCheck } from 'lucide-react'
import RecipeCard from '../components/RecipeCard'
import { RECIPES } from '../data/recipes'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { CONTINENT_INFO, type Continent, type Ctx, type UserProfile } from '../types'

const AVATARS = ['👩‍🍳', '👨‍🍳', '🧑‍🎄', '🤶', '🌍', '🦌']

export default function FavoritesPage({
  ctx,
  goExplore
}: {
  ctx: Ctx
  goExplore: () => void
}) {
  const [profile, setProfile] = useLocalStorage<UserProfile>('ng-perfil', {
    name: 'Chef Anfitrión',
    title: 'Explorador Gastronómico Navideño',
    avatar: '👩‍🍳',
    favoriteContinent: 'america',
    bio: 'Coleccionando los mejores sabores tradicionales del mundo para la cena de Nochebuena.'
  })
  const [editing, setEditing] = useState(false)

  const favRecipes = RECIPES.filter(r => ctx.favs.includes(r.id))
  const totalCheckedIngs = Object.values(ctx.checkedIngredients).reduce(
    (acc, list) => acc + list.length,
    0
  )
  const totalDoneSteps = Object.values(ctx.completedSteps).reduce(
    (acc, list) => acc + list.length,
    0
  )

  return (
    <section className="section">
      {/* TARJETA DE PERFIL CULINARIO */}
      <div className="profile-banner">
        <div className="profile-avatar-col">
          <div className="profile-avatar">{profile.avatar}</div>
          {editing && (
            <div className="avatar-picker">
              {AVATARS.map(a => (
                <button
                  key={a}
                  type="button"
                  className={profile.avatar === a ? 'on' : ''}
                  onClick={() => setProfile(p => ({ ...p, avatar: a }))}
                >
                  {a}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="profile-main-col">
          {!editing ? (
            <>
              <div className="profile-title-row">
                <div>
                  <span className="section-kicker">
                    <Award size={15} /> Pasaporte Gastronómico Navideño
                  </span>
                  <h2>{profile.name}</h2>
                  <p className="profile-role">{profile.title}</p>
                </div>
                <button className="btn outline" onClick={() => setEditing(true)}>
                  <Edit3 size={16} /> Editar perfil
                </button>
              </div>
              <p className="profile-bio">{profile.bio}</p>
              <div className="profile-badges">
                <span className="tag">
                  {profile.favoriteContinent === 'todos'
                    ? '🌍 Ciudadano Global'
                    : `${CONTINENT_INFO[profile.favoriteContinent].emoji} Región favorita: ${CONTINENT_INFO[profile.favoriteContinent].label}`}
                </span>
                <span className="tag subtle">
                  <Heart size={13} /> {favRecipes.length} de 8 platillos en favoritos
                </span>
              </div>
            </>
          ) : (
            <form
              className="profile-edit-form"
              onSubmit={e => {
                e.preventDefault()
                setEditing(false)
                ctx.notify('✅ Perfil actualizado correctamente')
              }}
            >
              <div className="form-row">
                <label>
                  Nombre o alias
                  <input
                    value={profile.name}
                    onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                  />
                </label>
                <label>
                  Título culinario
                  <input
                    value={profile.title}
                    onChange={e => setProfile(p => ({ ...p, title: e.target.value }))}
                  />
                </label>
                <label>
                  Continente favorito
                  <select
                    value={profile.favoriteContinent}
                    onChange={e =>
                      setProfile(p => ({
                        ...p,
                        favoriteContinent: e.target.value as Continent | 'todos'
                      }))
                    }
                  >
                    <option value="america">🌎 América</option>
                    <option value="europa">🌍 Europa</option>
                    <option value="oceania">🌏 Oceanía</option>
                    <option value="todos">✨ Todos los continentes</option>
                  </select>
                </label>
              </div>
              <label>
                Biografía o nota navideña
                <input
                  value={profile.bio}
                  onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                />
              </label>
              <button className="btn gold" type="submit">
                <Save size={16} /> Guardar cambios
              </button>
            </form>
          )}

          {/* ESTADÍSTICAS DEL PERFIL */}
          <div className="profile-stats">
            <div className="p-stat">
              <Heart size={18} />
              <div>
                <strong>{favRecipes.length}</strong>
                <small>Recetas favoritas</small>
              </div>
            </div>
            <div className="p-stat">
              <CheckCircle2 size={18} />
              <div>
                <strong>{totalCheckedIngs}</strong>
                <small>Ingredientes listos</small>
              </div>
            </div>
            <div className="p-stat">
              <UserCheck size={18} />
              <div>
                <strong>{totalDoneSteps}</strong>
                <small>Pasos completados</small>
              </div>
            </div>
            <div className="p-stat">
              <Globe size={18} />
              <div>
                <strong>{ctx.menuPlan.guests}</strong>
                <small>Invitados en Mi Menú</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE RECETAS FAVORITAS GUARDADAS */}
      <div className="section-head" style={{ marginTop: '36px' }}>
        <div>
          <h2>Mis Recetas Favoritas Guardadas ({favRecipes.length})</h2>
          <p className="lead">
            Acceso rápido a tus platillos internacionales preferidos para esta Navidad.
          </p>
        </div>
        <button className="btn outline" onClick={goExplore}>
          Explorar las 8 recetas
        </button>
      </div>

      {favRecipes.length === 0 ? (
        <div className="empty">
          <span>💝</span>
          <h3>Aún no has guardado recetas favoritas</h3>
          <p>
            Pulsa el icono de corazón en cualquiera de los 8 platillos internacionales para
            guardarlos en tu perfil.
          </p>
          <button className="btn gold" onClick={goExplore}>
            Descubrir platillos del mundo
          </button>
        </div>
      ) : (
        <div className="grid">
          {favRecipes.map(r => (
            <RecipeCard key={r.id} recipe={r} ctx={ctx} />
          ))}
        </div>
      )}
    </section>
  )
}
