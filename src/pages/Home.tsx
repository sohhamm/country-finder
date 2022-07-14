import * as React from 'react'
import CountryCard from '../components/CountryCard'
import Header from '../components/Header'
import {useGetAllCountries} from '../data/use-countries'
import {useCountryStore} from '../store/country'
import {Box, SimpleGrid} from '@chakra-ui/react'

export default function Home() {
  const {countries, error} = useGetAllCountries()
  const regionFilter = useCountryStore(state => state.regionFilter)
  const searchTerm = useCountryStore(state => state.searchTerm)
  const setBorderCountries = useCountryStore(state => state.setBorderCountries)

  React.useEffect(() => {
    if (countries) {
      const arr: any = []
      countries.forEach((country: any) => {
        arr.push({name: country.name.official, code: country.alpha3Code})
      })
      setBorderCountries(arr)
    }
  }, [countries])

  if (error) return <p>error fetching data..</p>
  if (!countries) return <p>loading...</p>

  return (
    <Box>
      <Header />
      <SimpleGrid
        columns={{sm: 1, md: 3, lg: 4}}
        spacing={16}
        mx="auto"
        w="100%"
        px={['2em', '3em', '4em']}
      >
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
      </SimpleGrid>
    </Box>
  )
}
