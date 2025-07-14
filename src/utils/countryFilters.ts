import type {Country, FilterOptions} from '../types/types'

export function filterCountries(countries: Country[], filters: FilterOptions): Country[] {
  let filtered = [...countries]

  // Search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filtered = filtered.filter(country => 
      country.name.official.toLowerCase().includes(searchTerm) ||
      country.name.common.toLowerCase().includes(searchTerm) ||
      (country.capital && country.capital.some(cap => cap.toLowerCase().includes(searchTerm)))
    )
  }

  // Region filter
  if (filters.region) {
    filtered = filtered.filter(country => country.region === filters.region)
  }

  // Subregion filter
  if (filters.subregion) {
    filtered = filtered.filter(country => country.subregion === filters.subregion)
  }

  // Population range filter
  if (filters.populationRange) {
    const {min = 0, max = Infinity} = filters.populationRange
    filtered = filtered.filter(country => 
      country.population >= min && country.population <= max
    )
  }

  // Area range filter
  if (filters.areaRange) {
    const {min = 0, max = Infinity} = filters.areaRange
    filtered = filtered.filter(country => 
      country.area >= min && country.area <= max
    )
  }

  // Language filter
  if (filters.language) {
    filtered = filtered.filter(country => 
      country.languages && 
      Object.values(country.languages).includes(filters.language!)
    )
  }

  // Currency filter
  if (filters.currency) {
    filtered = filtered.filter(country => 
      country.currencies && 
      Object.values(country.currencies).some(curr => curr.name === filters.currency)
    )
  }

  // Landlocked filter
  if (filters.landlocked !== undefined) {
    filtered = filtered.filter(country => 
      Boolean(country.landlocked) === filters.landlocked
    )
  }

  // UN Member filter
  if (filters.unMember !== undefined) {
    filtered = filtered.filter(country => 
      Boolean(country.unMember) === filters.unMember
    )
  }

  // Independent filter
  if (filters.independent !== undefined) {
    filtered = filtered.filter(country => 
      Boolean(country.independent) === filters.independent
    )
  }

  return filtered
}

export function sortCountries(countries: Country[], sortBy?: string, sortOrder: 'asc' | 'desc' = 'asc'): Country[] {
  if (!sortBy) return countries

  const sorted = [...countries].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case 'name':
        comparison = a.name.common.localeCompare(b.name.common)
        break
      case 'population':
        comparison = a.population - b.population
        break
      case 'area':
        comparison = a.area - b.area
        break
      case 'region':
        comparison = a.region.localeCompare(b.region)
        break
      default:
        return 0
    }

    return sortOrder === 'desc' ? -comparison : comparison
  })

  return sorted
}

export function getFilteredAndSortedCountries(
  countries: Country[], 
  filters: FilterOptions
): Country[] {
  const filtered = filterCountries(countries, filters)
  return sortCountries(filtered, filters.sortBy, filters.sortOrder)
}