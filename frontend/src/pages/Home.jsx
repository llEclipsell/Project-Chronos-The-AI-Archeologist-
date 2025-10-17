import React, { useState } from 'react'
import { Grid, Title, Stack } from '@mantine/core'
import InputFragment from '../components/InputFragment'
import ReconstructionCard from '../components/ReconstructionCard'
import SourceCard from '../components/SourceCard'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [report, setReport] = useState(null)
  const navigate = useNavigate()

  function handleReport(r) {
    setReport(r)
    // navigate to report page with state to show it
    if (r?.id || r?._id) {
      navigate(`/report/${r.id || r._id}`, { state: { report: r } })
    } else {
      // fallback: still go to /report
      navigate('/report', { state: { report: r } })
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
