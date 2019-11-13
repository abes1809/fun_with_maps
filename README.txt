#DataMade Map Coding Challenge
===========

For my DataMade code challenge I chose to create an interactive map dispalying affordable housing units in Chicago next to grocery stores over the Chicago neighborhood boundries. Access to resources is something that I am very interested in and is a common theme in social justice work. Mapping resources is one tool we can use to visualize this disparity and see how some of this is playing out on the ground.:


##Setup
=========

1. Clone this repository and cd into your local copy.

	`git clone https://github.com/abes1809/fun_with_maps.git`
	`cd fun_with_maps`

2. Create a virtualvenv(https://docs.python-guide.org/dev/virtualenvs/):

	`virtualenv venv`

3. Enter your newly created virtual environment:

	`source venv/bin/activate`

4. Install dependencies:

	`pip install -r requirements.txt`


##Using the Tool
=========

You can navigate around the map by hovering over the map and clicking and dragging to see different areas of the city. You can click on a neighborhood to zoom in and see the housing units and stores there. Orange dots represent grocery stores and the grey dots are affordable housing units. Click directly on these dots to find details about the point. Filter for different layers by hovering over the grey box in the top right corner and selecting the layers you want displayed. Use the arrows in the top left corner to zoom and out of the map.
