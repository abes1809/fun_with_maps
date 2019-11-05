$(function(){

    // create base map

    var map = L.map('map').setView([41.881832, -87.623177], 12);

    var Stamen_Terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
       attribution: 'Stamen',
       minZoom: 0,
       maxZoom: 20,
       ext: 'jpg'
    });

    map.addLayer(Stamen_Terrain);

    // get layer data
	function get_neighborhood_data(){
    	$.ajax({
            url: 'http://localhost:5000/get_other_data',
            success: create_other_layer,
            error: function(error){
            	console.log(error)
            }
        });
    }

	$.ajax({
        url: 'http://localhost:5000/get_neighborhoods',
        success: create_neighborhood_layer,
        error: function(error){
        	console.log(error)
        }
    });

    // create layers

    // create neighborhood layer

    function create_neighborhood_layer(result) {
    	console.log('neighborhoods_layer');

        // neighborhood layer style

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
                fillOpacity: 0.5
            };
        };

        function onEachFeature(feature, layer) {
            if (feature.properties && feature.properties.pri_neigh){
                layer.bindPopup(feature.properties.pri_neigh);
            }
            
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
            });
        };

		var neighborhoods_layer = L.geoJSON(result,
			{	
				style: style,
				onEachFeature: onEachFeature
			}).addTo(map);

        return neighborhoods_layer
    };


    // create other layer
    function create_other_layer(result) {
		var flu_shot_locations_layer = L.geoJSON(
			result
		).addTo(map);
    };

    // function trigger_map_layer_creation(){

    //     if (neighborhoods_layer == true) {
    //         create_map_layers()
    //     }

    //     else {
    //         trigger_map_creation()
    //     }
    // };

    function create_map_layers(){

        var neighborhoods_layer = get_neighborhood_data();
        console.log('here');
        console.log(neighborhoods_layer);


        baseMap = {
            "terrain": Stamen_Terrain
        };

        overlayMaps = {
            // "flu_shot_locations": flu_shot_locations_layer,
            "neighborhoods": neighborhoods_layer
        };

        L.control.layers(baseMap, overlayMaps).addTo(map);
    };

    create_map_layers();

});