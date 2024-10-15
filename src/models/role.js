const BaseModel = require("./index");

//inheritance
class RoleMopel extends BaseModel {
  constructor() {
    super("users");
    this.select = {
        id: true,
        role:true,
    };
  }
}

module.exports = RoleMopel;