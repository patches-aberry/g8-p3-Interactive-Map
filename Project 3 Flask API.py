#!/usr/bin/env python
# coding: utf-8

# In[105]:


# Import dependencies

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


# In[106]:


# Database setup

# Read in the database
engine = create_engine("sqlite:///database.db")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(autoload_with=engine)
Base.classes.keys()

# Save references to the tables
Race = Base.classes.race_breakdown
Poverty = Base.classes.poverty_rate_by_state_2023
GDP = Base.classes.sagdp1__all_areas_1997_2022
Vaccination = Base.classes.us_state_vaccinations


# In[107]:


# Flask setup
app = Flask(__name__)


# In[108]:


# Flask routes

@app.route("/")
def welcome():
# List all available api routes.
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/voting_popular<br/>"
        f"/api/v1.0/voting_electoral<br/>"
        f"/api/v1.0/poverty<br/>"
        f"/api/v1.0/gdp<br/>"
        f"/api/v1.0/population<br/>"
        f"/api/v1.0/whiteness<br/>"
        f"/api/v1.0/vaccination<br/>"
    )


# # Route for popular vote data
# @app.route("/api/v1.0/voting_popular")
# def pop_vote():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     # Query all data
#     results = session.query(Race.State).all()
#     session.close()

#     # Convert data into dictionary
#     ## ADD CODE

#     return jsonify(all_names)


# # Route for electoral vote data
# @app.route("/api/v1.0/voting_electoral")
# def electoral_data():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     # Query all data
#     results = session.query(Passenger.name).all()

#     session.close()

#     # Convert data into dictionary
#     ## ADD CODE

#     return jsonify(all_names)


# Route for poverty data
@app.route("/api/v1.0/poverty")
def poverty():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all data
    results = session.query(Poverty.state, Poverty.PovertyRate).all()
    session.close()
    
    # Loop through data to create list of dictionaries and JSONify
    poverty_stats = []
    for State, Rate in results:
        state_poverty_dict = {}
        state_poverty_dict['State'] = State
        state_poverty_dict['Poverty Rate'] = Rate
        poverty_stats.append(state_poverty_dict)
    return jsonify(poverty_stats)


# Route for GDP data
@app.route("/api/v1.0/gdp")
def gdp():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all data
    results = session.query(GDP.GeoName, GDP.Y2022).all()
    session.close()
    
    # Loop through data to create list of dictionaries and JSONify
    gdp_stats = []
    for State, gdp in results:
        state_gdp_dict = {}
        state_gdp_dict['State'] = State
        state_gdp_dict['GDP'] = gdp
        gdp_stats.append(state_gdp_dict)
    return jsonify(gdp_stats)


# Route for population data
@app.route("/api/v1.0/population")
def population():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all data
    results = session.query(Race.State, Race.Total).all()
    session.close()
    
    # Loop through data to create list of dictionaries and JSONify
    population_stats = []
    for State, Total in results:
        state_pop_dict = {}
        state_pop_dict['State'] = State
        state_pop_dict['Total Population'] = Total
        population_stats.append(state_pop_dict)
    return jsonify(population_stats)


# Route for whiteness data
@app.route("/api/v1.0/whiteness")
def whiteness():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all data
    results = session.query(Race.State, Race.Total, Race.White_alone).all()
    session.close()
    
    # Loop through data to create list of dictionaries and JSONify
    whiteness_stats = []
    for State, Total, White_alone in results:
        state_whiteness_dict = {}
        state_whiteness_dict['State'] = State
        state_whiteness_dict['Total Population'] = Total
        state_whiteness_dict['White'] = White_alone
        state_whiteness_dict['Percentage White'] = White_alone/Total
        whiteness_stats.append(state_whiteness_dict)
    return jsonify(whiteness_stats)

# Route for vaccination data
@app.route("/api/v1.0/vaccination")
def vaccination():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all data
    results = session.query(Vaccination.location, Vaccination.people_fully_vaccinated_per_hundred).all()
    session.close()
    
    # Loop through data to create list of dictionaries and JSONify
    vaccination_stats = []
    results = session.query(Vaccination.location, func.max(Vaccination.people_fully_vaccinated_per_hundred)).where(Vaccination.people_fully_vaccinated_per_hundred != '').group_by(Vaccination.location).all()               

    for x in range(len(results)):
        state_vaccination_dict = {}
        state_vaccination_dict['State'] = results[x][0]
        state_vaccination_dict['Vaccination Rate'] = results[x][1]
        vaccination_stats.append(state_vaccination_dict)
    return jsonify(vaccination_stats)


if __name__ == '__main__':
    app.run(debug=True)


# In[ ]:




