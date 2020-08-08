import React from 'react';
import { Stack, Text, Image, Input, Button } from '@chakra-ui/core';
import hello from './hello.png';

interface LoginFormProps {
  username: string;
}

export default function LoginForm({ username }: LoginFormProps) {
  return (
    <Stack textAlign="center" spacing={5} width={[
      "100%",
      "50%",
      "40%",
      "20%"
    ]} px={5}>
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={3}>
        <Image src={hello} alt="hello" />
        <Text fontSize="5xl" fontWeight="150">{ username }</Text>
      </Stack>
      <Input borderRadius="25px" size="lg" placeholder="password" type="password" />
      <Button borderRadius="25px" size="lg" variantColor="purple">Login</Button>
    </Stack>
  )
}
