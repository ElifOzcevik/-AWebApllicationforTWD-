var http = require('http');
var url = require('url');
var fs = require('fs');

var json;

fs.readFile('twd.json',"utf8", function(err, data) {

json=JSON.parse(data);

});


http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  console.log("pathname: "+q.pathname);
 
  
  
  if( q.pathname=="/"){
	filename="./home.html";
  }

  if( q.pathname=="/all"){
		
		filename="./twd.json";
		
  }
  
    if( q.pathname=="/episode"){
		console.log(q.query.id);
		for(i=0;i<json.episodes.length;i++)
		 if(json.episodes[i].id==q.query.id){
			    res.write(JSON.stringify(json.episodes[i]));
				console.log(JSON.stringify(json.episodes[i]));
				return res.end();
		 }
		 res.write("Episod id is not valid");
		return res.end();
  }
  
  
  
  if( q.pathname=="/season"){
	  var jsonn=" ";
		for(i=0;i<json.episodes.length;i++)
		 if(json.episodes[i].season==q.query.id){
				var x=JSON.stringify(json.episodes[i]);
				var y=JSON.parse(x);   
				jsonn+="<br>"+y.id+" , "+ y.name +" , "+ y.season +"<br>";
				
		 }
		 console.log(jsonn);
		 res.write(jsonn);
		return res.end();
  }
  
  
      if( q.pathname=="/remove"){
	//if(json.episodes[i]!=null){	  
		  var tmp="{ \n \"episodes\": [";
		for(i=0;i<json.episodes.length;i++){
			
		 if(json.episodes[i].id==q.query.id)
				delete json.episodes[i];
		 
		 else {
			 if (i!=json.episodes.length-1)tmp+=JSON.stringify(json.episodes[i], null, 4) +",\n";
				else tmp+=JSON.stringify(json.episodes[i], null, 4) ;}
		 }
		  tmp+="\n]\}"
		 fs.writeFile('twd.json', tmp, function (err) {
  if (err) throw err;
 
});
		return res.end();
 // }
	  }
  
  
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
  
}).listen(8080); 