'use strict';
const {createServer}=require('node:http');
const {readFile}=require('node:fs/promises');
const path=require('node:path');
const assets={'index.html':'text/html; charset=utf-8','style.css':'text/css; charset=utf-8','app.js':'text/javascript; charset=utf-8','cases.js':'text/javascript; charset=utf-8','icon.svg':'image/svg+xml'};
createServer(async(req,res)=>{
 const url=new URL(req.url,'http://localhost');const prefix='/OSINT-Hunter/';
 if(!url.pathname.startsWith(prefix)){res.writeHead(404).end();return;}
 const file=url.pathname.slice(prefix.length)||'index.html';
 if(!Object.hasOwn(assets,file)){res.writeHead(404).end();return;}
 try{const body=await readFile(path.join(__dirname,file));res.writeHead(200,{'Content-Type':assets[file],'X-Content-Type-Options':'nosniff','Cache-Control':'no-store'}).end(body);}catch{res.writeHead(404).end();}
}).listen(8765,'127.0.0.1');
