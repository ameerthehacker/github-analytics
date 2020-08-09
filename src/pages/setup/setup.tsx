import React from 'react';
import { Flex } from '@chakra-ui/core';
import Helmet from 'react-helmet';
import SetupForm from '../../components/setup-form/setup-form';

export default function Setup() {
  return (
    <Flex height="100vh" width="100%" alignItems="center" justifyContent="center">
      <Helmet title="Setup" />
      <SetupForm onSubmit={(r) => console.log(r)} />
    </Flex>
  );
}
