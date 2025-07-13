import * as React from 'react'
import CountryCard from '../components/CountryCard'
import Header from '../components/Header'
import {useGetAllCountries} from '../data/use-countries'
import {useCountryStore} from '../store/country'
import styles from './Home.module.css'

export default function Home() {
  const {countries, error} = useGetAllCountries()
  const regionFilter = useCountryStore((state: any) => state.regionFilter)
  const searchTerm = useCountryStore((state: any) => state.searchTerm)
  const setBorderCountries = useCountryStore((state: any) => state.setBorderCountries)

  React.useEffect(() => {
    if (countries) {
      const arr: any = []
      countries.forEach((country: any) => {
        arr.push({name: country.name.official, code: country.alpha3Code})
      })
      setBorderCountries(arr)
    }
  }, [countries])

  if (error) return <p className={styles.error}>Error fetching data...</p>
  if (!countries) return <p className={styles.loading}>Loading...</p>

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.grid}>
        {countries
          .filter((country: any) => {
            if (regionFilter) {
              return country.region === regionFilter
            } else {
              return true
            }
          })
          .filter((country: any) =>
            country.name.official
              .toLowerCase()
              .includes(searchTerm.toLowerCase()),
          )
          .map((country: any) => (
            <CountryCard country={country} key={country.name.official} />
          ))}
      </div>
    </div>
  )
}