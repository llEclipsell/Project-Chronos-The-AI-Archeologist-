import React from 'react';
import { Box, Group, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <Box component="nav" h={40} px="lg" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end', // Align items to the right
      borderBottom: '1px solid var(--color-border)',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white
      backdropFilter: 'blur(5px)', // Optional blur effect
      position: 'sticky', // Make it sticky if desired
      top: 0,
      zIndex: 100,
    }}>
      <Group>
        <Anchor component={Link} to="/history" size="sm" fw={500}>
          History
        </Anchor>
        {/* Add more links here if needed */}
      </Group>
    </Box>
  );
}