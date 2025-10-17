import { AppShell, Text, Anchor } from '@mantine/core'

export default function Footer() {
  return (
    <AppShell height={60} p="md">
      <Text size="sm" c="dimmed" align="center">
        Project Chronos — AI Archeologist · Built with ❤️ · <Anchor href="https://your-org-or-team.example" target="_blank">About</Anchor>
      </Text>
    </AppShell>
  )
}
