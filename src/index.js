require('dotenv/config');
const express = require('express');
const router = require('./routers/api');
const cors = require('cors');
const server = express();


server.use(
  cors({
    origin: '*',
  })
);

//needed to be able to read JSON-encoded body data
server.use(express.json()); 

// support URL-encoded body
server.use(express.urlencoded({extended:true})); 

//initialize routers
server.use('/api', router);

//error handling middleware
server.use( (err,req, res, next) => {
  res.status(422).send({error:err.message});
})

server.listen(process.env.PORT || 4000, () => 
  console.log(`API Server listening on port:${process.env.PORT}`)
);