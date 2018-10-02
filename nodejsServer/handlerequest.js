let mime = require('mime-types');
let http = require('http');
let fs = require('fs');
let url = require('url');
let instance;
let await = require('es5-async-await/await');
let async = require('es5-async-await/async');
let readPost = require('querystring');

 class Server {
	 
	static getInstance() {
		if (instance === undefined) {
			instance = new Server();
		}
		
		return instance;
	}
	
	constructor() {
		this.query = null;
	};
	
	start(){
		let server = http.createServer((request, response) => {
			this.query = url.parse(request.url, true).query;
			if(request.method == 'GET'){
				if (this.checkQuery(this.query)){
					this.handleQuery(this.query);
				}
			} else if (request.method == 'POST') {
				var body = '';
				request.on('data', function (data) {
					body += data;
					if (body.length > 1e6)
						request.connection.destroy();
				});
					
				request.on('end', function () {
					this.query = readPost.parse(body);

				});
				this.handleQuery(this.query);
			}
			this.sendFile(request, response);

		});

		server.listen(80, function() {
		console.log("http server Frontend is running...")});
	}
	
	async sendFile(request, response) {
		let url = "";
		if (request.url.indexOf('?') >= 0){
			url = request.url;
			let pfad = "../webClient/" + url.split("/")[1].split("?")[0];
			url = (pfad === "../webClient/") ? "../webClient/index.html" : pfad;
		} else{
			url = (request.url === "/") ? "../webClient/index.html" : request.url;
			url = url.split("/")[1] === "assets" ? "../webClient" + url : url;
		}

		fs.readFile(url, function(err, data) {

			if (err) {
				return response.end();
			}

			let contentType = mime.lookup(url);

			response.writeHead(200, {'Content-Type': contentType});
			try{
				response.write(data);	
				response.end();
			}catch(exception){
				console.log(exception);
			}
		});
	}
	
	checkQuery(){

	    if (this.query !== null || this.query !== {}){
			return true;
		} else {
			return false;
		}
	}
	
	handleQuery(){
		console.log(this.query);
	}
	

}

module.exports = Server;