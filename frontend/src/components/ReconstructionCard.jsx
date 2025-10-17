import React, { useState } from 'react'
import { Card, Text, Badge, Group, Button, Divider, Stack } from '@mantine/core'
import DiffView from './DiffView'

export default function ReconstructionCard({ report }) {
  const [showDiff, setShowDiff] = useState(false)
  const reconstructed = report?.reconstructed?.reconstructed_text || ''
  const explanation = report?.reconstructed?.explanation || ''
  const confidence = report?.reconstructed?.confidence ?? null
  const original = report?.original || ''

  return (
    <Card shadow="sm" radius="md" p="md">
      <Group position="apart" align="flex-start">
        <div>
          <Text size="lg" weight={700}>AI Reconstruction</Text>
          <Group spacing="xs" mt={4}>
            {confidence !== null && (
              <Badge color={confidence >= 0.7 ? 'green' : confidence >= 0.4 ? 'yellow' : 'red'}>
                Confidence: {(confidence * 100).toFixed(0)}%
              </Badge>
            )}
          </Group>
        </div>
        <div>
          <Button variant="light" size="xs" onClick={() => setShowDiff((s) => !s)}>
            {showDiff ? 'Hide Diff' : 'Show Diff'}
          </Button>
        </div>
      </Group>

      <Stack spacing="xs" mt="md">
        <Text>{reconstructed}</Text>
        {explanation && <Text size="sm" c="dimmed">{explanation}</Text>}
        <Divider />
        {showDiff && <DiffView original={original} reconstructed={reconstructed} />}
      </Stack>
    </Card>
  )
}
