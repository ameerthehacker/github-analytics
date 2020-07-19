import React from 'react';
import { Text, Flex, Input, Button, Stack, Spinner } from '@chakra-ui/core';
import useSwr from 'swr';

export default function Login() {
  const { data } = useSwr('/api/username');

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <>
        {!data && <Spinner />}
        {data && (
          <Stack textAlign="center">
            <Text fontSize="4xl" fontWeight="light">Yo { data.username }!</Text>
            <Input placeholder="password" type="password" />
            <Button variant="outline" variantColor="pink">Login</Button>
          </Stack>
        )}
      </>
    </Flex>
  );
}
