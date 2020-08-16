import React from 'react';
import { FaFrown } from 'react-icons/fa';
import { Box, Stack, Text, Button } from '@chakra-ui/core';
import Helmet from 'react-helmet';
import { useHistory } from 'react-router-dom';

export default function Error404() {
  const history = useHistory();

  return (
    <Stack height="100vh" justifyContent="center" alignItems="center">
      <Helmet title="404" />
      <Box as={FaFrown} size="xs" />
      <Text fontSize="3xl" fontWeight="light">
        ¯\_(ツ)_/¯ We could not find that
      </Text>
      <Button
        mt={2}
        size="lg"
        onClick={() => history.push('/dashboard')}
        variantColor="purple"
        borderRadius="25px"
      >
        Go Home
      </Button>
    </Stack>
  );
}
