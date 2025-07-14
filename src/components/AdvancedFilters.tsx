import * as React from 'react'
import {Menu} from '@ark-ui/react/menu'
import {useNavigate, useSearch} from '@tanstack/react-router'
import {HiChevronDown} from 'react-icons/hi'
import {MdClose} from 'react-icons/md'
import type {FilterOptions, PopulationRange, AreaRange, Country} from '../types/types'
import styles from './AdvancedFilters.module.css'

interface AdvancedFiltersProps {
  countries?: Country[]
}

const POPULATION_RANGES: PopulationRange[] = [
  {label: 'Under 1M', min: 0, max: 1000000},
  {label: '1M - 10M', min: 1000000, max: 10000000},
  {label: '10M - 50M', min: 10000000, max: 50000000},
  {label: '50M - 100M', min: 50000000, max: 100000000},
  {label: 'Over 100M', min: 100000000, max: Infinity},
]

const AREA_RANGES: AreaRange[] = [
  {label: 'Under 1,000 km²', min: 0, max: 1000},
  {label: '1,000 - 10,000 km²', min: 1000, max: 10000},
  {label: '10,000 - 100,000 km²', min: 10000, max: 100000},
  {label: '100,000 - 1M km²', min: 100000, max: 1000000},
  {label: 'Over 1M km²', min: 1000000, max: Infinity},
]

const SORT_OPTIONS = [
  {value: 'name-asc', label: 'Name (A-Z)'},
  {value: 'name-desc', label: 'Name (Z-A)'},
  {value: 'population-desc', label: 'Population (High to Low)'},
  {value: 'population-asc', label: 'Population (Low to High)'},
  {value: 'area-desc', label: 'Area (Largest to Smallest)'},
  {value: 'area-asc', label: 'Area (Smallest to Largest)'},
]

export default function AdvancedFilters({countries}: AdvancedFiltersProps) {
  const navigate = useNavigate({from: '/'})
  const search = useSearch({from: '/'}) as FilterOptions
  
  const uniqueLanguages = React.useMemo(() => {
    if (!countries) return []
    const languages = new Set<string>()
    countries.forEach(country => {
      if (country.languages) {
        Object.values(country.languages).forEach(lang => languages.add(lang))
      }
    })
    return Array.from(languages).sort()
  }, [countries])

  const uniqueCurrencies = React.useMemo(() => {
    if (!countries) return []
    const currencies = new Set<string>()
    countries.forEach(country => {
      if (country.currencies) {
        Object.values(country.currencies).forEach(curr => currencies.add(curr.name))
      }
    })
    return Array.from(currencies).sort()
  }, [countries])

  const uniqueSubregions = React.useMemo(() => {
    if (!countries) return []
    const subregions = new Set<string>()
    countries.forEach(country => {
      if (country.subregion) {
        subregions.add(country.subregion)
      }
    })
    return Array.from(subregions).sort()
  }, [countries])

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    navigate({
      search: {
        ...search,
        [key]: value || undefined,
      },
    })
  }

  const clearFilter = (key: keyof FilterOptions) => {
    navigate({
      search: {
        ...search,
        [key]: undefined,
      },
    })
  }

  const clearAllFilters = () => {
    navigate({
      search: {
        search: search.search, // Keep search term
      },
    })
  }

  const hasActiveFilters = Boolean(
    search.region || 
    search.subregion || 
    search.populationRange || 
    search.areaRange || 
    search.language || 
    search.currency || 
    search.landlocked !== undefined || 
    search.unMember !== undefined || 
    search.independent !== undefined ||
    search.sortBy
  )

  return (
    <div className={styles.container}>
      <div className={styles.filterRow}>
        {/* Region Filter */}
        <div className={styles.filterGroup}>
          <Menu.Root onSelect={details => updateFilter('region', details.value)}>
            <Menu.Trigger asChild>
              <button className={styles.filterButton}>
                {search.region || 'Region'}
                <HiChevronDown className={styles.chevronIcon} />
              </button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content className={styles.menuContent}>
                <Menu.Item value='Africa' className={styles.menuItem}>Africa</Menu.Item>
                <Menu.Item value='Americas' className={styles.menuItem}>Americas</Menu.Item>
                <Menu.Item value='Asia' className={styles.menuItem}>Asia</Menu.Item>
                <Menu.Item value='Europe' className={styles.menuItem}>Europe</Menu.Item>
                <Menu.Item value='Oceania' className={styles.menuItem}>Oceania</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
          {search.region && (
            <MdClose 
              className={styles.clearIcon} 
              onClick={() => clearFilter('region')} 
            />
          )}
        </div>

        {/* Subregion Filter */}
        {search.region && (
          <div className={styles.filterGroup}>
            <Menu.Root onSelect={details => updateFilter('subregion', details.value)}>
              <Menu.Trigger asChild>
                <button className={styles.filterButton}>
                  {search.subregion || 'Subregion'}
                  <HiChevronDown className={styles.chevronIcon} />
                </button>
              </Menu.Trigger>
              <Menu.Positioner>
                <Menu.Content className={styles.menuContent}>
                  {uniqueSubregions
                    .filter(subregion => {
                      if (!search.region) return true
                      return countries?.some(country => 
                        country.region === search.region && country.subregion === subregion
                      )
                    })
                    .map(subregion => (
                      <Menu.Item key={subregion} value={subregion} className={styles.menuItem}>
                        {subregion}
                      </Menu.Item>
                    ))}
                </Menu.Content>
              </Menu.Positioner>
            </Menu.Root>
            {search.subregion && (
              <MdClose 
                className={styles.clearIcon} 
                onClick={() => clearFilter('subregion')} 
              />
            )}
          </div>
        )}

        {/* Population Filter */}
        <div className={styles.filterGroup}>
          <Menu.Root onSelect={details => {
            const range = POPULATION_RANGES.find(r => r.label === details.value)
            updateFilter('populationRange', range ? {min: range.min, max: range.max} : undefined)
          }}>
            <Menu.Trigger asChild>
              <button className={styles.filterButton}>
                {search.populationRange ? 
                  POPULATION_RANGES.find(r => 
                    r.min === search.populationRange?.min && r.max === search.populationRange?.max
                  )?.label || 'Population' : 
                  'Population'
                }
                <HiChevronDown className={styles.chevronIcon} />
              </button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content className={styles.menuContent}>
                {POPULATION_RANGES.map(range => (
                  <Menu.Item key={range.label} value={range.label} className={styles.menuItem}>
                    {range.label}
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
          {search.populationRange && (
            <MdClose 
              className={styles.clearIcon} 
              onClick={() => clearFilter('populationRange')} 
            />
          )}
        </div>

        {/* Area Filter */}
        <div className={styles.filterGroup}>
          <Menu.Root onSelect={details => {
            const range = AREA_RANGES.find(r => r.label === details.value)
            updateFilter('areaRange', range ? {min: range.min, max: range.max} : undefined)
          }}>
            <Menu.Trigger asChild>
              <button className={styles.filterButton}>
                {search.areaRange ? 
                  AREA_RANGES.find(r => 
                    r.min === search.areaRange?.min && r.max === search.areaRange?.max
                  )?.label || 'Area' : 
                  'Area'
                }
                <HiChevronDown className={styles.chevronIcon} />
              </button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content className={styles.menuContent}>
                {AREA_RANGES.map(range => (
                  <Menu.Item key={range.label} value={range.label} className={styles.menuItem}>
                    {range.label}
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
          {search.areaRange && (
            <MdClose 
              className={styles.clearIcon} 
              onClick={() => clearFilter('areaRange')} 
            />
          )}
        </div>
      </div>

      <div className={styles.filterRow}>
        {/* Language Filter */}
        <div className={styles.filterGroup}>
          <Menu.Root onSelect={details => updateFilter('language', details.value)}>
            <Menu.Trigger asChild>
              <button className={styles.filterButton}>
                {search.language || 'Language'}
                <HiChevronDown className={styles.chevronIcon} />
              </button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content className={styles.menuContent}>
                {uniqueLanguages.slice(0, 20).map(language => (
                  <Menu.Item key={language} value={language} className={styles.menuItem}>
                    {language}
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
          {search.language && (
            <MdClose 
              className={styles.clearIcon} 
              onClick={() => clearFilter('language')} 
            />
          )}
        </div>

        {/* Currency Filter */}
        <div className={styles.filterGroup}>
          <Menu.Root onSelect={details => updateFilter('currency', details.value)}>
            <Menu.Trigger asChild>
              <button className={styles.filterButton}>
                {search.currency || 'Currency'}
                <HiChevronDown className={styles.chevronIcon} />
              </button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content className={styles.menuContent}>
                {uniqueCurrencies.slice(0, 20).map(currency => (
                  <Menu.Item key={currency} value={currency} className={styles.menuItem}>
                    {currency}
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
          {search.currency && (
            <MdClose 
              className={styles.clearIcon} 
              onClick={() => clearFilter('currency')} 
            />
          )}
        </div>

        {/* Boolean Filters */}
        <div className={styles.filterGroup}>
          <Menu.Root onSelect={details => {
            const value = details.value === 'true' ? true : details.value === 'false' ? false : undefined
            updateFilter('landlocked', value)
          }}>
            <Menu.Trigger asChild>
              <button className={styles.filterButton}>
                {search.landlocked !== undefined ? 
                  (search.landlocked ? 'Landlocked' : 'Coastal') : 
                  'Land/Coast'
                }
                <HiChevronDown className={styles.chevronIcon} />
              </button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content className={styles.menuContent}>
                <Menu.Item value='true' className={styles.menuItem}>Landlocked</Menu.Item>
                <Menu.Item value='false' className={styles.menuItem}>Coastal</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
          {search.landlocked !== undefined && (
            <MdClose 
              className={styles.clearIcon} 
              onClick={() => clearFilter('landlocked')} 
            />
          )}
        </div>

        <div className={styles.filterGroup}>
          <Menu.Root onSelect={details => {
            const value = details.value === 'true' ? true : details.value === 'false' ? false : undefined
            updateFilter('unMember', value)
          }}>
            <Menu.Trigger asChild>
              <button className={styles.filterButton}>
                {search.unMember !== undefined ? 
                  (search.unMember ? 'UN Member' : 'Non-UN Member') : 
                  'UN Status'
                }
                <HiChevronDown className={styles.chevronIcon} />
              </button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content className={styles.menuContent}>
                <Menu.Item value='true' className={styles.menuItem}>UN Member</Menu.Item>
                <Menu.Item value='false' className={styles.menuItem}>Non-UN Member</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
          {search.unMember !== undefined && (
            <MdClose 
              className={styles.clearIcon} 
              onClick={() => clearFilter('unMember')} 
            />
          )}
        </div>

        {/* Sort Filter */}
        <div className={styles.filterGroup}>
          <Menu.Root onSelect={details => {
            const [sortBy, sortOrder] = details.value.split('-')
            updateFilter('sortBy', sortBy)
            updateFilter('sortOrder', sortOrder)
          }}>
            <Menu.Trigger asChild>
              <button className={styles.filterButton}>
                {search.sortBy ? 
                  SORT_OPTIONS.find(opt => opt.value === `${search.sortBy}-${search.sortOrder}`)?.label || 'Sort' :
                  'Sort'
                }
                <HiChevronDown className={styles.chevronIcon} />
              </button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content className={styles.menuContent}>
                {SORT_OPTIONS.map(option => (
                  <Menu.Item key={option.value} value={option.value} className={styles.menuItem}>
                    {option.label}
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
          {search.sortBy && (
            <MdClose 
              className={styles.clearIcon} 
              onClick={() => {
                clearFilter('sortBy')
                clearFilter('sortOrder')
              }} 
            />
          )}
        </div>
      </div>

      {hasActiveFilters && (
        <div className={styles.clearAllContainer}>
          <button className={styles.clearAllButton} onClick={clearAllFilters}>
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  )
}