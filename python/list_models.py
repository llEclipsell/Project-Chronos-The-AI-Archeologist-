import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

try:
    # Configure the API with your key
    api_key = os.getenv("GEMINI_API_KEY")
    genai.configure(api_key=api_key)
    
    print("--- Available Models for 'generateContent' ---")
    
    # List all models and filter for the ones that support 'generateContent'
    for m in genai.list_models():
      if 'generateContent' in m.supported_generation_methods:
        print(m.name)
        
    print("---------------------------------------------")

except Exception as e:
    print(f"❌ An error occurred: {e}")