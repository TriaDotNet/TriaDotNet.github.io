import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'dist');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.gif':'image/gif','.webp':'image/webp','.mp4':'video/mp4','.mp3':'audio/mpeg','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf','.otf':'font/otf'};
const port=Number(process.env.PORT||4173);
http.createServer((req,res)=>{
 let target=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
 if(!target.startsWith(root+path.sep)&&target!==root){res.writeHead(403);return res.end();}
 if(!fs.existsSync(target)||fs.statSync(target).isDirectory()){
   if(path.extname(target)&&!target.endsWith('.html')){console.log('MISSING',req.url);res.writeHead(404);return res.end();}
   target=path.join(root,'index.html');
 }
 const stat=fs.statSync(target), range=req.headers.range;
 if(range){const [a,b]=range.replace('bytes=','').split('-');const start=Number(a),end=b?Math.min(Number(b),stat.size-1):stat.size-1;res.writeHead(206,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Content-Range':`bytes ${start}-${end}/${stat.size}`,'Accept-Ranges':'bytes','Content-Length':end-start+1});fs.createReadStream(target,{start,end}).pipe(res);}
 else{res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Content-Length':stat.size,'Accept-Ranges':'bytes'});fs.createReadStream(target).pipe(res);}
}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
