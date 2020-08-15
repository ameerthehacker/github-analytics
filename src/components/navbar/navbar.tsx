import React from 'react';
import {
  Box,
  Flex,
  Stack,
  useColorMode,
  IconButton,
  Tooltip,
} from '@chakra-ui/core';
import { FaSignOutAlt, FaGithub, FaSignInAlt } from 'react-icons/fa';
import Brand from './components/brand/brand';
import { useAuth } from '../../hooks/use-auth/use-auth';
import { useHistory } from 'react-router-dom';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isLoggedIn, logout } = useAuth();
  const history = useHistory();

  return (
    <Box
      position="fixed"
      width="100%"
      borderBottomWidth="1px"
      top={0}
      px={2}
      py={2}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Brand />
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            size="8"
            as={FaGithub}
            cursor="pointer"
            onClick={() =>
              window.open('https://github.com/ameerthehacker/github-analytics')
            }
          />
          <Box>
            <Tooltip
              aria-label={`Switch to ${colorMode} mode`}
              label={colorMode === 'light' ? 'nox' : 'lumos'}
              placement="bottom"
            >
              <IconButton
                onClick={() => toggleColorMode()}
                icon={colorMode === 'light' ? 'moon' : 'sun'}
                aria-label={`Switch to ${colorMode} mode`}
              />
            </Tooltip>
          </Box>
          <Box>
            {isLoggedIn ? (
              <Tooltip aria-label="logout" label="logout" placement="bottom">
                <IconButton
                  onClick={() => {
                    logout();

                    history.push('/login');
                  }}
                  icon={FaSignOutAlt}
                  aria-label="logout"
                />
              </Tooltip>
            ) : (
              <Tooltip aria-label="login" label="login" placement="bottom">
                <IconButton
                  onClick={() => history.push('/login')}
                  icon={FaSignInAlt}
                  aria-label="login"
                />
              </Tooltip>
            )}
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
}
