import React from 'react'
import { AppShell, Group, Anchor, Title } from '@mantine/core'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <AppShell height={70} p="md">
      <Group position="apart" align="center" style={{ height: '100%' }}>
        <Group>
          <Title order={4} style={{ margin: 0 }}>
            <Anchor component={Link} to="/" style={{ textDecoration: 'none' }}>
              Chronos
            </Anchor>
          </Title>
        </Group>

        <Group>
          <Anchor component={Link} to="/history">History</Anchor>
        </Group>
      </Group>
    </AppShell>
  )
}
