

   
   // Create the faultline layer
   var faultLine = new L.LayerGroup();

   // Define a baseMaps object to hold our base layers
   var baseMaps = {
      "Street Map": streetmap,
      "Dark Map": darkmap
   };

   // Create overlay object to hold our overlay layer
   var overlayMaps = {
      Earthquakes: earthquakes,
      FaultLines: faultLine
   };

   // Create our map, giving it the streetmap and earthquakes layers to display on load
   var myMap = L.map("map", {
      center: [
         37.09, -95.71
      ],
      zoom: 5,
      layers: [streetmap, earthquakes, faultLine]
   });

   // Create a layer control
   // Pass in our baseMaps and overlayMaps
   // Add the layer control to the map
   L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
   }).addTo(myMap);

   // Query to retrieve the faultline data
   var faultlinequery = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

   // Create the faultlines and add them to the faultline layer
   d3.json(faultlinequery, function(data) {
      L.geoJSON(data, {
         style: function() {
            return {
               color: "orange",
               fillOpacity: 0
            }
         }
      }).addTo(faultLine)
   })
}