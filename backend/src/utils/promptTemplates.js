export function reconstructPrompt(fragment, sources) {
  const joinedSources = sources
    .map((s, i) => `Source ${i + 1}: ${s.title} - ${s.link}`)
    .join("\n");

  return `
Task: Reconstruct the following text fragment using the given sources.

Fragment:
"${fragment}"

Sources:
${joinedSources}

Provide a coherent and contextually complete reconstruction of the fragment using the tone and style of the sources.
Also include a short reasoning summary of how you reconstructed it.
`;
}
