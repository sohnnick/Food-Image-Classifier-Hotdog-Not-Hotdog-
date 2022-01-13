from flask import Flask
from flask import render_template, request, redirect, jsonify
import requests
import json
import sys

# import py functions
sys.path.append('/functions')
from predict_image import *
# from Flask.functions.predict_image import *

# https://www.youtube.com/watch?v=6WruncSoCdI&ab_channel=JulianNash

app = Flask(__name__)

@app.route("/")
def index():
	return render_template('index.html', date=date_today )

@app.route("/predict" methods=['POST', 'GET'])
def predict():
	if request.method == 'POST':
		

if __name__ == "__main__":
	app.run(debug=True,threaded=False)