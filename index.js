require('dotenv').config()
const express = require('express');
const http = require('http');
const routes = require('./src/routes');
const PORT = 3000;

const app = express();
const server = http.createServer(app); 
app.use(express.json())

app.use(routes);

app.use((req,res)=>{
    res.status(404).send("sorry,page not found");
});

server.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});