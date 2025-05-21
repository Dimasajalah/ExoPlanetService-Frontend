from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_pymongo import PyMongo

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# MongoDB Configuration
app.config["MONGO_URI"] = "mongodb://localhost:27017/exoplanets_db"  # Change if using MongoDB Atlas
mongo = PyMongo(app)

# Reference to the collection
exoplanets_collection = mongo.db.exoplanets

@app.route("/api/exoplanets", methods=["GET"])
def get_exoplanets():
    """Fetch all exoplanets from MongoDB"""
    exoplanets = list(exoplanets_collection.find({}, {"_id": 0}))  # Exclude MongoDB ID
    return jsonify(exoplanets)

@app.route("/api/exoplanets", methods=["POST"])
def add_exoplanet():
    """Add a new exoplanet"""
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400

    inserted_id = exoplanets_collection.insert_one(data).inserted_id
    return jsonify({"message": "Exoplanet added", "id": str(inserted_id)})

@app.route("/routes", methods=["GET"])
def list_routes():
    """List all available routes"""
    routes = [str(rule) for rule in app.url_map.iter_rules()]
    return jsonify(routes)

if __name__ == "__main__":
    app.run(debug=True)
