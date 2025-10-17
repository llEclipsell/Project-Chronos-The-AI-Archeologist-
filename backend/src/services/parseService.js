// simple placeholder to extract reconstruction details or keywords from text
export function extractHighlights(text) {
  // Example: return the first few keywords or highlighted lines
  const lines = text.split("\n").filter(Boolean);
  return lines.slice(0, 3);
}
