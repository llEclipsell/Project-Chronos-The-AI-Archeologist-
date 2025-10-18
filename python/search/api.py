
from flask import Blueprint, request, jsonify
# The '..' is crucial: it tells Python to look up one level (from routes) then into 'services'
from .searchService import perform_search

search_bp = Blueprint('search', __name__)

@search_bp.route('/', methods=['POST'])
def search_endpoint():
    """
    Handles POST requests at /api/search. Reads reconstructedText from the body.
    """
    data = request.get_json()
    reconstructed_text = data.get('reconstructedText')
    original_fragment = data.get('originalFragment')
    context_sources = data.get('contextSources', [])

    if not reconstructed_text:
        return jsonify({"error": "Missing reconstructedText in request body."}), 400

    try:
        # Call the core search function
        search_results = perform_search(
            reconstructed_text=reconstructed_text,
            original_query=original_fragment,
            context_keywords=context_sources
        )

        # Return the results
        return jsonify({"results": search_results}), 200

    except Exception as e:
        # Catch and return any runtime errors from the service layer
        return jsonify({"error": str(e)}), 500