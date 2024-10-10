const BaseModel = require("./index");
class OrderModel extends BaseModel {
  constructor() {
    super("order");
    this.select = {
        fullname: true,
        email: true,
        password: true,
        role: true,
        address: true,
        gender: true,
        avatar: true,
        phone_number: true,
        driver_license: true,
        birthdate: true,
    };
  }
}

module.exports = OrderModel