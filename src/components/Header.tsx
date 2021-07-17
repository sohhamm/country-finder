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
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { HiChevronDown } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { useCountryStore } from '../store/country-store';

export default function Header() {
  const setRegionFilter = useCountryStore((state) => state.setRegionFilter);
  const regionFilter = useCountryStore((state) => state.regionFilter);

  return (
    <Flex justify="space-between" py="2em" px="4em">
      <InputGroup w="400px" h="50px" boxShadow="base">
        <InputLeftElement h="50px">
          <Icon as={AiOutlineSearch} boxSize={6} />
        </InputLeftElement>
        <Input type="text" placeholder="Search for a country..." h="50px" />
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
          colorScheme="white"
          color="black"
          boxShadow="base"
          h="50px"
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
