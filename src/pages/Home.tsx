import * as React from 'react'
import CountryCard from '../components/CountryCard'
import Header from '../components/Header'
import {useCountries} from '../hooks/useCountries'
import {useCountryStore} from '../store/country'
import type {Country} from '../types/types'
import styles from './Home.module.css'

export default function Home() {
  const {data: countries, error, isLoading} = useCountries()
  const regionFilter = useCountryStore((state: any) => state.regionFilter)
  const searchTerm = useCountryStore((state: any) => state.searchTerm)
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

  if (error) return <p className={styles.error}>Error fetching data: {error.message}</p>
  if (isLoading) return <p className={styles.loading}>Loading...</p>
  if (!countries) return <p className={styles.error}>No countries found</p>

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.grid}>
        {countries
          .filter((country: Country) => {
            if (regionFilter) {
              return country.region === regionFilter
            }
            return true
          })
          .filter((country: Country) =>
            country.name.official
              .toLowerCase()
              .includes(searchTerm.toLowerCase()),
          )
          .map((country: Country) => (
            <CountryCard country={country} key={country.name.official} />
          ))}
      </div>
    </div>
  )
}