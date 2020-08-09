import React from 'react';
import { Stack, Image, Text } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import Logo from './logo.png';

export default function Brand() {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Image src={Logo} />
      <Link to="/">
        <Text fontWeight="250" fontSize="2xl">
          GH Analytics
        </Text>
      </Link>
    </Stack>
  );
}
