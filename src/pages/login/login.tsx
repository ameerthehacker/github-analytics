import React from 'react';
import { Text, Flex, Input, Button, Stack } from '@chakra-ui/core';

export default function Login() {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Stack textAlign="center">
        <Text fontSize="4xl" fontWeight="light">Yo Ameer!</Text>
        <Input placeholder="password" type="password" />
        <Button variant="outline" variantColor="pink">Login</Button>
      </Stack>
    </Flex>
  );
}
