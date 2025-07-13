import {Link} from '@tanstack/react-router'
import styles from './CountryCard.module.css'

export default function CountryCard({country}: any) {
  return (
    <Link to={`/${country.name.official}`} className={styles.card}>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.official}`}
        className={styles.flagImage}
        loading="lazy"
      />
      <div className={styles.content}>
        <h3 className={styles.title}>
          {country.name.official}
        </h3>
        <p className={styles.info}>
          Population: <span>{country.population.toLocaleString()}</span>
        </p>
        <p className={styles.info}>
          Region: <span>{country.region}</span>
        </p>
        <p className={styles.info}>
          Capital: <span>{country.capital}</span>
        </p>
      </div>
    </Link>
  )
}