import React, { useState } from 'react';
import { Flex, useToast } from '@chakra-ui/core';
import Helmet from 'react-helmet';
import SetupForm from '../../components/setup-form/setup-form';
import { SetupUserResponse } from '../../api/contract';
import { useHistory } from 'react-router-dom';

export default function Setup() {
  const [isProcessing, setProcessing] = useState(false);
  const toast = useToast();
  const history = useHistory();
  const showErrorToast = () => {
    toast({
      title: 'OOPS!',
      description: 'Sorry, something went wrong. Try again.',
      isClosable: true,
      duration: 4000,
      status: 'error',
    });
  };

  return (
    <Flex
      height="100vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Helmet title="Setup" />
      <SetupForm
        isProcessing={isProcessing}
        onSubmit={(result) => {
          setProcessing(true);

          fetch('/api/setup', {
            method: 'POST',
            body: JSON.stringify(result),
            headers: {
              'content-type': 'application/json',
            },
          })
            .then((response: Response) => response.json())
            .then((response: SetupUserResponse) => {
              if (response.error) {
                showErrorToast();
              } else {
                history.push('/dashboard');
              }

              setProcessing(false);
            })
            .catch(() => {
              showErrorToast();
              setProcessing(false);
            });
        }}
      />
    </Flex>
  );
}
