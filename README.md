# NestJs Assessment

## Description
* Use NestJs to create a restful-API using the db scheme and the endpoint description in the AppIndex
* Try not to use the ORM for serialization and making the query.
* Use custom validation pipe /decorators 
* Document how to fire up the project. 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## AppIndex:

Database
The database structure should be the following:

### User table:  
  Id		 primary key  
  username  
  password 	

### Profile table:  
  id 		primary key  
  userId	 	forgien key (User)  
  addressId	forgien key (Address)  
  name  

### Address table:  
  id 		primary key  
  cityId		forgien key (City)  
  street		

### City table:  
  id 		primary key  
  countryId  
  name  

### Country table:
  id 		primary key  
  name  

Feel free to initialize the city and country tables for simplicity.

REST-API:
  The API's endpoints:  
  POST Creates a user given (username,password,name,anddres,cityId)  
  POST returns a valid JWT token given (username,password)  
  GET Return a relevant user profile given a valid JWT token in a Authorization header with following structure  
  ```bash
    {
      "id":1,
      "name":"Juan Luis",
      "address":{
       "street": "Dam square",
        "city":"Amsterdam",
        "country":"Netherlands"
      }
    }
