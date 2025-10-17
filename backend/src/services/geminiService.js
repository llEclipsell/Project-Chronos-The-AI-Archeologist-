// backend/src/services/geminiService.js
import axios from "axios";
import { reconstructPrompt } from "../utils/promptTemplates.js";

export async function generateReport(fragment, sources) {
  // normalize sources to array
  sources = Array.isArray(sources) ? sources : (sources ? [sources] : []);

  // mock path (keep if you want)
  if (process.env.USE_MOCKS === "true") {
    const reconstructedText = fragment
      .replace(/\bsmh\b/gi, "Shaking my head")
      .replace(/\bppl\b/gi, "people")
      .replace(/\bg2g\b/gi, "got to go")
      .replace(/\bttyl\b/gi, "talk to you later");

    return {
      id: null,
      original: fragment,
      reconstructed: {
        reconstructed_text: reconstructedText,
        explanation: "Mock: expanded common abbreviations.",
        confidence: 0.85
      },
      sources: sources.map(s => ({ title: s, link: s })),
      createdAt: new Date().toISOString()
    };
  }

  const prompt = reconstructPrompt(fragment, sources);
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  try {
    const resp = await axios.post(
      url,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      { headers: { "Content-Type": "application/json" } }
    );

    // Safely access text candidate
    const rawText =
      resp.data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    // Heuristic: first paragraph or first line -> reconstructed_text, rest -> explanation
    const paragraphs = rawText.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
    const firstParagraph = paragraphs.shift() || rawText;
    const explanation = paragraphs.join("\n\n") || "No explanation provided.";

    // Return report shaped for your frontend
    return {
      id: null,
      original: fragment,
      reconstructed: {
        reconstructed_text: firstParagraph,
        explanation: explanation,
        // you can compute a numeric confidence if Gemini gives one; otherwise set a default
        confidence: 0.9
      },
      // map sources to card-friendly objects; your real searchService can populate real titles/links
      sources: sources.map((s, i) => ({
        title: typeof s === "string" ? s : s.title || `Source ${i+1}`,
        link: typeof s === "string" ? s : s.link || s.url || "#",
        domain: typeof s === "string" ? (new URL(s).hostname || "example.com") : s.domain || "example.com",
        score: 0.5 + (i * 0.1) // placeholder score
      })),
      createdAt: new Date().toISOString()
    };
  } catch (err) {
    // improved logging for debugging
    if (err.response) {
      console.error("Gemini API status:", err.response.status);
      console.error("Gemini API body:", JSON.stringify(err.response.data, null, 2));
    } else {
      console.error("Gemini error:", err.message);
    }
    throw new Error("Gemini API failed");
  }
}
