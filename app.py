from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from braket.devices import LocalSimulator
from braket.circuits import Circuit

app = Flask(__name__)
CORS(app)  # Enable CORS

# Storage for training (temporary; will be replaced by a database later)
CHAT_HISTORY_FILE = "chat_history.json"

# Ensure chat history file exists
if not os.path.exists(CHAT_HISTORY_FILE):
    with open(CHAT_HISTORY_FILE, "w") as f:
        json.dump([], f)


@app.route("/status", methods=["GET"])
def status():
    """Check if the system is running."""
    return jsonify({"message": "AGI system is online and training..."})


@app.route("/quantum", methods=["GET"])
def run_quantum_simulation():
    """Simulates a quantum circuit using Amazon Braket."""
    try:
        device = LocalSimulator()
        circuit = Circuit()
        circuit.h(0)
        circuit.cnot(0, 1)
        circuit.measure(0)
        circuit.measure(1)

        task = device.run(circuit, shots=100)
        result = task.result()

        # Convert numpy array to a Python list for JSON serialization
        measurements = result.measurements.tolist()

        return jsonify({"quantum_result": measurements})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/message", methods=["POST"])
def user_message():
    """Process user messages and train AI."""
    data = request.json
    if not data or "text" not in data:
        return jsonify({"error": "Invalid input"}), 400

    user_text = data["text"]

    # Ensure proper JSON loading
    with open(CHAT_HISTORY_FILE, "r+") as f:
        try:
            history = json.load(f)
            if not isinstance(history, list):  # Ensure history is a list
                history = []
        except json.JSONDecodeError:
            history = []  # If JSON is corrupted, reset to empty list

        history.append({"user": user_text})

        f.seek(0)
        json.dump(history, f, indent=4)
        f.truncate()  # Ensure file is properly updated

    # Generate AI response
    ai_response = f"AI is learning: You said '{user_text}'"

    return jsonify({"response": ai_response})


@app.route("/train", methods=["POST"])
def train_agi():
    """Simulates AGI training from past conversations."""
    with open(CHAT_HISTORY_FILE, "r") as f:
        history = json.load(f)

    if not history:
        return jsonify({"message": "No training data yet."})

    # Simulate AI improving
    return jsonify({"message": "AGI is learning from data!", "training_data": history})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
