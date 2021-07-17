import {
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCountry } from '../data/use-country';
import { MdKeyboardBackspace } from 'react-icons/md';

export default function CountryDetails() {
  const { slug }: any = useParams();
  const { country, error } = useCountry(slug);
  const [isMobile] = useMediaQuery('(max-width: 441px)');

  if (error) return <p>'error fetching data..'</p>;
  if (!country) return <p>'loading...'</p>;

  console.log(country);

  if (isMobile)
    return (
      <Flex
        direction="column"
        align="center"
        w="100%"
        fontFamily="Poppins, sans serif"
        px="1em"
      >
        <Flex w="100%" my="2em">
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
        <Image src={country[0].flag} />
        <Heading mt={8} mb={6} w="100%">
          {country[0].name}
        </Heading>
        <Text mb={2} w="100%">
          Native name: {country[0].nativeName}
        </Text>
        <Text mb={2} w="100%">
          Population: {country[0].population}
        </Text>
        <Text mb={2} w="100%">
          Region: {country[0].region}
        </Text>

        <Text mb={2} w="100%">
          Sub Region: {country[0].subregion}
        </Text>
        <Text w="100%" mb={12}>
          Capital: {country[0].capital}
        </Text>
        <Text mb={2} w="100%">
          Top level domain: {country[0].topLevelDomain[0]}
        </Text>
        <Text mb={2} w="100%">
          Currencies:{` `}
          {country[0].currencies.map((el: any, idx: number) => (
            <span key={idx}>{el.name}</span>
          ))}
        </Text>
        <Text w="100%" mb={8}>
          Languages:{` `}
          {country[0].languages.map((el: any, idx: number) => (
            <span key={idx}>
              {el.name}
              {idx === country[0].languages.length - 1 ? '' : ', '}
            </span>
          ))}
        </Text>
        <Flex w="100%" mt={4} align="center" direction="column">
          <Text w="100%">Border Countries:</Text>
          <Flex px="1em" flexWrap="wrap">
            {country[0].borders.map((border: string, idx: number) => (
              <Button key={idx} ml={2}>
                {border}
              </Button>
            ))}
          </Flex>
        </Flex>
      </Flex>
    );

  return (
    <Flex
      direction="column"
      align="center"
      w="100%"
      fontFamily="Poppins, sans serif"
    >
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
      <Flex w="100%" justify="space-between" pl="4em" pr="3em">
        <Image src={country[0].flag} w="450px" h="350px" />
        <Flex direction="column" mr="2em">
          <Heading mt={8} mb={2}>
            {country[0].name}
          </Heading>
          <Flex direction="row" w="100%" mb={2}>
            <Flex direction="column" w="50%" mt={5} mr={16}>
              <Text mb={2}>Native name: {country[0].nativeName}</Text>
              <Text mb={2}>Population: {country[0].population}</Text>
              <Text mb={2}>Region: {country[0].region}</Text>

              <Text mb={2}>Sub Region: {country[0].subregion}</Text>
              <Text>Capital: {country[0].capital}</Text>
            </Flex>
            <Flex direction="column" w="50%" mt={5} pr={4}>
              <Text mb={2}>
                Top level domain: {country[0].topLevelDomain[0]}
              </Text>
              <Text mb={2}>
                Currencies:{` `}
                {country[0].currencies.map((el: any, idx: number) => (
                  <span key={idx}>{el.name}</span>
                ))}
              </Text>
              <Text>
                Languages:{` `}
                {country[0].languages.map((el: any, idx: number) => (
                  <span key={idx}>
                    {el.name}
                    {idx === country[0].languages.length - 1 ? '' : ', '}
                  </span>
                ))}
              </Text>
            </Flex>
          </Flex>
          <Flex w="100%" mt={4} align="center">
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
