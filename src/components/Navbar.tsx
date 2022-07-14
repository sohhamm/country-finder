import {
  Flex,
  Heading,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import {FaMoon, FaSun} from 'react-icons/fa'

export default function Navbar() {
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const colorMode = useColorModeValue('dark', 'light')
  const {toggleColorMode: toggleMode} = useColorMode()
  return (
    <Flex
      justify="space-between"
      align="center"
      px={['1em', '3em', '4em']}
      py="1.5em"
      boxShadow="0px 0px 5px 0px gray"
    >
      <Heading size="md" fontWeight="bold">
        Where in the world?
      </Heading>
      <Flex align="center" justify="center">
        <IconButton
          size="md"
          fontSize="lg"
          aria-label={`Switch to ${colorMode} mode`}
          variant="ghost"
          color="current"
          ml={{base: '0', md: '3'}}
          onClick={toggleMode}
          icon={<SwitchIcon />}
        />
      </Flex>
    </Flex>
  )
}
