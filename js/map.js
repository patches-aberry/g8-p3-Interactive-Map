// Creating the map object
var myMap = L.map("map", {
  center: [37.0902, -95.7129],
  zoom: 4
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load the GeoJSON data.

// import {myStatesData} from 'js/us-states.js';
var geoData = 'js/statesdata.json';

var geojson;

async function getStateData() {
  var api_url = "http://127.0.0.1:5000";
  // Making an API call (request)
  // and getting the response back
  var responsePop = await fetch(api_url + "/api/v1.0/population");
  var responseGDP = await fetch(api_url + "/api/v1.0/gdp");
  var responseWhite = await fetch(api_url + "/api/v1.0/whiteness");
  var responseVax = await fetch(api_url + "/api/v1.0/vaccination");
  var responseVote = await fetch(api_url + "/api/v1.0/voting_popular");

  // Parsing it to JSON format
  var dataPop = await responsePop.json()
  var dataGDP = await responseGDP.json()
  var dataWhite = await responseWhite.json()
  var dataVax = await responseVax.json()
  var dataVote = await responseVote.json()
}
getStateData();

function style(feature) {
  return {
      fillColor: getColor(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

L.geoJson(geoData, {style: style}).addTo(map);


// Get the data with d3.
// d3.json(geoData).then(function(data) {
  


//   // Create a new choropleth layer.
//   geojson = L.choropleth(data, {


  


// //   function joinData(apiData, localData) {
// //     // Perform the join operation based on a common key
// //     const joinedData = [];
// //     for (let i = 0; i < apiData.length; i++) {
// //       const apiItem = apiData[i];
// //       for (let j = 0; j < localData.length; j++) {
// //         const localItem = localData[j];
// //         if (apiItem.properties.name === localItem.State) {
// //           // Combine the data from API and locally hosted data
// //           const mergedItem = { ...apiItem, ...localItem };
// //           joinedData.push(mergedItem);
// //           break; // Exit the loop once a match is found
// //         }
// //       }
// //     }
// //     return joinedData;
// //   }

// //   var mapData = joinData(geoData, responsePop);
// // mapData = joinData(mapData, responseGDP);
// // console.log(mapData);

//     // Define which property in the features to use.
//     valueProperty: "density",

//     // Set the color scale.
//     scale: ["#ffffb2", "#b10026"],

//     // The number of breaks in the step range
//     steps: 10,

//     // q for quartile, e for equidistant, k for k-means
//     mode: "q",
//     style: {
//       // Border color
//       color: "#fff",
//       weight: 1,
//       fillOpacity: 0.8
//     },

//     // Binding a popup to each layer
//     onEachFeature: function(feature, layer) {
//       layer.bindPopup("<strong>" + feature.properties.name + "</strong><br /><br />Estimated employed population with children age 6-17: " +
//         feature.properties.density + "<br /><br />Estimated Total Income and Benefits for Families: $" + feature.properties.density.toString());
//     }
//   }).addTo(myMap);

  // Set up the legend.
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    // Add the minimum and maximum.
    var legendInfo = "<h1>Population with Children<br />(ages 6-17)</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding the legend to the map
  legend.addTo(myMap);


