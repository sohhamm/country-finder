import { Container, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { HiOutlineMoon } from 'react-icons/hi';

export default function Navbar() {
  return (
    <Flex justify="space-between" px="4em" boxShadow="0px 0px 5px 0px gray">
      <Heading size="md">Where in the world?</Heading>
      <Flex align="center">
        <Container>
          <Icon as={HiOutlineMoon} boxSize={20} />
        </Container>
        <Text ml={4}>Dark Mode</Text>
      </Flex>
    </Flex>
  );
}
