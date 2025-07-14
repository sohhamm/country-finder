import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { useCountries } from '../hooks/useCountries'
import { useCountryStore } from '../store/country'
import type { Country } from '../types/types'
import styles from './Rankings.module.css'

const REGIONS = ['Americas', 'Antarctic', 'Africa', 'Asia', 'Europe', 'Oceania'] as const

export default function Rankings() {
  const { data: countries, error, isLoading } = useCountries()
  const {
    regionFilters,
    setRegionFilters,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    unMemberFilter,
    setUnMemberFilter,
    independentFilter,
    setIndependentFilter,
  } = useCountryStore()

  const toggleRegionFilter = (region: typeof REGIONS[number]) => {
    const newFilters = regionFilters.includes(region as any)
      ? regionFilters.filter((r) => r !== region)
      : [...regionFilters, region as any]
    setRegionFilters(newFilters)
  }

  const handleUnMemberFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      setUnMemberFilter(null)
    } else {
      setUnMemberFilter(true)
    }
  }

  const handleIndependentFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      setIndependentFilter(null)
    } else {
      setIndependentFilter(true)
    }
  }

  const filteredAndSortedCountries = React.useMemo(() => {
    if (!countries) return []

    let filtered = countries.filter((country: Country) => {
      // Region filter
      if (regionFilters.length > 0 && !regionFilters.includes(country.region as any)) {
        return false
      }

      // UN Member filter
      if (unMemberFilter !== null && country.unMember !== unMemberFilter) {
        return false
      }

      // Independent filter
      if (independentFilter !== null && country.independent !== independentFilter) {
        return false
      }

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        return (
          country.name.common.toLowerCase().includes(searchLower) ||
          country.name.official.toLowerCase().includes(searchLower) ||
          country.region.toLowerCase().includes(searchLower) ||
          (country.subregion && country.subregion.toLowerCase().includes(searchLower))
        )
      }

      return true
    })

    // Sort countries
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.common.localeCompare(b.name.common)
        case 'population':
          return b.population - a.population
        case 'area':
          return (b.area || 0) - (a.area || 0)
        default:
          return 0
      }
    })

    return filtered
  }, [countries, regionFilters, searchTerm, sortBy, unMemberFilter, independentFilter])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  if (error) return <p className={styles.error}>Error fetching data: {error.message}</p>
  if (isLoading) return <p className={styles.loading}>Loading...</p>
  if (!countries) return <p className={styles.error}>No countries found</p>

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Country Rankings</h1>
          <p className={styles.countryCount}>
            Found {filteredAndSortedCountries.length} countries
          </p>

          <div className={styles.filters}>
            <div className={styles.filtersRow}>
              <input
                type="text"
                placeholder="Search by Name, Region, Subregion"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className={styles.select}
              >
                <option value="population">Population</option>
                <option value="name">Name</option>
                <option value="area">Area (km²)</option>
              </select>
            </div>

            <div className={styles.filtersRow}>
              <span className={styles.filterLabel}>Region:</span>
              <div className={styles.regionFilters}>
                {REGIONS.map((region) => (
                  <button
                    key={region}
                    onClick={() => toggleRegionFilter(region)}
                    className={`${styles.regionButton} ${
                      regionFilters.includes(region as any) ? styles.active : ''
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filtersRow}>
              <span className={styles.filterLabel}>Status:</span>
              <div className={styles.statusFilters}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={unMemberFilter === true}
                    onChange={handleUnMemberFilterChange}
                  />
                  Member of the United Nations
                </label>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={independentFilter === true}
                    onChange={handleIndependentFilterChange}
                  />
                  Independent
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>Flag</th>
              <th>
                <button
                  onClick={() => setSortBy('name')}
                  className={styles.sortButton}
                >
                  Name {sortBy === 'name' && '↓'}
                </button>
              </th>
              <th>
                <button
                  onClick={() => setSortBy('population')}
                  className={styles.sortButton}
                >
                  Population {sortBy === 'population' && '↓'}
                </button>
              </th>
              <th>
                <button
                  onClick={() => setSortBy('area')}
                  className={styles.sortButton}
                >
                  Area (km²) {sortBy === 'area' && '↓'}
                </button>
              </th>
              <th>Region</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedCountries.map((country: Country) => (
              <tr
                key={country.cca3}
                className={styles.tableRow}
              >
                <td className={styles.tableCell}>
                  <div className={styles.flagCell}>
                    <img
                      src={country.flags.png}
                      alt={country.flags.alt || `Flag of ${country.name.common}`}
                      className={styles.flag}
                    />
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <Link
                    to="/$slug"
                    params={{ slug: country.name.common.toLowerCase().replace(/\s+/g, '-') }}
                    className={styles.countryLink}
                  >
                    <div className={styles.countryName}>{country.name.common}</div>
                  </Link>
                </td>
                <td className={`${styles.tableCell} ${styles.numberCell}`}>
                  {formatNumber(country.population)}
                </td>
                <td className={`${styles.tableCell} ${styles.numberCell}`}>
                  {country.area ? formatNumber(country.area) : 'N/A'}
                </td>
                <td className={styles.tableCell}>{country.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}