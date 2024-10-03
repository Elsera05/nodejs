// core module 
const os = require("os");
const fs = require("fs");

//local module bawaab dari node js
const LuasSegitiga = require("./LuasSegitiga");


// membuat file menggunakan module fs
fs.writeFileSync("text.txt","bikin file");

// membaca file menggunakan module fs
const data = fs.readFileSync("text.txt","utf-8");
console.log(data);
console.log("misaki");
console.log(os.hostname())
console.log(os.freemem())
console.log(LuasSegitiga(2,3))
// console.log(os.networkInterfaces())