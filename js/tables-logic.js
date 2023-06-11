var state1;
var state2;


var s1Pop;
var s2Pop;
var s1GDP;
var s2GDP;
var s1White; 
var s2White; 
var s1Vax;
var s2Vax;
var s1Vote; 
var s2Vote;


function selectState1() {
    state1 = document.getElementById("statesList1").value;
    //console.log(state1)
    //call API
}

function selectState2() {
    state2 = document.getElementById("statesList2").value;
    //console.log(state2)
    //call API
}





async function outputTable() {
    await getStateData();
    var tableRes = document.querySelector('.compare-table');
    tableRes.innerHTML = generateResultTable();
    //console.log('OutputTable')
}

function generateResultTable() {
    
    var result = "<b>Summary Table</b><br>"
    var tr1 = "<tr><th>" + "Population" +       "</th><th>" + s1Pop[0].TotalPopulation + "</th><th>" + s2Pop[0].TotalPopulation + "</th><th>" + "330900000" + "</th></tr>"
    var tr2 = "<tr><th>" + "GDP" +              "</th><th>" + s1GDP[0].GDP + "</th><th>" + s2GDP[0].GDP + "</th><th>" + "70248.63" + "</th></tr>"
    var tr3 = "<tr><th>" + "Whiteness" +        "</th><th>" + s1White[0].PercentageWhite.toFixed(3)*100 + "%</th><th>" + s2White[0].PercentageWhite.toFixed(3)*100 + "%</th><th>" + "75.8 %" + "</th></tr>"
    var tr4 = "<tr><th>" + "Vaccination Rate" + "</th><th>" + s1Vax[0].VaccinationRate.toFixed(2) + "</th><th>" + s2Vax[0].VaccinationRate.toFixed(2) + "</th><th>" + "70.0" + "</th></tr>"
    var tr5 = "<tr><th>" + "Voting Trend" +     "</th><th>" + s1Vote[0].Percentage.toFixed(2) * 100 + " % " + s1Vote[0].PopularWinner + "</th><th>" + s2Vote[0].Percentage.toFixed(2) * 100 + " % " + s2Vote[0].PopularWinner + "</th><th>" + "51.31% Democratic" + "</th></tr>"
    result += "<table border=&quot;1&quot;><thead><tr><th>Data Values</th><th>" + state1 + "</th><th>" + state2 + "</th><th>United States</th></tr></thead><tbody>" + tr1 + tr2 + tr3 + tr4 + tr5 + "</tbody></table>";
    
    return result;
}

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
    //console.log(data.results);

    // Retrieving data from JSON
    s1Pop = stateFilter(state1, dataPop)
    s2Pop = stateFilter(state2, dataPop)
    s1GDP = stateFilter(state1, dataGDP)
    s2GDP = stateFilter(state2, dataGDP)
    s1White = stateFilter(state1, dataWhite)
    s2White = stateFilter(state2, dataWhite)
    s1Vax = stateFilter(state1, dataVax)
    s2Vax = stateFilter(state2, dataVax)
    s1Vote = stateFilter(state1, dataVote)
    s2Vote = stateFilter(state2, dataVote)

    //let s1GDP = dataGDP.State.filter(x => x.State == state1)
   //filter function
   console.log(s1GDP[0].GDP);
   //console.log('getStateData')
}

function stateFilter (state_in, data_in) { 
    console.log(state_in)
    console.log(data_in)
    let outvar = data_in.filter(x => x.State == state_in);
    return outvar;
}
