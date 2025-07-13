import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {useCountry} from '../data/use-country'
import {MdKeyboardBackspace} from 'react-icons/md'
import {useCountryStore} from '../store/country'
import styles from './CountryDetails.module.css'

export default function CountryDetails() {
  const [borders, setBorders] = React.useState<any>([])
  const {slug}: any = useParams()
  const {country, error} = useCountry(slug)
  const borderCountries = useCountryStore((state: any) => state.borderCountries)

  React.useEffect(() => {
    if (country) {
      const filter = borderCountries.filter((c: any) => country[0].borders.includes(c.code))
      setBorders(filter)
    }
  }, [country, setBorders])

  if (error)
    return (
      <p className={styles.error}>
        Error fetching data
        <button className={styles.refreshButton} onClick={() => location.reload()}>
          Refresh
        </button>
      </p>
    )

  if (!country) return <p className={styles.loading}>Loading...</p>

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
          src={country[0].flags.png} 
          alt={`Flag of ${country[0].name.common}`}
          className={styles.flagImage}
        />
        <div className={styles.details}>
          <h1 className={styles.title}>
            {country[0].name.common}
          </h1>
          <div className={styles.infoGrid}>
            <div className={styles.infoColumn}>
              <p className={styles.infoItem}>
                Native name: <span>{Object.values(country[0].name.nativeName)[0]?.common || country[0].name.common}</span>
              </p>
              <p className={styles.infoItem}>
                Population: <span>{country[0].population.toLocaleString()}</span>
              </p>
              <p className={styles.infoItem}>
                Region: <span>{country[0].region}</span>
              </p>
              <p className={styles.infoItem}>
                Sub Region: <span>{country[0].subregion}</span>
              </p>
              <p className={styles.infoItem}>
                Capital: <span>{country[0].capital?.[0] || 'N/A'}</span>
              </p>
            </div>
            <div className={styles.infoColumn}>
              <p className={styles.infoItem}>
                Top level domain: <span>{country[0].tld?.[0] || 'N/A'}</span>
              </p>
              <p className={styles.infoItem}>
                Currencies:{` `}
                <span>
                  {Object.values(country[0].currencies || {}).map((currency: any, idx: number) => (
                    <span key={idx}>{currency.name}</span>
                  ))}
                </span>
              </p>
              <p className={styles.infoItem}>
                Languages:{` `}
                <span>
                  {Object.values(country[0].languages || {}).map((language: any, idx: number) => (
                    <span key={idx}>
                      {language}
                      {idx === Object.values(country[0].languages || {}).length - 1 ? '' : ', '}
                    </span>
                  ))}
                </span>
              </p>
            </div>
          </div>
          {country[0].borders?.length && borders.length > 0 ? (
            <div className={styles.bordersContainer}>
              <p className={styles.bordersLabel}>Border Countries:</p>
              <div className={styles.bordersList}>
                {borders.map((border: {name: string; code: string}, idx: number) => (
                  <Link to={`/${border.name}`} key={idx} className={styles.borderButton}>
                    {border.name}
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