from flask import Flask, request, jsonify
from main import reconstruct_text

app = Flask(__name__)

@app.route("/api/reconstruct", methods=["POST"])
def reconstruct():
    data = request.get_json()
    text = data.get("text")
    if not text:
        return jsonify({"error": "Missing 'text'"}), 400

    result = reconstruct_text(text)
    return jsonify({"result": result})

if __name__ == "__main__":
    app.run(port=5001, debug=True)
