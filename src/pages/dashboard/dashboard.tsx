import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/core';
import Helmet from 'react-helmet';
import { useHttp } from '../../hooks/use-http/use-http';

export default function Dashboard() {
  const http = useHttp();

  useEffect(() => {
    http
      .get({
        url: '/quick-metrics',
        auth: true,
      })
      .then((response) => console.log(response));
  });

  return (
    <Box mt={60}>
      <Helmet title="Dashboard" />
      <h1>Dashboard</h1>
    </Box>
  );
}
