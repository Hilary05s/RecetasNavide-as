import { RECIPES } from '../data/recipes'
import { CONTINENT_INFO, type Continent } from '../types'

interface Props {
  selected?: Continent | 'todos'
  onPick: (c: Continent) => void
}

export default function CategoryGrid({ selected, onPick }: Props) {
  const countByContinent = (c: Continent) =>
    RECIPES.filter(r => r.continent === c || r.secondaryContinent === c).length

  return (
    <div className="cat-grid">
      {(Object.keys(CONTINENT_INFO) as Continent[]).map(c => {
        const info = CONTINENT_INFO[c]
        const isSelected = selected === c
        return (
          <button
            key={c}
            className={`cat-card ${isSelected ? 'active' : ''}`}
            onClick={() => onPick(c)}
          >
            <span className="cat-emoji">{info.emoji}</span>
            <strong>{info.label}</strong>
            <span className="cat-countries">{info.countries}</span>
            <p className="cat-desc">{info.description}</p>
            <small className="cat-count">{countByContinent(c)} platillos documentados</small>
          </button>
        )
      })}
    </div>
  )
}
