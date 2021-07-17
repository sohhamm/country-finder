import { Flex, Heading, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { HiOutlineMoon } from 'react-icons/hi';

export default function Navbar() {
  return (
    <Flex justify='space-between'>
      <Heading as="h1">Where in the world?</Heading>
      <Flex>
        <Icon as={HiOutlineMoon} />
        <Text> Dark Mode</Text>
      </Flex>
    </Flex>
  );
}
