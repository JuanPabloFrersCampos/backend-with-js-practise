const express = require('express');
//TO deal with file paths (OS)
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const members = require('./members');
const logger = require('./middleware/logger');

//Init middleware
//app.use(logger);

//The apllication will listen on PORT variable value or 5000
app.listen(PORT, () => console.log(`Server runing on ${PORT}`));

//Routes:
/*Classic way to route, but unefficient
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
*/

//Set static folder
/*This is a way of simple routing: THe middleware will look on the
disk for the files that are being asked for, and will be served to
the client as they are on the server. Works for static files*/
 
app.use(express.static(path.join(__dirname, 'public')));

/* Following, we will use Expres for what it was made, APIs, and dinam
yc websites. */



//Gets all members
app.get('/api/members', (req, res) => {
  res.json(members);
})

//Get an specific member
app.get('/api/members/:id', (req, res) => {

  //Check if member exists
  const found = members.some(member =>
    member.id === Number.parseInt(req.params.id));
  
  if (!found){
    res.status(400).json({msg:' member not found'});
  } else{
    res.json(members.filter(member =>
      member.id === Number.parseInt(req.params.id)));
  }
});