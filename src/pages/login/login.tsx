import React from 'react';
import { Text, Flex, Input, Button, Image, Stack, Spinner } from '@chakra-ui/core';
import useSwr from 'swr';
import hello from './hello.png';

export default function Login() {
  const { data } = useSwr('/api/username');

  return (
    <Flex height="100vh" width="100%" alignItems="center" justifyContent="center">
      <>
        {!data && <Spinner />}
        {data && (
          <Stack textAlign="center" spacing={5} width={[
            "100%",
            "50%",
            "40%",
            "20%"
          ]} px={5}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={3}>
              <Image src={hello} alt="hello" />
              <Text fontSize="5xl" fontWeight="150">{ data.username }</Text>
            </Stack>
            <Input borderRadius="25px" size="lg" placeholder="password" type="password" />
            <Button borderRadius="25px" size="lg" variantColor="purple">Login</Button>
          </Stack>
        )}
      </>
    </Flex>
  );
}
