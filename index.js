/* requerir dependencias */
const http = require("http");
const express = require("express");
const fileUpload = require('express-fileupload');
const ShareDB = require("sharedb");
const richText = require("rich-text");
const WebSocket = require("ws");
const WebSocketJSONStream = require("websocket-json-stream");
const fs = require("fs");

ShareDB.types.register(richText.type);

const app = express();
app.use(express.static("static"));
app.use(express.static("node_modules/quill/dist"));

const backend = new ShareDB();
const connection = backend.connect();

const cData ={
    setData:(obj)=>{
      let da = JSON.stringify(obj);
      fs.writeFile("./cdata.json", da, function (err){
        if (err) return console.log("No funciono");
         console.log('Se ha reescrito perfectamente');
      });
    },
    getData:()=>{
      let da = fs.readFileSync("./cdata.json").toString();
      try  {
        d=JSON.parse(da);
        return d;
      } catch{
        return {};
      }
    }
}
// 0: Name of collection
// 1: ID of document
let doc = connection.get("examples", "richtext");

doc.fetch(err => {
  if (err) {
    throw err;
  }
  if (doc.type === null) {
    return doc.create([/*{ insert: "Say Something!" }*/], "rich-text", startServer);
  }
  startServer();
});

/* Despliegue del servidor */

function startServer() {
  const server = http.createServer(app);

  const ws = new WebSocket.Server({
    server: server
  });

  ws.on("connection", (ws, req) => {
    console.log("New client connected");

    backend.listen(new WebSocketJSONStream(ws));

    ws.on("message", function message(msg) {
      console.log(msg);
    });
  });

  server.listen(8080, () =>
    console.log("Editor now live on http://localhost:8080")
  );
}
/* PAGINACION */
/* index */
app.get('/',function(req,res){
	var fs = require("fs");
    	res.sendfile("./static/index.html");
});
app.get('/ini.js',function(req,res){
    res.send('window.cData='+JSON.stringify(cData));
});


/* data */
app.get('/data',function(req,res){
	var fs = require("fs");
	res.sendfile("./files/"+cData.fileName);
});

app.get('/rdata', function(req, res){

  let param ={
      fileName : req.query.fileName,
      time:new Date
  }
  param.contents= fs.readFileSync("./files/"+param.fileName).toString();
  res.send(JSON.stringify(param));
});

/* save */
app.get('/save',function(req,res){
	console.log(cData.getData());
    fs.writeFile("./files/"+req.query.fileName, req.query.myText, function (err){
	if (err) return console.log("No funciono");
	console.log('Se ha reescrito perfectamente');
	    });
});

/* upload */
/* Subir archivo a la carpeta files */



app.use(fileUpload())
app.post('/upload',(req, res) => {
  let EDFile = req.files.file;
  EDFile.mv(`./files/${EDFile.name}`,err => {
  if(err){
      return res.status(500).send({message : err})
   }else{
      
      let d = cData.getData();
      d.fileName= EDFile.name;
      cData.setData();
   	  return res.status(200).send({ message : 'File upload'+EDFile.name})
   }		
  })
})



