Okay, here is a README.md file generated based on the structure and content of your provided project files and the requirements mentioned in the screenshot.

````markdown
# Project Chronos: The AI Archeologist

**Student Name(s)/ID(s):** [Your Name(s)] / [Your ID(s)]

## Project Description

Project Chronos is a web application designed to act as an "AI Archeologist" for early 21st-century internet culture. It takes obscure text fragments (like old internet slang, abbreviations, or cultural references) and uses the Google Gemini AI to reconstruct them into natural, modern English. Additionally, it leverages Google Custom Search to find relevant web sources that provide context or potential origins for the reconstructed text, helping users understand the historical meaning and usage of the fragment.

## Features

* **AI-Powered Reconstruction:** Uses Google Gemini Pro via a Python backend to translate obscure fragments into understandable modern text.
* **Web Source Integration:** Searches the web using Google Custom Search Engine for contextually relevant sources based on the reconstructed text and original fragment.
* **Contextual Input:** Allows users to provide optional URLs or keywords as additional context for both reconstruction and search.
* **Diff View:** Shows a highlighted difference between the original fragment and the AI-reconstructed text.
* **History:** (Implied) Stores past reports for review (Note: Backend routes exist, but saving functionality needs implementation).
* **PDF Export:** Allows exporting a generated report page to PDF format.
* **Web Interface:** User-friendly frontend built with React and Mantine UI.

## Tech Stack

* **Frontend:** React, Vite, Mantine UI, Axios
* **Backend (API Gateway/Proxy):** Node.js, Express, Mongoose (for potential history feature), Axios
* **AI & Search Service:** Python, Flask, Google Generative AI (Gemini), Google Custom Search Engine API, Requests
* **Database:** MongoDB (for potential history feature)

## Setup Instructions

### Prerequisites

* Node.js (v18 or higher recommended, as required by backend)
* npm (comes with Node.js)
* Python (v3.8 or higher recommended)
* pip (Python package installer)
* MongoDB instance (local or cloud-based like MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd project-chronos-the-ai-archeologist
````

### 2\. Backend Setup (Node.js)

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add your MongoDB connection string:

```dotenv
# backend/.env
MONGO_URI=your_mongodb_connection_string
# PORT=4000 # Optional: Defaults to 4000 if not set
```

### 3\. Python Service Setup

```bash
cd python

# Create and activate a virtual environment (recommended)
python -m venv venv
# On Windows:
# .\venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

# Create a requirements.txt file with the following content:
# google-generativeai
# python-dotenv
# Flask
# Flask-Cors
# requests

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file in the `python` directory and add your Google API keys:

```dotenv
# python/.env
GEMINI_API_KEY=your_google_gemini_api_key
GOOGLE_API_KEY=your_google_custom_search_api_key
GOOGLE_CSE_ID=your_google_custom_search_engine_id
# PYTHON_PORT=5001 # Optional: Defaults to 5001 if not set
```

**Note:** Ensure your `.gitignore` files include `.env` to prevent committing your API keys.

### 4\. Frontend Setup

```bash
cd frontend
npm install
```

You might optionally create a `.env` file in the `frontend` directory if you need to override the default backend API location (defaults to `http://localhost:4000` via Vite proxy):

```dotenv
# frontend/.env
# VITE_API_BASE_URL=http://localhost:4000 # Optional
```

## Usage

### Running the Full Application

You need to run the backend (which starts the Python service) and the frontend separately.

1.  **Start Backend & Python Service:**
    Open a terminal in the `backend` directory:

    ```bash
    npm run dev
    ```

    This uses `concurrently` to start the Node.js server (usually on port 4000) and the Python Flask server (usually on port 5001).

2.  **Start Frontend:**
    Open *another* terminal in the `frontend` directory:

    ```bash
    npm run dev
    ```

    This starts the Vite development server, usually on port 5173.

3.  **Access the Application:**
    Open your web browser and navigate to `http://localhost:5173` (or the port Vite indicates).

### Using the Python Reconstruction Script Directly

You can test the core AI reconstruction logic directly from the command line if needed.

1.  Navigate to the `python` directory: `cd python`
2.  Make sure your virtual environment is activated and your `python/.env` file has the `GEMINI_API_KEY`.
3.  Run the script with the fragment as an argument:
    ```bash
    python main.py "smh at the top 8 drama. ppl need to chill. g2g, ttyl."
    ```
    This will print the original and reconstructed text to the console. Note: This method only performs reconstruction, not web search or database interaction.

## Project Structure

```
├── backend/        # Node.js Express backend (API Gateway, DB interaction)
│   ├── src/
│   │   ├── models/
│   │   ├── routes/ # Express routes (proxying, history)
│   │   └── server.js # Main server setup
│   ├── .env        # API keys, DB connection (!!! DO NOT COMMIT !!!)
│   └── package.json
├── frontend/       # React frontend application
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx  # Entry point
│   ├── .env        # Optional frontend env vars (!!! DO NOT COMMIT !!!)
│   └── package.json
├── python/         # Python Flask service (AI Reconstruction & Search)
│   ├── search/     # Search related files
│   │   ├── api.py
│   │   └── searchService.py
│   ├── main.py     # Core Gemini reconstruction logic & CLI example
│   ├── server.py   # Flask server setup
│   ├── .env        # Google API keys (!!! DO NOT COMMIT !!!)
│   └── requirements.txt # Python dependencies
└── README.md       # This file
```

## Contributing
Contributions are welcome\! Please feel free to submit pull requests or open issues.

## License
[MIT License]

```
```
