import axios from "axios";

export async function performSearch(query) {
  if (process.env.USE_MOCKS === "true") {
    return {
      results: [
        { title: "Mock Source 1", link: "https://example.com/1" },
        { title: "Mock Source 2", link: "https://example.com/2" },
      ],
    };
  }

  const provider = process.env.SEARCH_API_PROVIDER;
  const apiKey = process.env.SEARCH_API_KEY;

  if (provider === "serpapi") {
    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(
      query
    )}&api_key=${apiKey}`;
    const { data } = await axios.get(url);
    const results = data.organic_results?.map((r) => ({
      title: r.title,
      link: r.link,
    }));
    return { results };
  }

  throw new Error("Unsupported search provider");
}
