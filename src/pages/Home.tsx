import * as React from 'react'
import {useSearch} from '@tanstack/react-router'
import CountryCard from '../components/CountryCard'
import Header from '../components/Header'
import AdvancedFilters from '../components/AdvancedFilters'
import {useCountries} from '../hooks/useCountries'
import {useCountryStore} from '../store/country'
import {getFilteredAndSortedCountries} from '../utils/countryFilters'
import type {Country, FilterOptions} from '../types/types'
import styles from './Home.module.css'

export default function Home() {
  const {data: countries, error, isLoading} = useCountries()
  const search = useSearch({from: '/'}) as FilterOptions
  const setBorderCountries = useCountryStore((state: any) => state.setBorderCountries)

  React.useEffect(() => {
    if (countries) {
      const borderData = countries.map((country: Country) => ({
        name: country.name.official,
        code: country.cca3
      }))
      setBorderCountries(borderData)
    }
  }, [countries, setBorderCountries])

  const filteredCountries = React.useMemo(() => {
    if (!countries) return []
    return getFilteredAndSortedCountries(countries, search)
  }, [countries, search])

  if (error) return <p className={styles.error}>Error fetching data: {error.message}</p>
  if (isLoading) return <p className={styles.loading}>Loading...</p>
  if (!countries) return <p className={styles.error}>No countries found</p>

  return (
    <div className={styles.container}>
      <Header />
      <AdvancedFilters countries={countries} />
      <div className={styles.resultsInfo}>
        Showing {filteredCountries.length} of {countries.length} countries
      </div>
      <div className={styles.grid}>
        {filteredCountries.map((country: Country) => (
          <CountryCard country={country} key={country.name.official} />
        ))}
      </div>
      {filteredCountries.length === 0 && (
        <div className={styles.noResults}>
          <p>No countries match your current filters.</p>
          <p>Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  )
}