export default function formatDate(isoOrDate) {
  if (!isoOrDate) return ''
  const d = (typeof isoOrDate === 'string' || typeof isoOrDate === 'number') ? new Date(isoOrDate) : isoOrDate
  try {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(d)
  } catch (e) {
    return d.toLocaleString()
  }
}
