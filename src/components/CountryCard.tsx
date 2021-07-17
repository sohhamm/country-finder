import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

export default function CountryCard({ country }: any) {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      rounded="md"
      boxShadow="base"
    >
      <Image
        src={country.flag}
        w="100%"
        h="170px"
        roundedTop="md"
        objectFit="cover"
      />
      <Flex direction="column" w="100%" px="1.5em" py="1.5em">
        <Text fontWeight="bold" size="lg" mb="1em">
          {country.name}
        </Text>

        <Text>Population: {country.population}</Text>

        <Text>Region: {country.region}</Text>

        <Text>Capital: {country.capital}</Text>
      </Flex>
    </Flex>
  );
}
