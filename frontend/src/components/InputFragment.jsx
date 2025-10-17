import React, { useState } from 'react'
import { Textarea, Button, Group, Text } from '@mantine/core'

export default function InputFragment({ onReport }) {
  const [text, setText] = useState('')
  const [sources, setSources] = useState('')
  const [error, setError] = useState(null)

  function handleSubmit(e) {
    e?.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) {
      setError('Please enter a fragment.')
      return
    }
    setError(null)

    const sourcesArray = sources
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    // Pass fragment and optional sources up to parent
    onReport?.(trimmed, sourcesArray.length ? sourcesArray : undefined)

    // reset inputs
    setText('')
    setSources('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Textarea
        placeholder='Paste fragment here — e.g. "smh at top8 drama. ppl need 2 chill. g2g ttyl."'
        minRows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Textarea
        placeholder='Optional: Add context sources (comma-separated URLs or keywords)'
        minRows={2}
        value={sources}
        onChange={(e) => setSources(e.target.value)}
        mt="sm"
      />
      <Group position="right" mt="sm">
        {error && <Text c="red">{error}</Text>}
        <Button type="submit">
          Generate Reconstruction
        </Button>
      </Group>
    </form>
  )
}
