import React, { useState, useEffect } from 'react';
import { Flex, Spinner, useToast } from '@chakra-ui/core';
import LoginForm from '../../components/login-form/login-form';
import Helmet from 'react-helmet';
import { Redirect, useHistory } from 'react-router-dom';
import { GetUsernameResponse } from '../../api/contract';
import { useHttp } from '../../hooks/use-http/use-http';
import { useAuth } from '../../hooks/use-auth/use-auth';
import Error500 from '../../components/error500/error500';

export default function Login() {
  const [data, setData] = useState<GetUsernameResponse>();
  const http = useHttp();
  const history = useHistory();
  const getFirstName = (fullName: string) => fullName.split(' ')[0];
  const { isLoggedIn, loginWithPassword } = useAuth();
  const toast = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
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
    if (!isLoggedIn) {
      http
        .get<GetUsernameResponse>({ url: '/username' })
        .then(setData)
        .catch(() => {
          setData({
            error: true,
          });
        });
    } else {
      history.push('/dashboard');
    }
  }, [http, history, isLoggedIn]);

  return (
    <Flex
      height="100vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Helmet title="Login" />
      {data?.error && <Error500 />}
      {data && !data.error && !data.setupDone && <Redirect to="/setup" />}
      {data && data.username ? (
        <LoginForm
          isProcessing={isProcessing}
          onSubmit={(result, resetForm) => {
            setIsProcessing(true);

            loginWithPassword(result.password)
              .then((response) => {
                if (response.isAuthenticated) {
                  history.push('/dashboard');
                } else if (!response.isAuthenticated && !response.error) {
                  toast({
                    title: 'Sorry!',
                    description: 'Invalid password',
                    status: 'error',
                    variant: 'left-accent',
                    isClosable: true,
                  });

                  resetForm();
                  setIsProcessing(false);
                } else if (response.error) {
                  showErrorToast();
                  setIsProcessing(false);
                }
              })
              .catch(() => {
                showErrorToast();
              });
          }}
          username={getFirstName(data.username)}
        />
      ) : (
        !data?.error && <Spinner />
      )}
    </Flex>
  );
}
