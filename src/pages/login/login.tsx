import React from 'react';
import { Flex, Spinner } from '@chakra-ui/core';
import useSwr from 'swr';
import LoginForm from '../../components/login-form/login-form';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { GetUsernameResponse } from '../../api/contract';

export default function Login() {
  const { data } = useSwr<GetUsernameResponse>('/api/username');
  const getFirstName = (fullName: string) => fullName.split(' ')[0];

  return (
    <Flex
      height="100vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Helmet title="Login" />
      {data && !data.setupDone && <Redirect to="/setup" />}
      {data && data.username ? (
        <LoginForm
          onSubmit={(r) => console.log(r)}
          username={getFirstName(data.username)}
        />
      ) : (
        <Spinner />
      )}
    </Flex>
  );
}
