const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // if (req.url === '/'){
  //   fs.readFile(path.join(__dirname, 'public', 'index.html'), (error, content) => {
  //     if (error) throw error;
  //     res.writeHead(200, {'Content-Type': 'text/html'});
  //     res.end(content);
  //   })
  // }

  // if (req.url === '/about'){
  //   fs.readFile(path.join(__dirname, 'public', 'about.html'), (error, content) => {
  //     if (error) throw error;
  //     res.writeHead(200, {'Content-Type': 'text/html'});
  //     res.end(content);
  //   })
  // }

  // if (req.url === '/api/users'){
  //   const users = [
  //     {name: 'Bob Smith', age: 40},
  //     {name: 'John Doe', age: 30}
  //   ];

  //   res.writeHead(200, {'Content-Type': 'application/json'});
  //   res.end(JSON.stringify(users));
  // }

  //Build of a dinamic file path
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

  //Get extension of file
  let extName = path.extname(filePath);

  // Initial content type
  let contentType = 'text/html';

  //Check external name, and set content type
  switch(extName){
    case '.js':
      contentType= 'text/javascript';
      break;
    case '.json':
      contentType= 'application/json';
      break;
  }

  //Read file
  fs.readFile(filePath, (error, content) => {
    if (error){
      if (error.code == 'ENOENT'){
        //Page not found
        fs.readFile(path.join(__dirname, 'public', '404.html'), (error, content) => {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(content, 'utf8');
        })
      } else{
        //Possibly some server error
        res.writeHead(500);
        res.end(`Server error: ${error.code}`);
      }
    } else{
      //Success
      res.writeHead(200, {'Content-Type': contentType});
      res.end(content, 'utf8');
      }
  })
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));