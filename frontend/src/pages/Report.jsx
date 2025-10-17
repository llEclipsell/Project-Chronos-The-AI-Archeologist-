import React, { useEffect, useState, useRef } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Title, Grid, Button, Stack } from '@mantine/core'
import axios from 'axios'
import ReconstructionCard from '../components/ReconstructionCard'
import SourceCard from '../components/SourceCard'
import formatDate from '../utils/formatDate'
import html2pdf from 'html2pdf.js'

export default function Report() {
  const { id } = useParams()
  const location = useLocation()
  const [report, setReport] = useState(location.state?.report || null)
  const [loading, setLoading] = useState(false)
  const containerRef = useRef()

  useEffect(() => {
    if (!report && id) {
      let mounted = true
      setLoading(true)
      axios.get(`/api/reports/${id}`).then((r) => {
        if (mounted) setReport(r.data)
      }).catch((e) => console.error(e)).finally(() => (mounted && setLoading(false)))
      return () => (mounted = false)
    }
  }, [id, report])

  function handleExportPDF() {
    if (!containerRef.current) return
    const opt = {
      margin:       0.5,
      filename:     `chronos-report-${id || 'local'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    }
    html2pdf().set(opt).from(containerRef.current).save()
  }

  if (!report) return <div>Loading report...</div>

  return (
    <>
      <Title order={3} mb="md">Reconstruction Report</Title>
      <div ref={containerRef}>
        <Grid>
          <Grid.Col span={8}>
            <Stack spacing="sm">
              <div><strong>Original fragment</strong></div>
              <div style={{ whiteSpace: 'pre-wrap' }}>{report.original}</div>

              <ReconstructionCard report={report} />

              <div>
                <small className="dim">Created: {formatDate(report.createdAt)}</small>
              </div>
            </Stack>
          </Grid.Col>

          <Grid.Col span={4}>
            <Stack>
              <div><strong>Sources</strong></div>
              {report.sources?.map((s, i) => <SourceCard key={i} source={s} />)}
            </Stack>
          </Grid.Col>
        </Grid>
      </div>

      <div style={{ marginTop: 12 }}>
        <Button onClick={handleExportPDF}>Export to PDF</Button>
      </div>
    </>
  )
}
