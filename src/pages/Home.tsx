import { Box, SimpleGrid, useCounter } from '@chakra-ui/react';
import * as React from 'react';
import CountryCard from '../components/CountryCard';
import Header from '../components/Header';
import { useGetAllCountries } from '../data/use-countries';
import { useCountryStore } from '../store/country-store';

export default function Home() {
  const { countries, error } = useGetAllCountries();
  const setCountryNames = useCountryStore((state) => state.setCountryNames);

  React.useEffect(() => {
    let arr: string[] = [];
    if (countries) {
      countries.forEach((country: any) => {
        arr.push(country.name);
      });
      setCountryNames(arr);
    }
  }, [countries]);

  if (error) return <p>error fetching data..</p>;
  if (!countries) return <p>loading...</p>;

  return (
    <Box>
      <Header />
      <SimpleGrid columns={4} spacing={16} mx="auto" w="100%" px="4em">
        {countries.map((country: any) => (
          <CountryCard country={country} key={country.name} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
