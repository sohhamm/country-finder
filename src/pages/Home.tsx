import { Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import CountryCard from '../components/CountryCard';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { useGetAllCountries } from '../data/use-countries';

export default function Home() {
  const { countries, error } = useGetAllCountries();

  if (error) return <p>'error fetching data..';</p>;
  if (!countries) return <p>'loading...';</p>;

  return (
    <Box>
      <Navbar />
      <Header />
      <SimpleGrid columns={4} spacing={16} mx="auto" w="100%" px="4em">
        {countries.map((country: any) => (
          <CountryCard country={country} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
