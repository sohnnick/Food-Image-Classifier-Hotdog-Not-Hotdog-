from flask import Flask
from flask import render_template, request, redirect, jsonify
import requests
import json
import sys

# import py functions
# sys.path.append('/functions')
from predict_image import *
from s3 import *

# https://www.youtube.com/watch?v=6WruncSoCdI&ab_channel=JulianNash

app = Flask(__name__)

# @app.route("/")
# def index():
# 	return render_template('index.html')

@app.route("/test")
def index():
	return render_template('index.html')

@app.route("/predict", methods=['POST', 'GET'])
def predict():
	if request.method == 'POST':
		file = request.form['img_file']
		file_path = './static/media/' + file
		prediction_bool = detection(file_path)

		if prediction_bool == True:
			send = 'Hot Dog'
		else:
			send = 'Not Hot Dog'

		return send

	if request.method == 'GET':
		pass

if __name__ == "__main__":
	app.run(debug=True,threaded=False)