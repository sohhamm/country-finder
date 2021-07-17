import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function CountryCard({ country }: any) {
  return (
    <Link to={`/${country.name}`}>
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
          <Text
            fontWeight="bold"
            size="lg"
            mb="1em"
            fontFamily="Poppins, sans serif"
          >
            {country.name}
          </Text>

          <Text fontFamily="Poppins, sans serif">
            Population: {country.population}
          </Text>

          <Text fontFamily="Poppins, sans serif">Region: {country.region}</Text>

          <Text fontFamily="Poppins, sans serif">
            Capital: {country.capital}
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
}
