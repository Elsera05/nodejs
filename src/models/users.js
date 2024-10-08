const BaseModel = require("./index");

//inheritance
class UserModel extends BaseModel {
  constructor() {
    super("users");
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

module.exports = UserModel