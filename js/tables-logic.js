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
var s1Wine;
var s2Wine;


function selectState1() {
    state1 = document.getElementById("statesList1").value;
}

function selectState2() {
    state2 = document.getElementById("statesList2").value;
}





async function outputTable() {
    await getStateData();
    var tableRes = document.querySelector('.compare-table');
    tableRes.innerHTML = generateResultTable();
}

//creating HTML for results table. 
function generateResultTable() {
    
    var result = ""
    var tr1 = "<tr><th>" + "Population" +       "</th><td>" + s1Pop[0].TotalPopulation.toLocaleString('en-US') + "</th><td>" + s2Pop[0].TotalPopulation.toLocaleString('en-US') + "</td><td>" + "330,900,000" + "</td></tr>";
    //console.log(tr1)
    var tr2 = "<tr><th>" + "GDP (USD)" +              "</th><td>" + s1GDP[0].GDP.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</td><td>" + s2GDP[0].GDP.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</td><td>" + "$23,320,000,000.00" + "</th></tr>";
    var tr3 = "<tr><th>" + "Whiteness" +        "</th><td>" + Math.round(s1White[0].PercentageWhite*100) + "%</th><td>" + Math.round(s2White[0].PercentageWhite*100) + "%</td><td>" + "76%" + "</td></tr>";
    var tr4 = "<tr><th>" + "Vaccination Rate" + "</th><td>" + Math.round(s1Vax[0].VaccinationRate) + "%</td><td>" + Math.round(s2Vax[0].VaccinationRate) + "%</td><td>" + "70%" + "</td></tr>";
    var tr5 = "<tr><th>" + "Voting Trend" +     "</th><td>" + Math.round(s1Vote[0].Percentage * 100) + "% " + s1Vote[0].PopularWinner + "ic</td><td>" + Math.round(s2Vote[0].Percentage * 100) + "% " + s2Vote[0].PopularWinner + "ic</td><td>" + "51% Democratic" + "</td></tr>";
    var tr6 = "<tr><th>" + "Wine Production (gal)" + "</th><td>" + s1Wine[0].WineProduction.toLocaleString('en-US') + "</td><td>" + s2Wine[0].WineProduction.toLocaleString('en-US') + "</td><td>" + "806,135,820" + "</td></tr>";
    result += "<table border=&quot;1&quot;><thead><tr><th>Data Values</th><th>" + state1 + "</th><th>" + state2 + "</th><th>United States</th></tr></thead><tbody>" + tr1 + tr2 + tr3 + tr4 + tr5 + tr6 + "</tbody></table>";
    
    return result;
}
//Calling Flask APIs to populate table data. 
async function getStateData() {
    //console.log('Get state data function called')
    var api_url = "http://127.0.0.1:5000";
    // Making an API call (request)
    // and getting the response back
    var responsePop = await fetch(api_url + "/api/v1.0/population");
    var responseGDP = await fetch(api_url + "/api/v1.0/gdp");
    var responseWhite = await fetch(api_url + "/api/v1.0/whiteness");
    var responseVax = await fetch(api_url + "/api/v1.0/vaccination");
    var responseVote = await fetch(api_url + "/api/v1.0/voting_popular");
    var responseWine = await fetch(api_url + "/api/v1.0/wine")

    // Parsing it to JSON format
    var dataPop = await responsePop.json()
    var dataGDP = await responseGDP.json()
    var dataWhite = await responseWhite.json()
    var dataVax = await responseVax.json()
    var dataVote = await responseVote.json()
    var dataWine = await responseWine.json()
    //console.log(dataPop);

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
    s1Wine = stateFilter(state1, dataWine)
    s2Wine = stateFilter(state2, dataWine)
}

// Filter API data to only return relevant state's information. 
function stateFilter (state_in, data_in) { 
    let outvar = data_in.filter(x => x.State == state_in);
    return outvar;
}
