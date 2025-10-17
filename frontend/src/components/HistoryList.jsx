import React, { useEffect, useState } from 'react'
import { List, Text, Anchor, Loader, Stack } from '@mantine/core'
import axios from 'axios'
import formatDate from '../utils/formatDate'
import { Link } from 'react-router-dom'

export default function HistoryList() {
  const [items, setItems] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      try {
        const resp = await axios.get('/api/reports') // expects array of reports
        if (mounted) setItems(resp.data)
      } catch (e) {
        console.error(e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => (mounted = false)
  }, [])

  if (loading) return <Loader />

  if (!items?.length) return <Text c="dimmed">No history yet — generate a report first.</Text>

  return (
    <Stack>
      {items.map((r) => (
        <div key={r.id || r._id}>
          <Anchor component={Link} to={`/report/${r.id || r._id}`} weight={600}>
            {r.reconstructed?.reconstructed_text || r.original.slice(0, 80)}
          </Anchor>
          <Text size="xs" c="dimmed">{formatDate(r.createdAt)}</Text>
        </div>
      ))}
    </Stack>
  )
}
