from flask import Flask, render_template, jsonify
import json
import requests 

app = Flask(__name__)

@app.route("/")
def home():

	return render_template('home.html')

@app.route('/get_neighborhoods')
def get_neighborhoods():
	data = requests.get('https://data.cityofchicago.org/resource/y6yq-dbs2.geojson')
	neighborhood_geo = data.json()

	return jsonify(neighborhood_geo)

@app.route('/get_grocery_stores')
def get_grocery_stores():
	liquor_store_filter = "$where=UPPER(store_name) not like '%LIQUOR%'"
	data = requests.get("https://data.cityofchicago.org/resource/53t8-wyrc.geojson?" + liquor_store_filter )
	grocery_store_locations = data.json()

	return jsonify(grocery_store_locations)

@app.route('/get_housing_data')
def get_housing_data():
	data = requests.get("https://data.cityofchicago.org/resource/s6ha-ppgi.geojson")
	housing_locations = data.json()

	return jsonify(housing_locations)
