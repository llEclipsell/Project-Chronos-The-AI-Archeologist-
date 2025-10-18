import os
import requests
from dotenv import load_dotenv

# Load environment variables from the .env file in the backend root
load_dotenv()

SEARCH_URL = "https://www.googleapis.com/customsearch/v1"

def perform_search(reconstructed_text, original_query=None, context_keywords=None):
    """
    Fetches search results using reconstructed text, original query, and context keywords.
    """
    # 1. Get keys from the secure .env file
    api_key = os.getenv("GOOGLE_API_KEY")
    cx_id = os.getenv("GOOGLE_CSE_ID")

    # Simple check to ensure keys are loaded
    if not api_key or not cx_id:
        raise ValueError("API keys (GOOGLE_API_KEY or GOOGLE_CSE_ID) not loaded.")

    # Combine queries for better context
    # Strategy: Prioritize reconstructed, add original, add context terms
    query_parts = [reconstructed_text]
    if original_query:
        query_parts.append(original_query)
    if context_keywords and isinstance(context_keywords, list):
        query_parts.extend(context_keywords) # Add keywords/URLs provided by user

    final_query = " ".join(query_parts)
    print(f"DEBUG: Performing search with combined query: '{final_query}'") # Updated debug print

    # 2. Define API parameters
    params = {
        'key': api_key,
        'cx': cx_id,
        'q': final_query,
        'num': 5  # Set to retrieve the top 5 results
    }

    try:
        # 3. Call Google's API
        response = requests.get(SEARCH_URL, params=params)
        response.raise_for_status()  # Raises an HTTPError for bad responses (4xx or 5xx)

        data = response.json()

        # 4. Clean Up: Extract only Title, Link, and Snippet
        # Check if 'items' exists before trying to iterate
        if 'items' not in data:
            return []

        search_results = [
            {
                'title': item.get('title'),
                'link': item.get('link'),
                'snippet': item.get('snippet')
            }
            for item in data['items']
        ]

        # 5. Return the clean list
        return search_results

    except requests.RequestException as e:
        # Handle connection or HTTP errors gracefully
        print(f"API Call Error: {e}")
        # Return an empty list or raise a specific error for the route handler
        raise RuntimeError(f"Search failed: Network or API error occurred.")


# Example of how you can test this service function locally:
if __name__ == '__main__':
    try:
        test_query = "ancient Roman artifacts"
        print(f"Testing search for: '{test_query}'")
        results = perform_search(test_query)
        for i, result in enumerate(results):
            print(f"{i + 1}. {result['title']} - {result['link']}")
    except Exception as e:
        print(f"Test failed: {e}")