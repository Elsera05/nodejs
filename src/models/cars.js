const BaseModel = require("./index");

//inheritance
class CarModel extends BaseModel {
  constructor() {
    super("cars");
    this.select = {
        id: true,
        name: true,
        manufactur: true,
        img: true,
        year: true,
        price: true,
    };
  }
}

module.exports = CarModel


// const BaseModel = require("./index");

// //inheritance
// class CarModel extends BaseModel {
//   constructor() {
//     super("cars");
//     this.select = {
//         id: true,
//         name: true,
//         manufactur: true,
//         img: true,
//         year: true,
//         price: true,
//     };
//   }
// }

// module.exports = CarModel
