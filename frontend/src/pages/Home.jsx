import React, { useState } from 'react'
import { Grid, Title, Stack, Text } from '@mantine/core'
import InputFragment from '../components/InputFragment'
import ReconstructionCard from '../components/ReconstructionCard'
import SourceCard from '../components/SourceCard'
import { useNavigate } from 'react-router-dom'
import { postJson, API_BASE } from '../api/client' // if you created client.js

export default function Home() {
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Run reconstruction, then search automatically
  async function handleReport(fragment, sources = []) {
    setError(null)
    setLoading(true)
    setSearching(false)
    try {
      // 1) Reconstruct via Node backend (proxies to Python)
      const reconstructResp = await fetch(`${API_BASE}/api/reconstruct`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fragment, sources })
      })
      if (!reconstructResp.ok) {
        const errBody = await reconstructResp.json().catch(()=>({}))
        throw new Error(errBody.error || `Reconstruct failed (${reconstructResp.status})`)
      }
      const reconstructedReport = await reconstructResp.json()
      setReport(reconstructedReport)

      // 2) Run web search on the reconstructed text
      const reconstructedText =
        reconstructedReport?.reconstructed?.reconstructed_text
        || reconstructedReport?.reconstructed
        || reconstructedReport?.result || fragment

      if (reconstructedText) {
        setSearching(true)
        // Note: python search blueprint expects { reconstructedText: "..." }
        const searchResp = await fetch(`${API_BASE}/api/search`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            reconstructedText,
            originalFragment: fragment,
            contextSources: sources 
          })
        })
        if (!searchResp.ok) {
          const errBody = await searchResp.json().catch(()=>({}))
          throw new Error(errBody.error || `Search failed (${searchResp.status})`)
        }
        const searchData = await searchResp.json() // expected shape: { results: [...] }

        // 3) Map the search results into SourceCard-friendly objects
        const mappedSources = (searchData.results || []).map((r, i) => {
          return {
            title: r.title || r.name || `Source ${i+1}`,
            snippet: r.snippet || r.snippet_text || r.description || "",
            url: r.link || r.url || r.href || "#",
            domain: r.domain || (r.link ? new URL(r.link).hostname : ""),
            score: r.score ?? (1 - i * 0.1) // fallback score
          }
        })

        // attach sources into the report and update state
        setReport(prev => ({ ...(prev || {}), sources: mappedSources }))
        setSearching(false)
      }
      // optional navigate if the backend returns id
      const id = reconstructedReport.id || reconstructedReport._id
      if (id) {
        navigate(`/report/${id}`, { state: { report: reconstructedReport } })
      }
    } catch (err) {
      console.error(err)
      setError(err.message || "Request failed")
      setSearching(false)
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
              {searching && <Text size="sm" c="dimmed" mt="xs">Searching web sources…</Text>}
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
