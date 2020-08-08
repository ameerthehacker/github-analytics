import React from 'react';
import { Box, Flex, Stack, useColorMode, IconButton, Image, Text } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import Logo from './logo.png';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box position="fixed" width="100%" borderBottomWidth="1px" top={0} px={2} py={2}>
      <Flex justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
          <Image src={Logo} />
          <Link to="/">
            <Text fontWeight="250" fontSize="2xl">GH Tracker</Text>
          </Link>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton onClick={() => toggleColorMode()} icon={colorMode === 'light'? 'moon': 'sun'} aria-label={`Switch to ${colorMode} mode`} />
          <IconButton icon={FaSignOutAlt} aria-label="logout" />
        </Stack>
      </Flex>
    </Box>
  )
}
