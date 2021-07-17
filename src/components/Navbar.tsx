import { Container, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { HiOutlineMoon } from 'react-icons/hi';

export default function Navbar() {
  return (
    <Flex
      justify="space-between"
      align="center"
      px="4em"
      py="2em"
      boxShadow="0px 0px 5px 0px gray"
    >
      <Heading size="md" fontWeight="bold">
        Where in the world?
      </Heading>
      <Flex align="center" justify="center">
        <Icon as={HiOutlineMoon} boxSize={6} />

        <Text ml={1} mt={1}>
          Dark Mode
        </Text>
      </Flex>
    </Flex>
  );
}
