import {Flex, Image, Text} from '@chakra-ui/react'
import React from 'react'
import {Link} from 'react-router-dom'

export default function CountryCard({country}: any) {
  return (
    <Link to={`/${country.name.official}`}>
      <Flex
        direction="column"
        justify="center"
        align="center"
        rounded="md"
        boxShadow="base"
      >
        <Image
          src={country.flags.png}
          w="100%"
          h="170px"
          roundedTop="md"
          objectFit="cover"
          loading="lazy"
        />
        <Flex direction="column" w="100%" px="1.5em" py="1.5em">
          <Text fontWeight="bold" size="lg" mb="1em">
            {country.name.official}
          </Text>

          <Text>Population: {country.population}</Text>

          <Text>Region: {country.region}</Text>

          <Text>Capital: {country.capital}</Text>
        </Flex>
      </Flex>
    </Link>
  )
}
