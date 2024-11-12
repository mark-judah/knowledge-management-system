const jsonServer = require('json-server');
const path = require('path')
const server = jsonServer.create();
const fs = require('fs')
const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')))
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3200; 

server.use(middlewares);
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
}))
server.use(router);

server.listen(port);

module.exports=server