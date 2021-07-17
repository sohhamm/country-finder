import { Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { useGetAllCountries } from '../data/use-countries';

export default function Home() {
  const { countries, error } = useGetAllCountries();

  if (error) return 'error fetching data..';
  if (!countries) return 'loading...';

  console.log(countries);

  return (
    <Box>
      <Navbar />
      <Header />
      <SimpleGrid column={3} spacing={10}></SimpleGrid>
    </Box>
  );
}
