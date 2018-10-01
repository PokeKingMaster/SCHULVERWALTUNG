 var mime = require('mime-types');
 var http = require('http');
 var fs = require('fs');
 
 /**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
  //Open a file on the server and return it's content:

   
  let url = request.url === "/" ? "./webClient/index.html" : request.url;
  url = url.split("/")[1] === "assets" ? "./webClient" + url : url;
  
  fs.readFile(url, function(err, data) {
	  if (err) {
		  console.log(url);
		  return response.end();
	  }
		
	var contentType = mime.lookup(url);

	console.log(contentType);	
    response.writeHead(200, {'Content-Type': contentType});
   
	response.write(data);
    return response.end();
  });
});

server.listen(1337, function() {
console.log("http server is running...")	});

