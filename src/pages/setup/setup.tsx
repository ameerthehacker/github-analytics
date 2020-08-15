import React, { useState, useEffect } from 'react';
import { Flex, useToast, Spinner } from '@chakra-ui/core';
import Helmet from 'react-helmet';
import SetupForm from '../../components/setup-form/setup-form';
import {
  SetupUserResponse,
  SetupUserRequest,
  GetUsernameResponse,
} from '../../api/contract';
import { useHistory, Redirect } from 'react-router-dom';
import { useHttp } from '../../hooks/use-http/use-http';
import { useAuth } from '../../hooks/use-auth/use-auth';

export default function Setup() {
  const [isProcessing, setProcessing] = useState(false);
  const toast = useToast();
  const history = useHistory();
  const http = useHttp();
  const [data, setData] = useState<GetUsernameResponse>();
  const { loginWithToken } = useAuth();
  const showErrorToast = () => {
    toast({
      title: 'OOPS!',
      description: 'Sorry, something went wrong. Try again.',
      isClosable: true,
      duration: 4000,
      status: 'error',
    });
  };

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
      <Helmet title="Setup" />
      {data && data.setupDone && <Redirect to="/login" />}
      {data && !data.setupDone ? (
        <SetupForm
          isProcessing={isProcessing}
          onSubmit={(result) => {
            setProcessing(true);

            http
              .post<SetupUserRequest, SetupUserResponse>({
                url: '/setup',
                body: result,
              })
              .then((response) => {
                if (response.error) {
                  setProcessing(false);

                  showErrorToast();
                } else if (response.token) {
                  loginWithToken(response.token);

                  history.push('/dashboard');
                }
              })
              .catch(() => {
                showErrorToast();
                setProcessing(false);
              });
          }}
        />
      ) : (
        <Spinner />
      )}
    </Flex>
  );
}
