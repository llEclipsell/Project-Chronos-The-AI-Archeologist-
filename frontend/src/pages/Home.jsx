import React, { useState } from 'react'
import { Grid, Title, Stack, Button, Text } from '@mantine/core'
import InputFragment from '../components/InputFragment'
import ReconstructionCard from '../components/ReconstructionCard'
import SourceCard from '../components/SourceCard'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // NOTE: now accepts fragment AND optional sources array
  async function handleReport(fragment, sources = []) {
    setError(null)
    setLoading(true)
    try {
      const response = await fetch("http://localhost:4000/api/reconstruct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fragment, sources })
      })

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}))
        throw new Error(errBody.error || `Request failed (${response.status})`)
      }

      const data = await response.json()
      setReport(data)

      // optionally navigate to a report page if backend returns an id
      const id = data.id || data._id
      if (id) {
        navigate(`/report/${id}`, { state: { report: data } })
      }
    } catch (err) {
      console.error("Error fetching reconstruction:", err)
      setError(err.message || 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Title order={2} mb="md">Project Chronos — AI Archeologist</Title>
      <Grid>
        <Grid.Col span={6}>
          <Stack>
            <InputFragment onReport={handleReport} />
            <div style={{ marginTop: 12 }}>
              <small style={{ color: '#666' }}>
                Tip: keep fragments under ~800 characters for reliable results.
              </small>
              {loading && <Text size="sm" c="dimmed" mt="xs">Generating reconstruction…</Text>}
              {error && <Text size="sm" c="red" mt="xs">{error}</Text>}
            </div>
          </Stack>
        </Grid.Col>

        <Grid.Col span={6}>
          {report ? (
            <>
              <ReconstructionCard report={report} />
              <div style={{ marginTop: 12 }}>
                {report.sources?.map((s, i) => (
                  <SourceCard key={i} source={s} />
                ))}
              </div>
            </>
          ) : (
            <div style={{ color: '#777' }}>Generate a reconstruction to see the preview here.</div>
          )}
        </Grid.Col>
      </Grid>
    </>
  )
}
