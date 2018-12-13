const http=require('http');
const fs=require('fs');
let readstream;
http.createServer((req,res)=>{
  let file=__dirname+req.url
  let url=req.url;
  if(url=='/requestimage'){
    res.writeHead(200,{

      'Content-type':'image/jpeg'
    })
    fs.createReadStream("index.jpeg").pipe(res);
  }
  if(url=='/image.html'){
     res.writeHead(200,{

      'Content-type':'text/html'
    })
    readstream=fs.createReadStream(file);
    readstream.on('error',(e)=>{
      res.write("404, Not Found");
      res.end();
    })
    readstream.on('data',(chunk)=>{
      res.write(chunk);
    })
    readstream.on('end',()=>{
       res.end();
     })
  }
  else {
    readstream=fs.createReadStream(file);
    res.writeHead(200,{
      'Content-type':'text/plain'
    })
    readstream.on('error',(e)=>{
      res.write("404, Not Found");
      res.end();
    })
    readstream.on('data',(chunk)=>{
      res.write(" Reading Chunk   ");
      res.write(chunk);
    })
    readstream.on('end',()=>{
      res.write('no more data');
      res.end();
    })
  }
}).listen(8080);
