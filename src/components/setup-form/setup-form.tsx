import React from 'react';
import {
  Stack,
  Text,
  Input,
  Button,
  Image,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/core';
import rocketImg from './rocket.png';
import { useForm } from 'react-hook-form';

interface SetupFormResult {
  fullName: string;
  password: string;
}

interface SetupFormProps {
  isProcessing?: boolean;
  onSubmit?: (result: SetupFormResult) => void;
}

interface SetupFormFields extends SetupFormResult {
  retypePassword: string;
}

export default function SetupForm({ isProcessing, onSubmit }: SetupFormProps) {
  const { register, handleSubmit, errors, watch } = useForm<SetupFormFields>({
    defaultValues:
      process.env.NODE_ENV === 'development'
        ? {
            fullName: 'Ameer Jhan',
            password: 'supersecret',
            retypePassword: 'supersecret',
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
        <Image src={rocketImg} alt="rocket image" />
        <Text fontSize="4xl" fontWeight="150">
          Let us set you up
        </Text>
      </Stack>
      <form
        onSubmit={
          onSubmit &&
          handleSubmit(({ fullName, password }) =>
            onSubmit({
              fullName,
              password,
            })
          )
        }
      >
        <Stack spacing={5}>
          <FormControl isInvalid={!!errors.fullName}>
            <Input
              name="fullName"
              ref={register({ required: true })}
              borderRadius="25px"
              size="lg"
              placeholder="Your full name e.g. Ameer Jhan"
            />
            <FormErrorMessage>Full name is required</FormErrorMessage>
          </FormControl>
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
          <FormControl isInvalid={!!errors.retypePassword}>
            <Input
              name="retypePassword"
              ref={register({
                required: { value: true, message: 'This field is required' },
                validate: (value: string) => {
                  const password = watch('password');

                  if (password !== value) return 'Mismatch in passwords';
                },
              })}
              borderRadius="25px"
              size="lg"
              placeholder="Retype password"
              type="password"
            />
            <FormErrorMessage>
              {errors.retypePassword?.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            isLoading={isProcessing}
            loadingText="Wingardium Leviosa"
            borderRadius="25px"
            size="lg"
            variantColor="purple"
          >
            Setup
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
