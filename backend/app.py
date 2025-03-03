from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
from braket.devices import LocalSimulator

app = Flask(__name__)
CORS(app)  # Allows requests from the frontend

@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "Backend is running with Amazon Braket!"})

# Quantum Computing Function
def run_quantum_simulation():
    device = LocalSimulator()
    result = device.run("H 0\nCNOT 0 1\nMEASURE 0\nMEASURE 1").result()
    return result.measurements

@app.route('/quantum', methods=['GET'])
def quantum():
    result = run_quantum_simulation()
    return jsonify({"quantum_result": result})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
