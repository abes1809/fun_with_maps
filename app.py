from flask import Flask, render_template, jsonify
import json
import requests 

app = Flask(__name__)

@app.route("/")
def home():

	# pull neighborhood geometry
	data = requests.get('https://data.cityofchicago.org/resource/y6yq-dbs2.geojson')
	neighborhood_geo = data.json()

	# pull flu shot locations
	data = requests.get('https://data.cityofchicago.org/resource/v6vf-nfxy.geojson')
	flu_shot_locations = data.json()


	return render_template('home.html', neighborhood_geo=neighborhood_geo, flu_shot_locations=flu_shot_locations)

@app.route('/get_neighborhoods')
def get_neighborhoods():
	data = requests.get('https://data.cityofchicago.org/resource/y6yq-dbs2.geojson')
	print('TRIGGERED get neighborhoods')
	neighborhood_geo = data.json()

	return jsonify(neighborhood_geo)

@app.route('/get_other_data')
def get_other_data():
	data = requests.get('https://data.cityofchicago.org/resource/v6vf-nfxy.geojson')
	print('TRIGGERED flue shot locations')
	flu_shot_locations = data.json()

	return jsonify(flu_shot_locations)
