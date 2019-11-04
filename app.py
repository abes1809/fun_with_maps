from flask import Flask, render_template
import json
import requests

app = Flask(__name__)

@app.route("/")
def home():

	r = requests.get('https://data.cityofchicago.org/resource/y6yq-dbs2.geojson')
	neighborhood_geo = r.json()

	return render_template('home.html', neighborhood_geo=neighborhood_geo)