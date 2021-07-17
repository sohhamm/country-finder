import { Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <Box>
      <Navbar />
      <Header />
      <SimpleGrid column={3} spacing={10}></SimpleGrid>
    </Box>
  );
}
