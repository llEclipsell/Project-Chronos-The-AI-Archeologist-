import React, { useState } from 'react'
import { Textarea, Button, Group, Text } from '@mantine/core'
import axios from 'axios'

export default function InputFragment({ onReport }) {
  const [text, setText] = useState('')
  const [sources, setSources] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e?.preventDefault()
    if (!text.trim()) return
    setError(null)
    setLoading(true)
    try {
      // parse sources string into an array
      const sourcesArray = sources
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean) // remove empty strings
      const payload = {
        fragment: text.trim(),
        sources: sourcesArray.length > 0 ? sourcesArray : undefined
      }

      const resp = await axios.post('/api/reconstruct', payload)
      // expected resp.data to be the report
      onReport?.(resp.data)
      setText('')
      setSources('')
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.error || err.message || 'Request failed')
    } finally {
      setLoading(false)
    }
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
        <Button type="submit" loading={loading}>
          {loading ? 'Digging...' : 'Generate Reconstruction'}
        </Button>
      </Group>
    </form>
  )
}
