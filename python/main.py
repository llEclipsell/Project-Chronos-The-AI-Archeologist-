import os
import google.generativeai as genai
from dotenv import load_dotenv

# --- Configuration (Stays the same) ---
load_dotenv()
try:
    api_key = os.getenv("GEMINI_API_KEY")
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('models/gemini-pro-latest') 
except Exception as e:
    print(f"❌ API Configuration Error: {e}")
    model = None

# --- Your Reusable Function ---
def reconstruct_text(obscure_fragment: str) -> str:
    """
    Takes an obscure text fragment and returns the reconstructed version using the Gemini API.
    """
    if not model:
        return "Error: AI Model is not configured."

    # The refined prompt you created
    prompt = f"""
    You are Project Chronos, an AI Archeologist specializing in early 21st-century internet culture. 
    Your task is to take an obscure text fragment and reconstruct it into natural, modern English.
    
    - Seamlessly integrate the meaning of slang and cultural references.
    - Do not use parentheses or explain the abbreviations directly.
    - The output should be the reconstructed text only.

    Original Fragment: "{obscure_fragment}"
    Reconstructed Text:
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"Error during AI generation: {e}"

# --- Example Usage (For testing your function) ---
if __name__ == "__main__":
    example_text = "smh at the top 8 drama. ppl need to chill. g2g, ttyl."
    
    print(f"Original: {example_text}")
    reconstructed = reconstruct_text(example_text)
    print(f"Reconstructed: {reconstructed}")
    
    print("-" * 20)
    
    example_text_2 = "lol, that newbs pwned. brb."
    print(f"Original: {example_text_2}")
    reconstructed_2 = reconstruct_text(example_text_2)
    print(f"Reconstructed: {reconstructed_2}")