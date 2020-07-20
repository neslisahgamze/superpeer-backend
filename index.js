const express = require('express');
const https = require('https');
const cors = require('cors');
const constants = require('./constants');

const app = express();

app.use(cors())

app.get('/', (req, res) => {
  console.log('Hello world received a request.');

  const target = process.env.TARGET || 'World';
  res.send(`Hello ${target}!`);
});

const port = process.env.PORT || 8080;
module.exports = app.listen(port, () => {
  console.log('Hello world listening on port', port);
});

const make_api_call = (endpoint) => {
	return new Promise(function(resolve, reject) {
		https.get(`${constants.API_URL}/${endpoint}/`, (resp) => {
		  let data = '';

		  resp.on('data', (chunk) => {
		    data += chunk;
		  });

		  resp.on('end', () => {
		    resolve(JSON.parse(data));
		  });

		}).on("error", (err) => {
		  reject(err.message);
		});
	}); 
}

app.get('/people', function(req, res, next) {

	make_api_call("people").then((response) => {
		res.send(response);
	}).catch((errors) => {
	   res.status(500);
	   res.send("Oops, something went wrong.")
  })
})

