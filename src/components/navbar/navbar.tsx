import React from 'react';
import { Box, Flex, Stack, useColorMode, IconButton, Link as CLink } from '@chakra-ui/core';
import { FaSignOutAlt, FaGithub } from 'react-icons/fa';
import Brand from './components/brand/brand';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box position="fixed" width="100%" borderBottomWidth="1px" top={0} px={2} py={2}>
      <Flex justifyContent="space-between" alignItems="center">
        <Brand />
        <Stack direction="row" spacing={2} alignItems="center">
          <Box 
            size="8" as={FaGithub} 
            cursor="pointer" 
            onClick={() => window.open('https://github.com/ameerthehacker/github-analytics')} 
          />
          <IconButton onClick={() => toggleColorMode()} icon={colorMode === 'light'? 'moon': 'sun'} aria-label={`Switch to ${colorMode} mode`} />
          <IconButton icon={FaSignOutAlt} aria-label="logout" />
        </Stack>
      </Flex>
    </Box>
  )
}
