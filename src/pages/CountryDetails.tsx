import {
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {useCountry} from '../data/use-country'
import {MdKeyboardBackspace} from 'react-icons/md'
import {useCountryStore} from '../store/country'

export default function CountryDetails() {
  const [borders, setBorders] = React.useState<any>([])
  const {slug}: any = useParams()
  const {country, error} = useCountry(slug)
  const [isMobile] = useMediaQuery('(max-width: 441px)')
  const borderCountries = useCountryStore(state => state.borderCountries)

  React.useEffect(() => {
    if (country) {
      const filter = borderCountries.filter((c: any) =>
        country[0].borders.includes(c.code),
      )
      setBorders(filter)
    }
  }, [country, setBorders])

  if (error)
    return (
      <p>
        error fetching data
        <Button onClick={() => location.reload()}> Refresh </Button>
      </p>
    )

  if (!country) return <p>loading...</p>

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
        <Heading mt={8} mb={6} w="100%" fontFamily="Poppins, sans serif">
          {country[0].name}
        </Heading>
        <Text mb={2} w="100%" fontFamily="Poppins, sans serif">
          Native name: {country[0].nativeName}
        </Text>
        <Text mb={2} w="100%" fontFamily="Poppins, sans serif">
          Population: {country[0].population}
        </Text>
        <Text mb={2} w="100%" fontFamily="Poppins, sans serif">
          Region: {country[0].region}
        </Text>

        <Text mb={2} w="100%" fontFamily="Poppins, sans serif">
          Sub Region: {country[0].subregion}
        </Text>
        <Text w="100%" mb={12} fontFamily="Poppins, sans serif">
          Capital: {country[0].capital}
        </Text>
        <Text mb={2} w="100%" fontFamily="Poppins, sans serif">
          Top level domain: {country[0].topLevelDomain[0]}
        </Text>
        <Text mb={2} w="100%" fontFamily="Poppins, sans serif">
          Currencies:{` `}
          {country[0].currencies.map((el: any, idx: number) => (
            <span key={idx}>{el.name}</span>
          ))}
        </Text>
        <Text w="100%" mb={8} fontFamily="Poppins, sans serif">
          Languages:{` `}
          {country[0].languages.map((el: any, idx: number) => (
            <span key={idx}>
              {el.name}
              {idx === country[0].languages.length - 1 ? '' : ', '}
            </span>
          ))}
        </Text>
        <Flex w="100%" mt={4} align="center" direction="column">
          <Text w="100%" fontFamily="Poppins, sans serif">
            Border Countries:
          </Text>
          <Flex px="1em" flexWrap="wrap">
            {borders.map(
              (border: {name: string; code: string}, idx: number) => (
                <Link to={`/${border.name}`} key={idx}>
                  <Button
                    key={idx}
                    ml={2}
                    fontFamily="Poppins, sans serif"
                    mb={2}
                  >
                    {border.name}
                  </Button>
                </Link>
              ),
            )}
          </Flex>
        </Flex>
      </Flex>
    )

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
            fontFamily="Poppins, sans serif"
          >
            Back
          </Button>
        </Link>
      </Flex>
      <Flex w="100%" justify="space-between" pl="4em" pr="3em">
        <Image src={country[0].flag} w="450px" h="350px" />
        <Flex
          direction="column"
          mr="2em"
          ml={country[0].borders?.length > 5 ? '8em' : ''}
        >
          <Heading mt={8} mb={2} fontFamily="Poppins, sans serif">
            {country[0].name}
          </Heading>
          <Flex direction="row" w="100%" mb={2}>
            <Flex direction="column" w="50%" mt={5} mr={16}>
              <Text mb={2} fontFamily="Poppins, sans serif">
                Native name: {country[0].nativeName}
              </Text>
              <Text mb={2} fontFamily="Poppins, sans serif">
                Population: {country[0].population}
              </Text>
              <Text mb={2} fontFamily="Poppins, sans serif">
                Region: {country[0].region}
              </Text>

              <Text mb={2} fontFamily="Poppins, sans serif">
                Sub Region: {country[0].subregion}
              </Text>
              <Text fontFamily="Poppins, sans serif">
                Capital: {country[0].capital}
              </Text>
            </Flex>
            <Flex direction="column" w="50%" mt={5} pr={4}>
              <Text mb={2} fontFamily="Poppins, sans serif">
                Top level domain: {country[0].topLevelDomain[0]}
              </Text>
              <Text mb={2} fontFamily="Poppins, sans serif">
                Currencies:{` `}
                {country[0].currencies.map((el: any, idx: number) => (
                  <span key={idx}>{el.name}</span>
                ))}
              </Text>
              <Text fontFamily="Poppins, sans serif">
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
          {country[0].borders?.length ? (
            <Flex w="100%" mt={4} align="center">
              <Text fontWeight="semibold">Border Countries: </Text>
              <Flex flexWrap="wrap">
                {borders.map(
                  (border: {name: string; code: string}, idx: number) => (
                    <Link to={`/${border.name}`} key={idx}>
                      <Button
                        ml={2}
                        fontFamily="Poppins, sans serif"
                        fontWeight="normal"
                        mb={2}
                      >
                        {border.name}
                      </Button>
                    </Link>
                  ),
                )}
              </Flex>
            </Flex>
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  )
}
