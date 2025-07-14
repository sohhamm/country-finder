import {useState, useEffect} from 'react'
import {FaMoon, FaSun} from 'react-icons/fa'
import {Link} from '@tanstack/react-router'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [isDark, setIsDark] = useState(false)
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [])
  
  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme', 'light')
    }
  }
  
  const SwitchIcon = isDark ? FaSun : FaMoon
  const colorMode = isDark ? 'light' : 'dark'
  
  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <h1 className={styles.heading}>
          🌏 Where in the world?
        </h1>
      </Link>
      <nav className={styles.navigation}>
        <Link to="/" className={styles.navLink}>
          Home
        </Link>
        <Link to="/rankings" className={styles.navLink}>
          Rankings
        </Link>
      </nav>
      <div className={styles.themeToggle}>
        <button
          className={styles.iconButton}
          aria-label={`Switch to ${colorMode} mode`}
          onClick={toggleTheme}
        >
          <SwitchIcon />
        </button>
      </div>
    </div>
  )
}