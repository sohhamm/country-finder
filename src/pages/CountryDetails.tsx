import React from 'react'
import {Link, useParams} from '@tanstack/react-router'
import {useCountry, useCountriesByCodes} from '../hooks/useCountries'
import {MdKeyboardBackspace} from 'react-icons/md'
import type {Country} from '../types/types'
import styles from './CountryDetails.module.css'

export default function CountryDetails() {
  const {slug} = useParams({from: '/$slug'})
  const {data: countryData, error: countryError, isLoading: countryLoading} = useCountry(slug)
  
  // Get the border country codes from the main country data
  const borderCodes = countryData?.[0]?.borders || []
  const {data: borderCountries, isLoading: borderLoading} = useCountriesByCodes(borderCodes)

  if (countryError)
    return (
      <p className={styles.error}>
        Error fetching data: {countryError.message}
        <button className={styles.refreshButton} onClick={() => location.reload()}>
          Refresh
        </button>
      </p>
    )

  if (countryLoading) return <p className={styles.loading}>Loading...</p>
  if (!countryData || countryData.length === 0) return <p className={styles.error}>Country not found</p>

  const country = countryData[0]

  return (
    <div className={styles.container}>
      <div className={styles.backButtonContainer}>
        <Link to='/' className={styles.backButton}>
          <MdKeyboardBackspace className={styles.backIcon} />
          Back
        </Link>
      </div>
      <div className={styles.content}>
        <img 
          src={country.flags.png} 
          alt={`Flag of ${country.name.common}`}
          className={styles.flagImage}
        />
        <div className={styles.details}>
          <h1 className={styles.title}>
            {country.name.common}
          </h1>
          <div className={styles.infoGrid}>
            <div className={styles.infoColumn}>
              <p className={styles.infoItem}>
                Native name: <span>{Object.values(country.name.nativeName || {})[0]?.common || country.name.common}</span>
              </p>
              <p className={styles.infoItem}>
                Population: <span>{country.population.toLocaleString()}</span>
              </p>
              <p className={styles.infoItem}>
                Region: <span>{country.region}</span>
              </p>
              <p className={styles.infoItem}>
                Sub Region: <span>{country.subregion || 'N/A'}</span>
              </p>
              <p className={styles.infoItem}>
                Capital: <span>{country.capital?.[0] || 'N/A'}</span>
              </p>
            </div>
            <div className={styles.infoColumn}>
              <p className={styles.infoItem}>
                Top level domain: <span>{country.tld?.[0] || 'N/A'}</span>
              </p>
              <p className={styles.infoItem}>
                Currencies:{` `}
                <span>
                  {Object.values(country.currencies || {}).map((currency: any, idx: number) => (
                    <span key={idx}>{currency.name}</span>
                  ))}
                </span>
              </p>
              <p className={styles.infoItem}>
                Languages:{` `}
                <span>
                  {Object.values(country.languages || {}).map((language: string, idx: number) => (
                    <span key={idx}>
                      {language}
                      {idx === Object.values(country.languages || {}).length - 1 ? '' : ', '}
                    </span>
                  ))}
                </span>
              </p>
            </div>
          </div>
          {borderCountries && borderCountries.length > 0 ? (
            <div className={styles.bordersContainer}>
              <p className={styles.bordersLabel}>Border Countries:</p>
              <div className={styles.bordersList}>
                {borderCountries.map((border: Country, idx: number) => (
                  <Link to={`/${border.name.official}`} key={idx} className={styles.borderButton}>
                    {border.name.common}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}