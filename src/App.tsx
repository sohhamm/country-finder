import './App.css'
import CountryDetails from './pages/CountryDetails'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<CountryDetails />} />
      </Routes>
    </>
  )
}
