import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useFetchReport(id) {
  const [report, setReport] = useState(null)
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    let mounted = true
    setLoading(true)
    axios.get(`/api/reports/${id}`)
      .then((r) => { if (mounted) setReport(r.data) })
      .catch((e) => { if (mounted) setError(e) })
      .finally(() => { if (mounted) setLoading(false) })

    return () => (mounted = false)
  }, [id])

  useEffect(() => {
    let mounted = true
    axios.get('/api/reports')
      .then((r) => { if (mounted) setReports(r.data) })
      .catch((e) => { if (mounted) console.error(e) })
    return () => (mounted = false)
  }, [])

  return { report, reports, loading, error }
}
