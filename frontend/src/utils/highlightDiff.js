// small wrapper around 'diff' to provide simple output for DiffView
import { diffWords } from 'diff'

/**
 * returns array of { value, added, removed }
 */
export function highlightDiff(original = '', reconstructed = '') {
  const parts = diffWords(original || '', reconstructed || '')
  // parts is an array of { value, added, removed }
  return parts.map((p) => ({ value: p.value, added: !!p.added, removed: !!p.removed }))
}

// default export for easy import
export default highlightDiff
