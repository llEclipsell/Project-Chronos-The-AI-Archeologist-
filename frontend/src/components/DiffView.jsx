import React from 'react'
import { Text } from '@mantine/core'
import { diffWords } from 'diff'
import { highlightDiff } from '../utils/highlightDiff'

export default function DiffView({ original = '', reconstructed = '' }) {
  // highlightDiff returns array of { value, added, removed }
  const pieces = highlightDiff(original, reconstructed)

  return (
    <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
      {pieces.map((p, i) => {
        const style = p.added ? { backgroundColor: '#e6ffea' } : p.removed ? { backgroundColor: '#ffecec', textDecoration: 'line-through' } : {}
        return (
          <span key={i} style={style}>
            {p.value}
          </span>
        )
      })}
      <Text size="xs" c="dimmed" mt="xs">Green = inserted by AI, red/strikethrough = removed from original</Text>
    </div>
  )
}
