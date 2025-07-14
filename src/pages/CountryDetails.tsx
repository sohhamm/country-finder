import {Link, useParams} from '@tanstack/react-router'
import {useCountry, useCountriesByCodes} from '../hooks/useCountries'
import {MdKeyboardBackspace} from 'react-icons/md'
import {slugify} from '../utils/slugify'
import type {Country} from '../types/types'
import styles from './CountryDetails.module.css'

export default function CountryDetails() {
  const {slug} = useParams({from: '/$slug'})
  const {data: countryData, error: countryError, isLoading: countryLoading} = useCountry(slug)

  const borderCodes = countryData?.[0]?.borders || []
  const {data: borderCountries} = useCountriesByCodes(borderCodes)

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
  if (!countryData || countryData.length === 0)
    return <p className={styles.error}>Country not found</p>

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
          <h1 className={styles.title}>{country.name.common}</h1>
          <div className={styles.infoGrid}>
            <div className={styles.infoColumn}>
              <h3 className={styles.sectionTitle}>Basic Information</h3>
              <p className={styles.infoItem}>
                Official name: <span>{country.name.official}</span>
              </p>
              <p className={styles.infoItem}>
                Native name:{' '}
                <span>
                  {Object.values(country.name.nativeName || {})[0]?.common || country.name.common}
                </span>
              </p>
              <p className={styles.infoItem}>
                Population: <span>{country.population.toLocaleString()}</span>
              </p>
              <p className={styles.infoItem}>
                Area: <span>{country.area ? `${country.area.toLocaleString()} km²` : 'N/A'}</span>
              </p>
              <p className={styles.infoItem}>
                Region: <span>{country.region}</span>
              </p>
              <p className={styles.infoItem}>
                Sub Region: <span>{country.subregion || 'N/A'}</span>
              </p>
              <p className={styles.infoItem}>
                Capital: <span>{country.capital?.join(', ') || 'N/A'}</span>
              </p>
              {country.latlng && (
                <p className={styles.infoItem}>
                  Coordinates: <span>{country.latlng[0]}°, {country.latlng[1]}°</span>
                </p>
              )}
              <p className={styles.infoItem}>
                Landlocked: <span>{country.landlocked ? 'Yes' : 'No'}</span>
              </p>
            </div>
            
            <div className={styles.infoColumn}>
              <h3 className={styles.sectionTitle}>Political & Administrative</h3>
              <p className={styles.infoItem}>
                UN Member: <span>{country.unMember ? 'Yes' : 'No'}</span>
              </p>
              <p className={styles.infoItem}>
                Independent: <span>{country.independent ? 'Yes' : 'No'}</span>
              </p>
              <p className={styles.infoItem}>
                Status: <span>{country.status || 'N/A'}</span>
              </p>
              {country.cca2 && (
                <p className={styles.infoItem}>
                  ISO Code (Alpha-2): <span>{country.cca2}</span>
                </p>
              )}
              {country.cca3 && (
                <p className={styles.infoItem}>
                  ISO Code (Alpha-3): <span>{country.cca3}</span>
                </p>
              )}
              {country.cioc && (
                <p className={styles.infoItem}>
                  Olympic Code: <span>{country.cioc}</span>
                </p>
              )}
              {country.fifa && (
                <p className={styles.infoItem}>
                  FIFA Code: <span>{country.fifa}</span>
                </p>
              )}
              <p className={styles.infoItem}>
                Top level domain: <span>{country.tld?.join(', ') || 'N/A'}</span>
              </p>
              {country.startOfWeek && (
                <p className={styles.infoItem}>
                  Start of week: <span>{country.startOfWeek}</span>
                </p>
              )}
            </div>
          </div>

          <div className={styles.additionalSections}>
            {country.currencies && Object.keys(country.currencies).length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Currencies</h3>
                <div className={styles.itemsList}>
                  {Object.entries(country.currencies).map(([code, currency]) => (
                    <span key={code} className={styles.badge}>
                      {currency.name} ({currency.symbol}) - {code}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {country.languages && Object.keys(country.languages).length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Languages</h3>
                <div className={styles.itemsList}>
                  {Object.entries(country.languages).map(([code, language]) => (
                    <span key={code} className={styles.badge}>
                      {language} ({code})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {country.timezones && country.timezones.length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Timezones</h3>
                <div className={styles.itemsList}>
                  {country.timezones.map((timezone, idx) => (
                    <span key={idx} className={styles.badge}>
                      {timezone}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {country.continents && country.continents.length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Continents</h3>
                <div className={styles.itemsList}>
                  {country.continents.map((continent, idx) => (
                    <span key={idx} className={styles.badge}>
                      {continent}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {country.demonyms && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Demonyms</h3>
                <div className={styles.itemsList}>
                  {Object.entries(country.demonyms).map(([lang, demonym]) => (
                    <span key={lang} className={styles.badge}>
                      {lang}: {demonym.m}/{demonym.f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {country.gini && Object.keys(country.gini).length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>GINI Index</h3>
                <div className={styles.itemsList}>
                  {Object.entries(country.gini).map(([year, value]) => (
                    <span key={year} className={styles.badge}>
                      {year}: {value}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {country.car && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Driving</h3>
                <div className={styles.itemsList}>
                  <span className={styles.badge}>
                    Side: {country.car.side}
                  </span>
                  {country.car.signs.map((sign, idx) => (
                    <span key={idx} className={styles.badge}>
                      Sign: {sign}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {country.idd && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>International Dialing</h3>
                <div className={styles.itemsList}>
                  <span className={styles.badge}>
                    {country.idd.root}{country.idd.suffixes.join('/')}
                  </span>
                </div>
              </div>
            )}

            {country.maps && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Maps</h3>
                <div className={styles.itemsList}>
                  {country.maps.googleMaps && (
                    <a href={country.maps.googleMaps} target="_blank" rel="noopener noreferrer" className={styles.mapLink}>
                      Google Maps
                    </a>
                  )}
                  {country.maps.openStreetMaps && (
                    <a href={country.maps.openStreetMaps} target="_blank" rel="noopener noreferrer" className={styles.mapLink}>
                      OpenStreetMap
                    </a>
                  )}
                </div>
              </div>
            )}

            {country.coatOfArms && (country.coatOfArms.png || country.coatOfArms.svg) && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Coat of Arms</h3>
                <img 
                  src={country.coatOfArms.png || country.coatOfArms.svg} 
                  alt={`Coat of arms of ${country.name.common}`}
                  className={styles.coatOfArms}
                />
              </div>
            )}
          </div>
          {borderCountries && borderCountries.length > 0 ? (
            <div className={styles.bordersContainer}>
              <p className={styles.bordersLabel}>Border Countries:</p>
              <div className={styles.bordersList}>
                {borderCountries.map((border: Country, idx: number) => (
                  <Link
                    to='/$slug'
                    params={{slug: slugify(border.name.official)}}
                    key={idx}
                    className={styles.borderButton}
                  >
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
