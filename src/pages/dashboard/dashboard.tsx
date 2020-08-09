import React from 'react';
import { Box } from '@chakra-ui/core';
import Helmet from 'react-helmet';

export default function Dashboard() {
  return (
    <Box mt={60}>
      <Helmet title="Dashboard" />
      <h1>Dashboard</h1>
    </Box>
  );
}
