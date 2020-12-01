from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

# Initializing flask_sqlalchemy and flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///polls.db'
db = SQLAlchemy(app)