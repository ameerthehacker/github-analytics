import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <Box height="50px" position="fixed" width="100%" borderBottomWidth="1px" top={0} py={3} px={2}>
      <Flex justifyContent="flex-end">
        <Link to="/login">Logout</Link>
      </Flex>
    </Box>
  )
}
