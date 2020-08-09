import React from 'react';
import { Stack, Text, Image, Input, Button, FormControl, FormErrorMessage } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import helloImg from './hello.png';

interface LoginFormProps {
  username: string;
  onSubmit?: (result: LoginFormResult) => void;
}

interface LoginFormResult {
  password: string;
}

export default function LoginForm({ username, onSubmit }: LoginFormProps) {
  const { register, errors, handleSubmit } = useForm<LoginFormResult>();

  return (
    <Stack textAlign="center" spacing={5} width={[
      "100%",
      "50%",
      "40%",
      "20%"
    ]} px={5}>
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={3}>
        <Image src={helloImg} alt="hello" />
        <Text fontSize="5xl" fontWeight="150">{ username }</Text>
      </Stack>
      <form onSubmit={onSubmit && handleSubmit(onSubmit)}>
        <Stack spacing={5}>
          <FormControl isInvalid={!!errors.password}>
            <Input name="password" ref={register({ required: true })} borderRadius="25px" size="lg" placeholder="Password" type="password" />
            <FormErrorMessage>Password is required</FormErrorMessage>
          </FormControl>
          <Button type="submit" borderRadius="25px" size="lg" variantColor="purple">Login</Button>
        </Stack>
      </form>
    </Stack>
  )
}
