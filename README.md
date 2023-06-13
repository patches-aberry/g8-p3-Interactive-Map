# A Comparison of States

### Contributors
* Patrick Aubry
* Henry Luken
* Adina Raizen

### Background
This project was completed in fulfillment of the Project 3 requirements for the University of Denver Data Analytics Bootcamp in June of 2023. The purpose was to gather and store data, then create a dashboard page which included user-driven interaction.

### About this project
Many statistics are mentioned in the news and in online forums regarding metrics to measure “success” or the “well-being” of states and regions and their comparative political leanings. These include literacy rates, health impact, graduation rates, and even IQs. 

The authors of this project were interested in creating interactive mapping and table tools that allow users to compare various metrics across states.

The ultimate goal is to allow users to make their own assumptions about a state’s representative data when compared with other states.

Tools used to create this project include a Python Flask API, HTML/CSS, SQLite, and JavaScript (including the Leaflet and Bootstrap libraries).

### Datasets
The authors considered a wide variety of data to include in this tool. While there is a future opportunity to add additional data, the datasets that are included in the first iteration of this tool are: GDP, population density, total population, voting trends (2020 presidential election), percentage of population identifying as white, and vaccination rates. 

Data was ethically sourced from the following locations:
* GDP, Total Population, and Whiteness: [2020 US Decennial Census](https://www.census.gov/data/developers/data-sets/decennial-census.html)
* Density: [US States Data from Leaflet.js](https://leafletjs.com/examples/choropleth/us-states.js)
* Voting Trends: 2020 presidential election results from [MIT Election Data and Science Lab "U.S. President 1976–2020" from Harvard Dataverse](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/42MVDX)
* Vaccination Rate: [State-by-state data on COVID-19 vaccinations in the United States from Our World in Data](https://ourworldindata.org/us-states-vaccinations)

### How it works
Users can use the mapping tool by selecting a dataset from the dropdown menu and generating the choropleth map. Color gradients show the relative data between states, and clicking on individual states will display a popup that includes the specific numbers for that state. Two maps can be displayed side by side for quick comparisons between various metrics.

Users can use the table tool by selecting two different states to compare from the dropdown menus. The table will display data from each metric in a side-by-side comparison for the two selected states.

To run the program, launch the Flask API and open the Index file in your browser.

### Future opportunities
There are several opportunities to build upon this project further:
* Refactoring the code to make it more adaptable and concise
* Deploying the API and visualization websites
* Adding more datasets
* Making datasets more dynamic
* Automatically resetting the maps when selecting a new dataset
