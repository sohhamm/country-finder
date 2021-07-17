import { Button, Flex, Heading, Icon, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCountry } from '../data/use-country';
import { MdKeyboardBackspace } from 'react-icons/md';

export default function CountryDetails() {
  const { slug }: any = useParams();
  const { country, error } = useCountry(slug);

  if (error) return <p>'error fetching data..'</p>;
  if (!country) return <p>'loading...'</p>;

  console.log(country);
  return (
    <Flex direction="column" align="center" w="100%">
      <Flex w="100%" my="3em" px="4em">
        <Link to="/">
          <Button
            leftIcon={<Icon as={MdKeyboardBackspace} boxSize={6} />}
            boxShadow="base"
            w={32}
          >
            Back
          </Button>
        </Link>
      </Flex>
      <Flex w="100%" justify="space-around">
        <Image src={country[0].flag} w="400px" h="300px" />
        <Flex direction="column" w="50%">
          <Heading mt={6} mb={6}>
            {country[0].name}
          </Heading>
          <Flex justify="space-between" w="100%" mb={2}>
            <Text>Native name: {country[0].nativeName}</Text>
            <Text>Top level domain: {country[0].topLevelDomain[0]}</Text>
          </Flex>
          <Flex justify="space-between" w="100%" mb={2}>
            <Text>Population: {country[0].population}</Text>
            <Text>
              Currencies:{` `}
              {country[0].currencies.map((el: any, idx: number) => (
                <span key={idx}>{el.name}</span>
              ))}
            </Text>
          </Flex>

          <Flex justify="space-between" w="100%" mb={2}>
            <Text>Region: {country[0].region}</Text>
            <Text>
              Languages:{` `}
              {country[0].languages.map((el: any, idx: number) => (
                <span key={idx}>{el.name},</span>
              ))}
            </Text>
          </Flex>

          <Flex w="100%" mb={2}>
            <Text>Sub Region: {country[0].subregion}</Text>
          </Flex>
          <Flex w="100%" mb={2}>
            <Text>Capital: {country[0].capital}</Text>
          </Flex>
          <Flex w="100%" mb={2} align="center">
            Border Countries:{' '}
            {country[0].borders.map((border: string, idx: number) => (
              <Button key={idx} ml={2}>
                {border}
              </Button>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}