import React from 'react';
import {
  Stack,
  Text,
  Image,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import helloImg from './hello.png';

interface LoginFormProps {
  username: string;
  isProcessing?: boolean;
  onSubmit?: (result: LoginFormResult, reset: () => void) => void;
}

interface LoginFormResult {
  password: string;
}

export default function LoginForm({
  username,
  onSubmit,
  isProcessing,
}: LoginFormProps) {
  const { register, errors, handleSubmit, reset } = useForm<LoginFormResult>({
    defaultValues:
      process.env.NODE_ENV === 'development'
        ? {
            password: 'supersecret',
          }
        : {},
  });

  return (
    <Stack
      textAlign="center"
      spacing={5}
      width={['100%', '50%', '40%', '20%']}
      px={5}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={3}
      >
        <Image src={helloImg} alt="hello" />
        <Text fontSize="5xl" fontWeight="150">
          {username}
        </Text>
      </Stack>
      <form
        onSubmit={onSubmit && handleSubmit((result) => onSubmit(result, reset))}
      >
        <Stack spacing={5}>
          <FormControl isInvalid={!!errors.password}>
            <Input
              name="password"
              ref={register({ required: true })}
              borderRadius="25px"
              size="lg"
              placeholder="Password"
              type="password"
            />
            <FormErrorMessage>Password is required</FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            borderRadius="25px"
            size="lg"
            variantColor="purple"
            isLoading={isProcessing}
            loadingText="Checking..."
          >
            Login
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
