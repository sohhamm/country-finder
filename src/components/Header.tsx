import {
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Button,
  InputRightElement,
  useMediaQuery,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { HiChevronDown } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { useCountryStore } from '../store/country-store';

export default function Header() {
  const setRegionFilter = useCountryStore((state) => state.setRegionFilter);
  const regionFilter = useCountryStore((state) => state.regionFilter);
  const searchTerm = useCountryStore((state) => state.searchTerm);
  const setSearchTerm = useCountryStore((state) => state.setSearchTerm);
  const [isMobile] = useMediaQuery('(max-width: 450px)');

  return (
    <Flex
      justify="space-between"
      py="2em"
      px={['1em', '3em', '4em']}
      direction={isMobile ? 'column' : 'row'}
    >
      <InputGroup w="25em" h="50px" mr={isMobile ? 8 : 1} rounded="md">
        <InputLeftElement h="50px">
          <Icon as={AiOutlineSearch} boxSize={6} />
        </InputLeftElement>
        <Input
          boxShadow="base"
          type="text"
          placeholder="Search for a country..."
          h="50px"
          mr={isMobile ? 8 : 1}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fontFamily="Poppins, sans serif"
        />
        {searchTerm ? (
          <InputRightElement h="50px" mr={isMobile ? 8 : 1}>
            <Icon as={MdClose} boxSize={6} onClick={() => setSearchTerm('')} />
          </InputRightElement>
        ) : null}
      </InputGroup>
      <Menu>
        <MenuButton
          as={Button}
          w="200px"
          rightIcon={
            !regionFilter ? (
              <Icon as={HiChevronDown} boxSize={6} />
            ) : (
              <Icon
                as={MdClose}
                boxSize={6}
                onClick={() => setRegionFilter(null)}
              />
            )
          }
          boxShadow="base"
          h="50px"
          mt={isMobile ? '2em' : ''}
          mb={isMobile ? '1em' : ''}
          fontFamily="Poppins, sans serif"
        >
          {!regionFilter ? 'Filter by region' : regionFilter}
        </MenuButton>
        <MenuList w="200px">
          <MenuItem onClick={() => setRegionFilter('Africa')}>Africa</MenuItem>
          <MenuItem onClick={() => setRegionFilter('Americas')}>
            America
          </MenuItem>
          <MenuItem onClick={() => setRegionFilter('Asia')}>Asia</MenuItem>
          <MenuItem onClick={() => setRegionFilter('Europe')}>Europe</MenuItem>
          <MenuItem onClick={() => setRegionFilter('Oceania')}>
            Oceania
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
