const BaseModel = require("./index");

//inheritance
class CarModel extends BaseModel{
    constructor (){
        super ("car");
        this.select = {
            id:true,
            name:true,
            manufactur :true,
            img:true,
            year:true,
            price:true,
        };
    }
}

module.exports =CarModel