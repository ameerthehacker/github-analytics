import React, { useState, useEffect } from 'react';
import { Flex, Spinner } from '@chakra-ui/core';
import LoginForm from '../../components/login-form/login-form';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { GetUsernameResponse } from '../../api/contract';
import { useHttp } from '../../hooks/use-http/use-http';

export default function Login() {
  const [data, setData] = useState<GetUsernameResponse>();
  const http = useHttp();
  const getFirstName = (fullName: string) => fullName.split(' ')[0];

  useEffect(() => {
    http
      .get<GetUsernameResponse>({ url: '/username' })
      .then(setData);
  }, [http]);

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
