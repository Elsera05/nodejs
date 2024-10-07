
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();


class Cars {

    async getCars(req, res) {
        try {
            const cars = await prisma.cars.findMany({
                select: {
                    id :true,
                    name:true,
                    year:true,
                    type: true,
                    manufactur:true,
                    price: true,
                    img : true,
                    licenseNumber :true,
                    seat : true,
                    baggage :true
                }
            }) //revisi semisalnya mau ditampilih semua tinggal pilih aja yang ditengah dihapus
            console.log(cars)
            res.status(200).json(cars)
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error!")
        }
    }

    async getCarsById(req, res) {
        const { id } = req.params;
        try {
            const car = await prisma.cars.findUnique({
                where: { id: parseInt(id) },
            });
            if (!car) {
                return res.status(404).json({ error: "Car not found" });
            }
            res.status(200).json(car);
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }

    async createCars(req, res) {
        const {
            name, year, type, manufactur, price, img,
            licenseNumber, seat, baggage, transmission,
            description, isDriver, isAvailable
        } = req.body;
        try {
            const car = await prisma.cars.create({
                data: {
                    name,
                    year,
                    type,
                    manufactur,
                    price,
                    img,
                    licenseNumber,
                    seat,
                    baggage,
                    transmission,
                    description,
                    isDriver,
                    isAvailable,
                },
            });
            res.status(201).json(car);
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }
    async updateCar(req, res) {
        const { id } = req.params;
        const {
            name, year, type, manufactur, price, img,
            licenseNumber, seat, baggage, transmission,
            description, isDriver, isAvailable
        } = req.body;
        try {
            const car = await prisma.cars.update({
                where: { id: parseInt(id) },
                data: {
                    name,
                    year,
                    type,
                    manufactur,
                    price,
                    img,
                    licenseNumber,
                    seat,
                    baggage,
                    transmission,
                    description,
                    isDriver,
                    isAvailable,
                },
            });
            res.status(200).json(car);
        } catch (error) {
            console.log(error);
            if (error.code === 'codemu error') {
                return res.status(404).json({ error: "Car not found" });
            }
            res.status(500).send("Internal Server Error");
        }
    }
    

    
    async deleteCar(req, res) {
        const { id } = req.params;
        try {
            const car = await prisma.cars.delete({
                where: { id: parseInt(id) },
            });
            res.status(200).json({ message: "Car deleted successfully" });
        } catch (error) {
            console.log(error);
            if (error.code === 'error code') {
                return res.status(404).json({ error: "Car not found" });
            }
            res.status(500).send("Internal Server Error");
        }
    }
    
}

module.exports = new Cars();


// pool.query("SELECT id, name, year, type, manufactur, price, img from cars")



// async updateCar(req, res) {
//     const { name, year, type, manufactur, price, img,
//         licenseNumber, seat, baggage, transmission,
//         description, isDriver, isAvailable
//     } = req.body;
//     const { id } = req.params;
//     try {
//         const cars = await pool.
//             query(`UPDATE cars set name=$1,year=$2,type=$3,manufactur=$4,
//             price=$5,img=$6,"licenseNumber"=$7,seat=$8,
//             baggage=$9,transmission=$10,description=$11,"isDriver"=$12,
//             "isAvailable"=$13 where id=$14 
//             RETURNING *`, [name, year, type, manufactur, price, img,
//                 licenseNumber, seat, baggage, transmission,
//                 description, isDriver, isAvailable, id])
//         res.status(200).json(cars.rows[0])
//     } catch (error) {
//         console.log(error)
//         res.status(500).send("Internal server error")
//     }
// }


  
// async deleteCar(req, res) {
//     const { id } = req.params;
//     try {
//         const cars = await pool.
//             query(`delete from cars where id=$1`, [id])
//         if (cars.rowCount === 0) return res.status(404).json("Car not found")
//         res.status(200).json("Car deleted Succesfully")
//     } catch (error) {
//         console.log(error)
//         res.status(500).send("Internal server error")
//     }
// }


// kalo mau yang gampang 
// async updateCar(req, res) {
//     const { id } = req.params;
//     try {
//         const car = await prisma.cars.update({
//             where: { id: parseInt(id) },
//             data: req.body,
//         });
//         res.status(200).json(car);
//     } catch (error) {
//         console.log(error);
//         if (error.code === 'codemu error') {
//             return res.status(404).json({ error: "Car not found" });
//         }
//         res.status(500).send("Internal Server Error");
//     }
// const pool = require('../../config/db')



// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// class Car {
//     constructor({ id, name, year, type, manufactur, price, img, licenseNumber, seat, baggage, transmission, description, isDriver, isAvailable }) {
//         this.id = id;
//         this.name = name;
//         this.year = year;
//         this.type = type;
//         this.manufactur = manufactur;
//         this.price = price;
//         this.img = img;
//         this.licenseNumber = licenseNumber;
//         this.seat = seat;
//         this.baggage = baggage;
//         this.transmission = transmission;
//         this.description = description;
//         this.isDriver = isDriver;
//         this.isAvailable = isAvailable;
//     }
// }

// class CarService {
//     async getCars() {
//         try {
//             return await prisma.cars.findMany();
//         } catch (error) {
//             throw new Error("Database Error: " + error.message);
//         }
//     }

//     async getCarById(id) {
//         try {
//             return await prisma.cars.findUnique({ where: { id } });
//         } catch (error) {
//             throw new Error("Database Error: " + error.message);
//         }
//     }

//     async createCar(carData) {
//         try {
//             return await prisma.cars.create({ data: carData });
//         } catch (error) {
//             throw new Error("Database Error: " + error.message);
//         }
//     }

//     async updateCar(id, carData) {
//         try {
//             return await prisma.cars.update({
//                 where: { id },
//                 data: carData,
//             });
//         } catch (error) {
//             throw new Error("Database Error: " + error.message);
//         }
//     }

//     async deleteCar(id) {
//         try {
//             return await prisma.cars.delete({ where: { id } });
//         } catch (error) {
//             throw new Error("Database Error: " + error.message);
//         }
//     }
// }

// class CarsController {
//     constructor() {
//         this.carService = new CarService();
//     }

//     async getCars(req, res) {
//         try {
//             const cars = await this.carService.getCars();
//             res.status(200).json(cars);
//         } catch (error) {
//             console.log(error);
//             res.status(500).send("Internal Server Error");
//         }
//     }

//     async getCarById(req, res) {
//         const { id } = req.params;
//         try {
//             const car = await this.carService.getCarById(parseInt(id));
//             if (!car) {
//                 return res.status(404).json({ error: "Car not found" });
//             }
//             res.status(200).json(car);
//         } catch (error) {
//             console.log(error);
//             res.status(500).send("Internal Server Error");
//         }
//     }

//     async createCar(req, res) {
//         try {
//             const car = new Car(req.body);
//             const newCar = await this.carService.createCar(car);
//             res.status(201).json(newCar);
//         } catch (error) {
//             console.log(error);
//             res.status(500).send("Internal Server Error");
//         }
//     }

//     async updateCar(req, res) {
//         const { id } = req.params;
//         try {
//             const car = new Car(req.body);
//             const updatedCar = await this.carService.updateCar(parseInt(id), car);
//             res.status(200).json(updatedCar);
//         } catch (error) {
//             console.log(error);
//             res.status(500).send("Internal Server Error");
//         }
//     }

//     async deleteCar(req, res) {
//         const { id } = req.params;
//         try {
//             await this.carService.deleteCar(parseInt(id));
//             res.status(200).json({ message: "Car deleted successfully" });
//         } catch (error) {
//             console.log(error);
//             res.status(500).send("Internal Server Error");
//         }
//     }
// }

// module.exports = new CarsController();


// const Joi = require("joi");

// const BaseController = require('../base')
// const CarModel = require('../../models/cars')

// const cars = new CarModel();

// const carSchema = Joi.object({
//   name: Joi.string().required(),
//   price: Joi.number().required(),
//   type: Joi.string(),
//   manufactur: Joi.string().required(),
//   isDriver: Joi.boolean().required(),
//   img: Joi.string().uri().allow(null),
//   description: Joi.string().allow(null),
//   isAvailable: Joi.boolean(),
//   licenseNumber: Joi.string(),
//   seat: Joi.number().min(2),
//   baggage: Joi.number(),
//   transmission: Joi.string(),
//   year: Joi.string(),
// })

// class CarsController extends BaseController {
//   constructor(model) {
//     super(model);
//     this.router.get("/", this.getAll);
//     this.router.post("/", this.validation(carSchema), this.create);
//     this.router.get("/:id", this.get);
//     this.router.put("/:id", this.validation(carSchema), this.update);
//     this.router.delete("/:id", this.delete);
//   }
// }

// const carsController = new CarsController(cars);

// module.exports = carsController.router