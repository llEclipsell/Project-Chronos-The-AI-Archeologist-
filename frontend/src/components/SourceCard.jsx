import { Card, Text, Group, Anchor, Badge } from '@mantine/core'

export default function SourceCard({ source }) {
  // expected source: { title, snippet, url, domain, score }
  const { title, snippet, url, domain, score, tag } = source || {}

  return (
    <Card withBorder radius="md" p="sm" style={{ marginBottom: 10 }}>
      <Group position="apart">
        <div>
          <Anchor href={url} target="_blank" rel="noopener noreferrer" weight={700}>
            {title || domain}
          </Anchor>
          <Text size="xs" c="dimmed">{domain}</Text>
        </div>
        <div>
          <Badge>{(score ?? 0).toFixed(2)}</Badge>
        </div>
      </Group>
      <Text size="sm" mt="sm">{snippet}</Text>
      {tag && <Text size="xs" c="dimmed" mt="xs">Tag: {tag}</Text>}
    </Card>
  )
}
