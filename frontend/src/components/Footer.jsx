import { Box, Text, Anchor, Container } from '@mantine/core';

export default function Footer() {
  return (
    <Box component="footer" h={60} mt="xl" style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
       <Container size="xl" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         <Text size="sm" c="dimmed" ta="center">
           Project Chronos — AI Archeologist ·{' '}
           <Anchor href="#" target="_blank" size="sm">
             About
           </Anchor>
         </Text>
       </Container>
    </Box>
  );
}