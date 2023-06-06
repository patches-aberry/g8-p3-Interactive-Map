// var states = document.getElementById("states");

// console.log(states);

// states.addEventListener("change", function(){
//     alert(this.value)
// },false);

// function getSelection(sel) {
//     var opts = [],
//       opt;
//     var len = sel.options.length;
//     for (var i = 0; i < len; i++) {
//       opt = sel.options[i];
  
//       if (opt.selected) {
//         opts.push(opt);
//         alert(opt.value);
//       }
//     }
  
//     return opts;
//   }

// var e1 = document.getElementById("states1");
// var value1 = e1.value;
// var text1 = e1.options[e1.selectedIndex].text;

// var e2 = document.getElementById("states2");
// var value2 = e2.value;
// var text2 = e2.options[e2.selectedIndex].text;

// console.log(value1)

var state1;
var state2;

function selectState1() {
    state1 = document.getElementById("statesList1").value;
    console.log(state1)
    //call API
}

function selectState2() {
    state2 = document.getElementById("statesList2").value;
    console.log(state2)
    //call API
}





function outputTable() {
    var tableRes = document.querySelector('.compare-table');
    tableRes.innerHTML = generateResultTable();
    getStateData();
}

function generateResultTable() {
    
    var result = "<b>Summary Table</b><br>"
    var tr1 = "<tr><th>" + "Population" +       "</th><th>" + "s1v1" + "</th><th>" + "s2v1" + "</th><th>" + "usv1" + "</th></tr>"
    var tr2 = "<tr><th>" + "GDP" +              "</th><th>" + "s1v2" + "</th><th>" + "s2v2" + "</th><th>" + "usv2" + "</th></tr>"
    var tr3 = "<tr><th>" + "Whiteness" +        "</th><th>" + "s1v3" + "</th><th>" + "s2v3" + "</th><th>" + "usv3" + "</th></tr>"
    var tr4 = "<tr><th>" + "Vaccination Rate" + "</th><th>" + "s1v4" + "</th><th>" + "s2v4" + "</th><th>" + "usv4" + "</th></tr>"
    var tr5 = "<tr><th>" + "Voting Trend" +     "</th><th>" + "s1v5" + "</th><th>" + "s2v5" + "</th><th>" + "usv5" + "</th></tr>"
    result += "<table><thead><tr><th></th><th>" + state1 + "</th><th>" + state2 + "</th><th>United States</th></tr></thead><tbody>" + tr1 + tr2 + tr3 + tr4 + tr5 + "</tbody></table>"
    
    return result;
}



async function getStateData() {
    var api_url = "http://127.0.0.1:5000/";
    // Making an API call (request)
    // and getting the response back
    var responsePop = await fetch(api_url + "api/v1.0/population");
    var responseGDP = await fetch(api_url + "api/v1.0/gdp");
    var responseWhite = await fetch(api_url + "api/v1.0/whiteness");
    var responseVax = await fetch(api_url + "api/v1.0/vaccination");
    var responseVote = await fetch(api_url + "api/v1.0/voting_popular");

    // Parsing it to JSON format
    var dataPop = await responsePop.json();
    var dataGDP = await responseGDP.json();
    var dataWhite = await responseWhite.json();
    var dataVax = await responseVax.json();
    var dataVote = await responseVote.json();
    //console.log(data.results);

    // Retrieving data from JSON
    let s1Pop = stateFilter(state1, dataPop)
    let s2Pop = stateFilter(state2, dataPop)
    let s1GDP = stateFilter(state1, dataGDP)
    let s2GDP = stateFilter(state2, dataGPD)
    let s1White = stateFilter(state1, dataWhite)
    let s2White = stateFilter(state2, dataWhite)
    let s1Vax = stateFilter(state1, dataVax)
    let s2Vax = stateFilter(state2, dataVax)
    let s1Vote = stateFilter(state1, dataVote)
    let s2Vote = stateFilter(state2, dataVote)
   //filter function
}

function stateFilter(state_in, data_in) {
    JSON.parse(data_in).filter(function (entry) 
    {
    return entry.State === state_in;
    })
};



//build object from API response in JSON
//have var of object
//use object to set innerhtml/innervalue based on ID of HTML element in the table. 
