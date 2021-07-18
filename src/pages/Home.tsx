import { Box, SimpleGrid } from '@chakra-ui/react';
import * as React from 'react';
import CountryCard from '../components/CountryCard';
import Header from '../components/Header';
import { useGetAllCountries } from '../data/use-countries';
import { useCountryStore } from '../store/country-store';

export default function Home() {
  const { countries, error } = useGetAllCountries();
  const setCountryNames = useCountryStore((state) => state.setCountryNames);
  const regionFilter = useCountryStore((state) => state.regionFilter);
  const searchTerm = useCountryStore((state) => state.searchTerm);

  React.useEffect(() => {
    let arr: any[] = [];
    if (countries) {
      countries.forEach((country: any) => {
        const { alpha3Code, name } = country;
        const obj: any = {};
        obj[alpha3Code] = name;
        arr.push(obj);
      });
      setCountryNames(arr);
    }
  }, [countries]);

  if (error) return <p>error fetching data..</p>;
  if (!countries) return <p>loading...</p>;

  return (
    <Box>
      <Header />
      <SimpleGrid
        columns={{ sm: 1, md: 3, lg: 4 }}
        spacing={16}
        mx="auto"
        w="100%"
        px={['2em', '3em', '4em']}
      >
        {countries
          .filter((country: any) => {
            if (regionFilter) {
              console.log(country.region);
              return country.region === regionFilter;
            } else {
              return true;
            }
          })
          .filter((country: any) =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((country: any) => (
            <CountryCard country={country} key={country.name} />
          ))}
      </SimpleGrid>
    </Box>
  );
}
