const https = require('https');
const http = require('http');
const url = require('url');

const apiKey = '';

const PORT = 8080;
const server = http.createServer((request, response) => {
    const parts = url.parse(request.url, true);
    const query = parts.query;
    const summonerName = query.summonerName;
    callAPI(summonerName, response)
});

server.listen(PORT, () => console.log("Server is listening on port %s", PORT));

function callAPI(summonerName, response) {
    const url = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + summonerName + '?api_key=' + apiKey;

    https.get(url, (resp) => {
        let data = '';
        
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });
        
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            response.end(data);
        });
        
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

