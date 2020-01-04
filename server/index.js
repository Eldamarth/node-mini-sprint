const http = require('http');
const _ = require('underscore');

// handle buffer requests


//headers to allows CORS requests
const headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

const port = 3000;

// TODO: Fill with strings of your favorite quotes :)
const quotes = [
  'Text bubbles are made out of flesh-eating bacteria. You didn\'t know that?',
  'Isn\'t this the Hollywood Stock Exchange? You know, where you buy and sell celebrity stocks based on the ups and down of their careers?',
  'You really haven\'t read my MySpace page, have you? You say you have, but you really haven\'t.',
  'All I have to do is get married by next week and I can get my blender in time for Grey\'s Anatomy!',
  'In nature, a horse will not offer you his hoof until you gain his trust.',
  '*Gasp* I dropped my meatball in the pool!',
  'What, no way! Wait, why is this wrong? Next to \'Miranda Rights,\' I wrote, \'Miranda has the right to a decent man who will help her raise her baby.\' Are these questions not about Sex and the City?',
  'I\'m going to make you cry and dip my cookie in your tears.',
  'Can\'t a guy go into a stress induced hibernation without getting thrown in a landfill?',
  'I told you it\'s menthol. So it\'s healthier than an apple.',
  'In the words of every sit-com character in the early \'90s and everyone in the Midwest through the rest of the \'90s, don\'t go there.',
  'Well, then I\'m taking away fifty points from Gryffindor!!',
  'Oh, my God! Stan has no friends! And he didn\'t even realize! He\'s like America, the guy.',
  'All I ask in return is that you vote with me on the dish. Wait.  Did I make that up, or is that real? Is there even a vote? I don\'t know what\'s real.',
];

//Utility Function to return a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const handleRequest = function(req, res) {
  console.log(`Endpoint: ${req.url} Method: ${req.method}`);

  // redirect users to /quote if they try to hit the homepage. This should already work, no changes needed
  if (req.url == '/') {
    console.log('redirecting');
    res.writeHead(301, {...headers, Location: `http://localhost:${port}/quote`}) //redirect to quote
    res.end();
  }






  // TODO: GET ONE
  if ((req.url == '/quote/' || req.url == '/quote') && req.method == "GET") {
    //YOUR CODE HERE

    let quote = _.sample(quotes);
    res.writeHead(200,headers);
    res.end('"'+quote+'"');
  }




  // TODO: POST/CREATE
  // else if ((req.url == 'FILL ME IN' || req.url == 'FILL ME IN') && req.method == "POST") {
  else if ((req.url == '/quote/' || req.url == '/quote') && req.method == "POST") {
    //YOUR CODE HERE
    

    var body = "";
    req.on('data', function (chunk) {
      body += chunk;
    });
    req.on('end', function () {
      quotes.push(body);
      console.log('POSTed: ' + body);
      res.writeHead(200,headers);
      res.end('Thank you for suggesting a Roger quote!');
    });

    
  }






//CATCH ALL ROUTE
  else {
    res.writeHead(404,headers);
    res.end('Page not found');

  }
}

const server = http.createServer(handleRequest);
server.listen(port);

console.log('Server is running in the terminal!');
console.log(`Listening on http://localhost:${port}`);
