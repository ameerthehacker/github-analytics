import React from 'react';
import { Flex, Spinner } from '@chakra-ui/core';
import useSwr from 'swr';
import LoginForm from '../../components/login-form/login-form';

export default function Login() {
  const { data } = useSwr('/api/username');

  return (
    <Flex height="100vh" width="100%" alignItems="center" justifyContent="center">
      {data? <LoginForm username={data.username} />: <Spinner />}
    </Flex>
  );
}
