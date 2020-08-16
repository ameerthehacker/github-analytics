import React from 'react';
import { FaCarCrash } from 'react-icons/fa';
import { Box, Stack, Text, Button } from '@chakra-ui/core';

export default function Error500() {
  return (
    <Stack alignItems="center">
      <Box as={FaCarCrash} size="md" />
      <Text fontSize="3xl" fontWeight="light">
        (｡•́︿•̀｡) Something crahed!
      </Text>
      <Button
        mt={2}
        size="lg"
        onClick={() => window.location.reload()}
        variantColor="purple"
        borderRadius="25px"
      >
        Reload
      </Button>
    </Stack>
  );
}
