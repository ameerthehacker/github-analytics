import React from 'react';
import { Stack, Text, Input, Button, Image } from '@chakra-ui/core';
import rocketImg from './rocket.png';

export default function SetupForm() {
  return (
    <Stack textAlign="center" spacing={5} width={[
      "100%",
      "50%",
      "40%",
      "20%"
    ]} px={5}>
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={3}>
        <Image src={rocketImg} alt="rocket image" />
        <Text fontSize="5xl" fontWeight="150">Let us set you up</Text>
      </Stack>
      <Input borderRadius="25px" size="lg" placeholder="Your full name e.g. Ameer Jhan" />
      <Input borderRadius="25px" size="lg" placeholder="Password" type="password" />
      <Input borderRadius="25px" size="lg" placeholder="Retype password" type="password" />
      <Button borderRadius="25px" size="lg" variantColor="purple">Setup</Button>
    </Stack>
  )
}
