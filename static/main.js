$(function(){

    // to hold layers for controller

    var overlayMaps = {};

    // create base map

    var map = L.map('map').setView([41.881832, -87.623177], 12);

    var Stamen_Terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
       attribution: 'Stamen',
       minZoom: 0,
       maxZoom: 20,
       ext: 'jpg'
    });

    map.addLayer(Stamen_Terrain);

    // create map panes to set z index of layers

    map.createPane("pane250").style.zIndex = 250;
    map.createPane("pane450").style.zIndex = 450;
    map.createPane("pane450_2").style.zIndex = 450;

    // get layer data

	function get_neighborhood_data(){
    	$.ajax({
            url: 'http://localhost:5000/get_neighborhoods',
            success: create_neighborhood_layer,
            error: function(error){
            	console.log(error)
            }
        });
    }

    function get_grocery_stores(){
    	$.ajax({
            url: 'http://localhost:5000/get_grocery_stores',
            success: create_grocery_layer,
            error: function(error){
            	console.log(error)
            }
        });
    }

    function get_housing_data(){
        $.ajax({
            url: 'http://localhost:5000/get_housing_data',
            success: create_housing_layer,
            error: function(error){
                console.log(error)
            }
        });
    }

    // create housing layer
    function create_housing_layer(result) {

        var geojsonMarkerOptions = {
            radius: 8,
            fillColor: "grey",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 1,
        };

        function onEachFeature(feature, layer) {
            if (feature.properties && feature.properties.property_type){
                layer.bindPopup("Type of affordable housing unit: " + feature.properties.property_type);
            }
        };

        var affordable_housing_layer = L.geoJSON(result,
        {
            pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, geojsonMarkerOptions);
                },
            pane: "pane450_2",
            onEachFeature: onEachFeature
        }
        ).addTo(map);

        overlayMaps.affordable_housing = affordable_housing_layer;
    };


    // create grocery store layer
    function create_grocery_layer(result) {

        var geojsonMarkerOptions = {
            radius: 6,
            fillColor: "#ff7800",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 1,
        };

        function onEachFeature(feature, layer) {
            if (feature.properties && feature.properties.store_name){
                layer.bindPopup("Store name: " + feature.properties.store_name);
            }
        };

		var grocery_stores_layer = L.geoJSON(result,
        {
            pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, geojsonMarkerOptions);
                },
            pane: "pane450",
            onEachFeature: onEachFeature
        }
		).addTo(map);

        overlayMaps.grocery_stores = grocery_stores_layer;
    };

    // create neighborhood layer

    function create_neighborhood_layer(result) {

        // neighborhood layer style

        function zoomToFeature(e) {
            map.fitBounds(e.target.getBounds());
        }

        function highlightFeature(e) {
                var layer = e.target;

                layer.setStyle({
                    weight: 5,
                    color: '#666',
                    dashArray: '',
                    fillOpacity: 0.7
                });

                if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                    layer.bringToFront();
                }
            };

        function resetHighlight(e) {
            console.log("fired");
            neighborhoods_layer.resetStyle(e.target);
        };

        function style(feature) {
            return {
                fillColor: '#027192',
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.5,
            };
        };

        function onEachFeature(feature, layer) {
            if (feature.properties && feature.properties.pri_neigh){
                layer.bindPopup(feature.properties.pri_neigh);
            }
            
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
            });
        };

        var neighborhoods_layer = L.geoJSON(result,
            {   
                pane: "pane250",
                style: style,
                onEachFeature: onEachFeature
            }).addTo(map);

        overlayMaps.neighborhoods = neighborhoods_layer;

        create_map_layers();
    };


    function create_map_layers(){

        baseMap = {
            "terrain": Stamen_Terrain
        };

        L.control.layers(baseMap, overlayMaps).addTo(map);
    };

    get_neighborhood_data();
    get_grocery_stores();
    get_housing_data()

    // create legend

    function getColor(layer) {

        if (layer == "grocery stores")
            return "#ff7800"

        else if (layer == "affordable housing units")
            return "grey"
    }

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = ["grocery stores", "affordable housing units"],
            labels = [];

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
            '<i style="background:' + getColor(grades[i]) + '"></i> ' + grades[i] + '<br>';
        }

        return div;
    };

    legend.addTo(map);

});