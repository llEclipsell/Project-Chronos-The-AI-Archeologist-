import React, { useState } from 'react'
import { Grid, Title, Stack, Text, Paper, Loader, Alert } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react';
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
    setReport(null);
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
      <Stack gap="xl"> {/* Use Stack for vertical spacing */}
          {/* Section 1: Introduction */}
          <Paper p="xl" radius="md" withBorder style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <Title order={2} ta="center" mb="md">Unearth the Past, Understand the Present</Title>
            <Text ta="center" c="dimmed" size="lg">
              Project Chronos bridges the gap between obscure internet fragments and modern understanding.
              Paste snippets of old slang, abbreviations, or cultural references, and let our AI Archeologist
              reconstruct their meaning in clear, contemporary language, backed by web sources.
            </Text>
          </Paper>

          {/* Section 2 & 3: Input and Output Side-by-Side */}
          <Grid gutter="xl">
            {/* Left Column: Input */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper p="lg" radius="md" withBorder style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                <Title order={3} mb="lg">Enter Fragment</Title>
                <InputFragment onReport={handleReport} />
                <Text size="xs" c="dimmed" mt="md">
                  Tip: Keep fragments under ~800 characters for best results. Add URLs or keywords as context sources.
                </Text>
                {/* Loading/Error Indicators */}
                <Stack gap="xs" mt="md">
                  {loading && <Loader size="sm" type="dots" />}
                  {searching && <Text size="sm" c="dimmed">Searching web sources…</Text>}
                  {error && (
                    <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red" radius="sm">
                      {error}
                    </Alert>
                  )}
                </Stack>
              </Paper>
            </Grid.Col>

            {/* Right Column: Report Preview */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack>
                {(loading) ? (
                    <Paper p="lg" radius="md" withBorder style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-surface)' }}>
                        <Stack align="center">
                          <Loader />
                          <Text c="dimmed">Generating reconstruction...</Text>
                        </Stack>
                    </Paper>
                ) : report ? (
                  <>
                    <ReconstructionCard report={report} />
                    <Title order={4} mt="lg" mb="sm">Potential Sources</Title>
                    {searching && <Loader size="sm" type="dots" />}
                    {!searching && report.sources?.length === 0 && <Text c="dimmed" size="sm">No web sources found or search still running.</Text>}
                    {report.sources?.map((s, i) => (
                      <SourceCard key={i} source={s} />
                    ))}
                  </>
                ) : !error ? ( // Only show placeholder if not loading and no error
                    <Paper p="xl" radius="md" withBorder style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-surface)', borderStyle: 'dashed', borderColor: 'var(--color-border)' }}>
                        <Text c="dimmed" ta="center">Your reconstruction report and sources will appear here.</Text>
                    </Paper>
                ) : null /* Don't show placeholder if there was an error */}
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
    </>
  )
}
