import { Title, Box } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    // Use Box for more control over centering
    <Box component="header" h={80} px="lg" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // Center content horizontally
      borderBottom: '1px solid var(--color-border)',
      backgroundColor: 'var(--color-surface)'
    }}>
      <Title order={1} style={{
        fontFamily: 'var(--font-heading)', // Use Orbitron
        fontWeight: 700,
        fontSize: '2.5rem', // Make it larger
        color: 'var(--color-primary)', // Use teal color
        textAlign: 'center',
        cursor: 'pointer', // Indicate it's clickable
        letterSpacing: '1px',
      }}>
        {/* Wrap Title in Link */}
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Chronos
        </Link>
      </Title>
    </Box>
  );
}