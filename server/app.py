from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return jsonify({'message': 'Hello from Flask backend!'})


# Create database if not exists
conn = sqlite3.connect("users.db", check_same_thread=False)
cursor = conn.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)")
conn.commit()

# Route for user login
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data["username"]
    password = data["password"]

    cursor.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
    result = cursor.fetchone()

    if result:
        return jsonify({"success": True, "message": "Login successful"})
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

# Route for new user registration
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data["username"]
    password = data["password"]

    # Check if user already exists
    cursor.execute("SELECT * FROM users WHERE username=?", (username,))
    if cursor.fetchone():
        return jsonify({"success": False, "message": "User already exists"}), 409

    cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
    conn.commit()
    return jsonify({"success": True, "message": "Registration successful"})

# Run the server
if __name__ == "__main__":
    app.run(debug=True)
