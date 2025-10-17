export function validateReconstructInput(fragment, sources) {
  if (!fragment || typeof fragment !== "string" || fragment.trim().length < 5)
    return "Invalid or missing fragment";

  // Make sources optional
  if (sources && (!Array.isArray(sources) || sources.length === 0))
    return "At least one source required";

  if (sources) {
    for (const src of sources) {
      if (!src.title || !src.link) return "Each source must have title and link";
    }
  }

  return null;
}
