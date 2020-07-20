const assert = require('assert');
const nock = require('nock');
const supertest = require('supertest');
const express = require('express');
const app = require('../index');
const constants = require('../constants');

describe('unit testing /people route', function() {
  describe('testing with a dummy json', function(){
    before(function(){
	    /*
	        Mock API using nock for the REST API
	        Endpoint. Any calls to URL https://swapi.dev/api/people/
	        will be intercepted by the fake_api nock  
	    */

	    let fake_api = nock(constants.API_URL)
	        .get('/people/')
	        .reply(200, { results: [
	        	{
		            "name": "Luke Skywalker", 
		            "height": "172", 
		            "mass": "77", 
		            "hair_color": "blond", 
		            "skin_color": "fair", 
		            "eye_color": "blue", 
		            "birth_year": "19BBY", 
		            "gender": "male", 
		            "homeworld": "http://swapi.dev/api/planets/1/", 
		            "films": [
		                "http://swapi.dev/api/films/1/", 
		                "http://swapi.dev/api/films/2/", 
		                "http://swapi.dev/api/films/3/", 
		                "http://swapi.dev/api/films/6/"
		            ], 
		            "species": [], 
		            "vehicles": [
		                "http://swapi.dev/api/vehicles/14/", 
		                "http://swapi.dev/api/vehicles/30/"
		            ], 
		            "starships": [
		                "http://swapi.dev/api/starships/12/", 
		                "http://swapi.dev/api/starships/22/"
		            ], 
		            "created": "2014-12-09T13:50:51.644000Z", 
		            "edited": "2014-12-20T21:17:56.891000Z", 
		            "url": "http://swapi.dev/api/people/1/"
		        },
		        {
		            "name": "Obi-Wan Kenobi", 
		            "height": "182", 
		            "mass": "77", 
		            "hair_color": "auburn, white", 
		            "skin_color": "fair", 
		            "eye_color": "blue-gray", 
		            "birth_year": "57BBY", 
		            "gender": "male", 
		            "homeworld": "http://swapi.dev/api/planets/20/", 
		            "films": [
		                "http://swapi.dev/api/films/1/", 
		                "http://swapi.dev/api/films/2/", 
		                "http://swapi.dev/api/films/3/", 
		                "http://swapi.dev/api/films/4/", 
		                "http://swapi.dev/api/films/5/", 
		                "http://swapi.dev/api/films/6/"
		            ], 
		            "species": [], 
		            "vehicles": [
		                "http://swapi.dev/api/vehicles/38/"
		            ], 
		            "starships": [
		                "http://swapi.dev/api/starships/48/", 
		                "http://swapi.dev/api/starships/59/", 
		                "http://swapi.dev/api/starships/64/", 
		                "http://swapi.dev/api/starships/65/", 
		                "http://swapi.dev/api/starships/74/"
		            ], 
		            "created": "2014-12-10T16:16:29.192000Z", 
		            "edited": "2014-12-20T21:17:50.325000Z", 
		            "url": "http://swapi.dev/api/people/10/"
		        }
		    ]

	    });
    })

	it('should return the expected json response', async function(){
	    let response = await supertest(app)
	                .get('/people')
	    /* Checking if the response has OK status code*/
	    assert(response.statusCode, 200)
	    /* Checking for the _id returned from the fake_api */
	    assert(response.body.results[0]["name"], 'Luke Skywalker')
	})

    after(function(){

        /* Once the uni test case has executed, clean up the "nock".
            Now calls to the URL https://swapi.dev/api/people/
            won't be intercepted. 
        */
        nock.cleanAll();
    })
  })
});