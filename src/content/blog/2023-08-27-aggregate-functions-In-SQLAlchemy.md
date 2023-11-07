---
title:  "Aggregate functions"
excerpt: "In this tutorial, I will use SQLAlchemy..."
publishDate: "2023-08-27T11:39:36.050Z"
image: "https://images.unsplash.com/photo-1549685571-ac77ccac479e?auto=format&fit=crop&w=927&h=927"
category: "technology"
author: "ivan-arias"
tags: [alembic, sql, sqlalchemy]


---

In this tutorial, I will use SQLAlchemy to perform aggregate operations on a database containing information about states, counties, cities, and government facilities.
 I will describe briefly the process of building a project to use aggregate functions.



Let us check some concepts before starting:

## What is SQLAlchemy?

According to Myers (2016), "The SQLAlchemy ORM is what most people think of when you mention SQLAlchemy. It provides a very effective way to bind database schema and operations to the same data objects used in the application. It offers a way to rapidly build applications and get  them into customers' hands."

Also, the documentation on the SQLAlchemy website says, "SQLAlchemy is the Python SQL toolkit and Object Relational Mapper that gives application developers the full power and flexibility of SQL."

## What aggregate functions In SQLAlchemy are?

Aggregate functions are generic function implementations for a set of standard SQL functions that automatically set up the expected return type for each function.

In SQLAlchemy, an aggregate function is a function where the values of multiple rows are grouped to form a single value of a more significant meaning or measurement. These functions are widely used in database queries to perform calculations on data, such as summing values, calculating averages, or finding the minimum or maximum value in a set.

As can be seen from Figure 1 (GeeksforGeeks, 2022), Some standard aggregate functions include:

sum(): Calculates the sum of values,
avg(): Computes the average of values,
min(): Determines the smallest value,
max(): Determines the largest value, and
count(): Counts the number of rows.


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6rgug7212hff8g242ahx.png)Figure 1. Common aggregate functions. GeeksforGeeks (2022).

## What is Alembic?

 Alembic documentation shows that 'Alembic is a lightweight database migration tool for usage with the SQLAlchemy Database Toolkit for Python.'


According to Myers (2016), 'Alembic is a tool for handling database changes that leverages SQLAlchemy to
perform the migrations. Since SQLAlchemy will only create missing tables when we
use the metadata's create_all method, it does not update the database tables to
match any changes we might make to the columns. Nor would it delete tables that
we removed from the code. Alembic provides a way to do things like adding/
deleting tables, changing column names, and adding new constraints. Because
Alembic uses SQLAlchemy to perform the migrations; they can be used on various backend databases.' 


## Process to build a project to use aggregate functions.
(You must have Python installed in your system.)



### Overview

0. Create your own Git Repo.
1. Creating a Migration Environment.
2. Configuring a Migration Environment.
3. Generating a Base Empty Migration.
4. Autogenerating a Migration.
5. Test the database.
6. Populate the database.
7. Test the database.
8. Build the aggregate operations. 
9. Test the aggregate operations.


## Step by Step

0. **Create your own Git Repo**: create your local repo and push it.

    ```bash
        git init
        git add --all
        git commit -m 'initial commit'
        git remote add origin <github url>
        git branch -M main
        git push -u origin main
    ```

1. **Creating a Migration Environment**: To create the migration environment, we will create a folder labeled lib, initialize the environment, install the dependencies, and run the first alembic command. This initialization process creates the migration
environment and also creates an alembic.ini file with the configuration options


    ```bash
            mkdir lib
            cd lib
            pipenv install
            pipenv shell
            pipenv install sqlalchemy Alembic click
            alembic init migrations
    ```

2. **Configuring a Migration Environment**:

    * **alembic.ini**: You must edit the alembic.ini file with the database path.

    ```Python
        
    sqlalchemy.url = sqlite:///geodata.db
    
    ```

    * **models.py**: This file should be filled out with primary data to run the first migration.

    ```

        from sqlalchemy import Column, Integer, String, Float, ForeignKey, Table, create_engine
        from sqlalchemy.orm import declarative_base, relationship
        
    
        DATABASE_URL = "sqlite:///geodata.db"
        engine = create_engine(DATABASE_URL)
        
        Base = declarative_base()

    ```





    * **migrations/env.py** (line 21)




    ```
        from models import Base
        target_metadata = Base.metadata


    ```
    
3. **Generating a Base Empty Migration**: This command will create a migration file in the alembic/versions/ subfolder. "Because we do not have any data classes and have made no changes, our upgrade and downgrade methods are empty. So running this migration will have no
effect, but it will provide a great foundation for our migration chain." (Mayers, 2016)

    ```bash
            alembic revision -m "Empty Init"
            alembic upgrade head
    ```

1. **Autogenerating a Migration**:  With our base in place, we can add our data class to our application. For this tutorial, I will add the final version of models.py, but it is supposed that you should build the models.py file in a few steps and generate different migrations files.

    * **models.py** (add data)

    
    ```python
    class State(Base):
        __tablename__ = "States"
    
        id = Column(Integer, primary_key=True)
        name = Column(String(255))
        abbreviation = Column(String(255))
        population = Column(Integer)
        capital = Column(String(255))
        area = Column(Float)
        
        # ORM relationship for Cities
        counties = relationship("County", back_populates="state")  # New relationship
        cities = relationship("City", back_populates="state")
    
    
        def __repr__(self):
            return f"<State(id={self.id}, name='{self.name}', abbreviation='{self.abbreviation}, population='{self.population}', area='{self.area}')>"
        # more tables..
    ```

    ```bash
            alembic revision --autogenerate -m "Added all classesl"
            alembic upgrade head
    ```

    So when we run the autogeneration command, Alembic inspects the metadata of
    our SQLAlchemy Base and then compare that to the current database state


5. **Test the database!**: After running this migration, we can take a peek in the database to make sure the changes happened:


   ```python
    sqlite3 geodata.db
    sqlite> .tables
    Cities                   Counties                 States                 
    CityFacilityAssociation  Facilities               alembic_version        
    sqlite> .schema
    CREATE TABLE alembic_version (
            version_num VARCHAR(32) NOT NULL, 
            CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num)
    );
    CREATE TABLE IF NOT EXISTS "Facilities" (
            id INTEGER NOT NULL, 
            name VARCHAR(255), 
            description VARCHAR(255), 
            facility_type VARCHAR(255), 
            PRIMARY KEY (id)
    );
    CREATE TABLE IF NOT EXISTS "States" (
            id INTEGER NOT NULL, 
            name VARCHAR(255), 
            abbreviation VARCHAR(255), 
            population INTEGER, 
            capital VARCHAR(255), 
            area FLOAT, 
            PRIMARY KEY (id)
    );
    CREATE TABLE IF NOT EXISTS "Counties" (
            id INTEGER NOT NULL, 
            name VARCHAR(255), 
            population INTEGER, 
            area FLOAT, 
            state_id INTEGER, 
            PRIMARY KEY (id), 
            FOREIGN KEY(state_id) REFERENCES "States" (id)
    );
    CREATE TABLE IF NOT EXISTS "Cities" (
            id INTEGER NOT NULL, 
            name VARCHAR(255), 
            population INTEGER, 
            area INTEGER, 
            latitude FLOAT, 
            longitude FLOAT, 
            state_id INTEGER, 
            county_id INTEGER, 
            PRIMARY KEY (id), 
            FOREIGN KEY(county_id) REFERENCES "Counties" (id), 
            FOREIGN KEY(state_id) REFERENCES "States" (id)
    );
    CREATE TABLE IF NOT EXISTS "CityFacilityAssociation" (
            city_id INTEGER, 
            facility_id INTEGER, 
            FOREIGN KEY(city_id) REFERENCES "Cities" (id), 
            FOREIGN KEY(facility_id) REFERENCES "Facilities" (id)
    );
    ```


6. **Populate the database**: You have noticed that we installed click in step number 2; it was not a mistake. We will take advantage of click commands to seed our database. "Click is a Python package for creating beautiful command line interfaces in a composable way with as little code as necessary. It is the "Command Line Interface Creation Kit." It is highly configurable but comes with sensible defaults out of the box." (Docs, Click)
   * **Seed.py**: Following a specific order populating the database is crucial. We must start seeding states, which generate state_id that will be used for the others tables, then seed counties table, following cities tables, facilities, and finally, seed associations table. Of course, you can seed the database using another order, but you will probably have to modify NULL or NONE values in some tables' column IDs.
  
    ```python
    @click.group()
    def cli():
        """Manage the database records."""
        pass
    
    @cli.command()
    def seed_states():
        """ Seed states."""
        session.query(State).delete()
        session.commit()
        session.add_all(states_to_add)
        session.commit()
        click.echo("✅ Done seeding states!")
    
    
    @cli.command()
    def seed_counties():
        """ Seed counties."""
        session.query(County).delete()
        session.commit()
        session.add_all(counties_to_add)
        session.commit()
        click.echo("✅ Done seeding counties!")
        
        # more click commands
    ```

    ```python
    ➜  lib git:(master) python seed.py seed-states
    🌱 Seeding DB...
    ✅ Done seeding states!
    ➜  lib git:(master) ✗ python seed.py seed-counties
    🌱 Seeding DB...
    ✅ Done seeding counties!
    ➜  lib git:(master) ✗ python seed.py seed-cities
    🌱 Seeding DB...
    ✅ Done seeding cities!
    ➜  lib git:(master) ✗ python seed.py seed-facilities
    🌱 Seeding DB...
    ✅ Done seeding facilities!
    ➜  lib git:(master) ✗ python seed.py seed-associations
    🌱 Seeding DB...
    ✅ Done seeding associations!
    ➜  lib git:(master) ✗ >....
    ```

7. **Test the database**: time to check our work! I will use SQLite3 to query the database.

    ```python
    sqlite> SELECT * FROM cities;
    1|City1 of Miami-Dade|921122|244.33|-60.505908|-81.338823|2|1
    2|City2 of Miami-Dade|921122|244.33|41.464272|-105.973471|2|1
    3|City3 of Miami-Dade|921122|244.33|71.915708|15.861089|2|1
    4|City1 of Broward|13191|367.63|44.4086105|5.053036|2|2
    5|City2 of Broward|13191|367.63|-10.655939|-166.49232|2|2
    6|City3 of Broward|13191|367.63|26.6466285|43.273803|2|2
    7|City1 of Palm Beach|514603|253.33|-68.9419105|-26.196865|2|3
    8|City2 of Palm Beach|514603|253.33|-51.2455565|-136.42097|2|3
    9|City3 of Palm Beach|514603|253.33|-36.0276055|47.20716|2|3
    10|City1 of Hillsborough|509641|131.33|-25.2476945|12.554376|2|4
    11|City2 of Hillsborough|509641|131.33|-8.135509|-1.767604|2|4
    12|City3 of Hillsborough|509641|131.33|57.1137205|97.157059|2|4
    13|City1 of Jefferson|226533|143|-26.480627|-157.665268|1|5
    14|City2 of Jefferson|226533|143|62.145654|122.499549|1|5
    15|City3 of Jefferson|226533|143|56.563159|3.218858|1|5
    16|City1 of Mobile|138451|158|-21.7651625|-49.625057|1|6
    17|City2 of Mobile|138451|158|89.2113045|-102.297208|1|6
    18|City3 of Mobile|138451|158|-80.1373355|85.405321|1|6
    19|City1 of Madison|134718|103.33|-0.572975|142.457834|1|7
    20|City2 of Madison|134718|103.33|8.9656|65.996579|1|7
    21|City3 of Madison|134718|103.33|31.6177535|100.055888|1|7
    22|City1 of Baldwin|82205|204.67|-6.5947375|0.067839|1|8
    23|City2 of Baldwin|82205|204.67|59.5498845|43.692911|1|8
    24|City3 of Baldwin|82205|204.67|74.46305|27.220786|1|8
    sqlite> 
    ```
   The database was populated! **Great!**

8. **Build the aggregate operations**: I will use click commands again to perform aggregate operations. Each command prompts the user for input and then executes a database query based on that input. After querying the database, the command outputs a result.

   ```python
    @click.command(help="Count the number of cities in a given state.")
    def count_cities_in_state():
        # Inform the user about the purpose of the command 
        click.secho("This command counts the number of cities in a given state", fg='green')
    
        # Prompt the user for the state name and store it in the variable state_name
        state_name = click.prompt('Please enter the name of the state', type=str, fg='blue')
    
        # Construct a query to count cities in the given state using SQLAlchemy
        count = session.query(func.count(City.id)).join(State).filter(State.name == state_name).scalar()        
    
        # Display the result
        click.secho(f"The number of cities in {state_name} is: {count}", fg='green')
    
    
    @click.command(help="Calculate the average population of cities in a given state.")
    def average_city_population_in_state():
        # Inform the user about the purpose of the command
        click.secho("This command calculates the average population of cities in a given state.", fg='green')
    
        # Prompt the user for the state name and store it in the variable state_name
        state_name = click.prompt('Please enter the name of the state', type=str, fg='blue')
    
        # Construct a query to get the average city population in the given state using SQLAlchemy
        average = session.query(func.avg(City.population)).join(State).filter(State.name == state_name).scalar()
    
        # Display the result
        click.secho(f"The average population of cities in {state_name} is: {average:.2f}", fg='green')
    
    
    @click.command(help="Find the total area of all cities in a given county.")
    def total_area_in_county():
        # Inform the user about the purpose of the command
        click.secho("This command finds the total area of all cities in a given county.", fg='green')
    
        # Prompt the user for the county name and store it in the variable county_name
        county_name = click.prompt('Please enter the name of the county', type=str, fg='blue')
    
        # Construct a query to get the total area of cities in the given county using SQLAlchemy
        area = session.query(func.sum(City.area)).join(County).filter(County.name == county_name).scalar()
    
        # Display the result
        click.secho(f"The total area of cities in {county_name} county is: {area:.2f}", fg='green')
    ```
    This **sqlAlchemy code** is constructing and executing a query that performs aggregate operations (SUM, AVG, and COUNT).

   ```python
    
    python aggr_meth.py count-cities-in-state  
    
    This command counts the number of cities in a given state 
    Please enter the name of the state: Florida
    The number of cities in Florida is: 12
    
    python aggr_meth.py average-city-population-in-state 
     
    This command calculates the average population of cities in a given state.
    Please enter the name of the state: Alabama
    The average population of cities in Alabama is 145476.75
    
    
    python aggr_meth.py total-area-in-county 
    
    This command finds the total area of all cities in a given county.
    Please enter the name of the county: Miami-Dade
    The total area of cities in Miami-Dade County is: 732.99
    ```
   
9. Test the aggregate operations using sqlite3: finally, I will use sqlite3 to test the aggregate operations.

    ```python
    sqlite> SELECT COUNT(*) FROM Cities c 
    JOIN States s ON c.state_id = s.id 
    WHERE s.name = "Florida";
    12
    
    sqlite> SELECT AVG(c.population) 
    FROM Cities c
    JOIN States s ON c.state_id = s.id
    WHERE s.name = "Alabama";
    145476.75
    
    sqlite> SELECT SUM(c.area) 
    FROM Cities c
    JOIN Counties co ON c.county_id = co.id
    WHERE co.name = "Miami-Dade";
    732.99
    ```
As you can see, the results are the same. **Great!**


Final thoughts:

This tutorial showed how to use SQLAlchemy to query a database. We walked through setting up a project to use aggregate functions. By the end, you should understand how to handle and use such functions effectively.

## References:

Myers, J. (2016). Essential sqlalchemy. O'Reilly. 

"Documentation." Alembic, www.alembic.sqlalchemy.org. Accessed 14 Aug. 2023. 

"Documentation." SQLAlchemy, www.sqlalchemy.org/. Accessed 14 Aug. 2023. 



GeeksforGeeks. (2022). SQLAlchemy Aggregate Functions. GeeksforGeeks. https://www.geeksforgeeks.org/sqlalchemy-aggregate-functions/






