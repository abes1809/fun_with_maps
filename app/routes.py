from app import app
from flask import render_template, jsonify
import json
import requests 

@app.route("/")
@app.route("/home")
def home():

	return render_template('home.html')

@app.route('/neighborhoods')
def neighborhoods():
	data = requests.get('https://data.cityofchicago.org/resource/y6yq-dbs2.geojson')
	neighborhood_geo = data.json()

	return jsonify(neighborhood_geo)

@app.route('/grocery_stores')
def grocery_stores():
	liquor_store_filter = "$where=UPPER(store_name) not like '%LIQUOR%'"
	data = requests.get("https://data.cityofchicago.org/resource/53t8-wyrc.geojson?" + liquor_store_filter )
	grocery_store_locations = data.json()

	return jsonify(grocery_store_locations)

@app.route('/housing')
def housing():
	data = requests.get("https://data.cityofchicago.org/resource/s6ha-ppgi.geojson")
	housing_locations = data.json()

	return jsonify(housing_locations)