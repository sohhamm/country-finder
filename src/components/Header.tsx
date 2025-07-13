import {Menu} from '@ark-ui/react/menu'
import {AiOutlineSearch} from 'react-icons/ai'
import {HiChevronDown} from 'react-icons/hi'
import {MdClose} from 'react-icons/md'
import {useCountryStore} from '../store/country'
import styles from './Header.module.css'

export default function Header() {
  const setRegionFilter = useCountryStore((state: any) => state.setRegionFilter)
  const regionFilter = useCountryStore((state: any) => state.regionFilter)
  const searchTerm = useCountryStore((state: any) => state.searchTerm)
  const setSearchTerm = useCountryStore((state: any) => state.setSearchTerm)

  return (
    <div className={styles.header}>
      <div className={styles.searchContainer}>
        <AiOutlineSearch className={styles.searchIcon} />
        <input
          type='text'
          placeholder='Search for a country...'
          className={`${styles.searchInput} ${searchTerm ? styles.hasValue : ''}`}
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <MdClose
            className={styles.clearIcon}
            onClick={() => setSearchTerm('')}
          />
        )}
      </div>
      <div className={styles.filterContainer}>
        <Menu.Root onSelect={details => setRegionFilter(details.value)}>
          <Menu.Trigger asChild>
            <button className={styles.filterButton}>
              {!regionFilter ? 'Filter by region' : regionFilter}
              <Menu.Indicator>
                <HiChevronDown className={styles.chevronIcon} />
              </Menu.Indicator>
            </button>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content className={styles.menuContent}>
              <Menu.Item value='Africa' className={styles.menuItem}>
                Africa
              </Menu.Item>
              <Menu.Item value='Americas' className={styles.menuItem}>
                Americas
              </Menu.Item>
              <Menu.Item value='Asia' className={styles.menuItem}>
                Asia
              </Menu.Item>
              <Menu.Item value='Europe' className={styles.menuItem}>
                Europe
              </Menu.Item>
              <Menu.Item value='Oceania' className={styles.menuItem}>
                Oceania
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
        {regionFilter && (
          <MdClose
            className={styles.clearFilterIcon}
            onClick={(e) => {
              e.stopPropagation()
              setRegionFilter(null)
            }}
          />
        )}
      </div>
    </div>
  )
}