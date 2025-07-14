import * as React from 'react'
import {Menu} from '@ark-ui/react/menu'
import {useNavigate, useSearch} from '@tanstack/react-router'
import {AiOutlineSearch} from 'react-icons/ai'
import {HiChevronDown} from 'react-icons/hi'
import {MdClose} from 'react-icons/md'
import styles from './Header.module.css'

export default function Header() {
  const navigate = useNavigate({from: '/'})
  const search = useSearch({from: '/'})
  const searchTerm = search.search || ''
  const regionFilter = search.region
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (searchTerm && inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleRegionSelect = (region: string) => {
    navigate({
      search: {
        ...search,
        region: region,
      },
    })
  }

  const clearRegionFilter = () => {
    navigate({
      search: {
        ...search,
        region: undefined,
      },
    })
  }

  const handleSearchChange = (value: string) => {
    navigate({
      search: {
        ...search,
        search: value || undefined,
      },
    })
  }

  return (
    <div className={styles.header}>
      <div className={styles.searchContainer}>
        <AiOutlineSearch className={styles.searchIcon} />
        <input
          ref={inputRef}
          type='text'
          placeholder='Search for a country...'
          className={`${styles.searchInput} ${searchTerm ? styles.hasValue : ''}`}
          value={searchTerm}
          onChange={(e: any) => handleSearchChange(e.target.value)}
        />
        {searchTerm && (
          <MdClose
            className={styles.clearIcon}
            onClick={() => handleSearchChange('')}
          />
        )}
      </div>
      <div className={styles.filterContainer}>
        <Menu.Root onSelect={details => handleRegionSelect(details.value)}>
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
              clearRegionFilter()
            }}
          />
        )}
      </div>
    </div>
  )
}