import os
from flask_cors import CORS
from flask import Flask, request, jsonify
from main import reconstruct_text

# Import the search blueprint from your search package
# This assumes your folder is: python/search/api.py and we added __init__.py
from search.api import search_bp

app = Flask(__name__)
CORS(app)  # allow cross-origin (safe for dev)

@app.route("/api/reconstruct", methods=["POST"])
def reconstruct():
    data = request.get_json()
    text = data.get("text")
    if not text:
        return jsonify({"error": "Missing 'text'"}), 400

    result = reconstruct_text(text)
    return jsonify({"result": result})

# Register search blueprint at /api/search
app.register_blueprint(search_bp, url_prefix="/api/search")

if __name__ == "__main__":
    port = int(os.environ.get("PYTHON_PORT", 5001))
    print(f"Python AI/search service starting on http://127.0.0.1:{port}")
    app.run(host="127.0.0.1", port=port, debug=True)
