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

export default function Header() {
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
          rightIcon={<Icon as={HiChevronDown} boxSize={6} />}
          colorScheme="white"
          color="black"
          boxShadow="base"
        >
          Filter by region
        </MenuButton>
        <MenuList w="200px">
          <MenuItem>Africa</MenuItem>
          <MenuItem>America</MenuItem>
          <MenuItem>Asia</MenuItem>
          <MenuItem>Europe</MenuItem>
          <MenuItem>Oceania</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
