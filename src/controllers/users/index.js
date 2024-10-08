const Joi = require("joi");
const BaseController = require('../base')
const UserModel = require('../../models/users')
const express = require("express");
const { encryptPassword } = require("../../helpers/bcrypt.js");
const router = express.Router();
const {authorize, checkRole} = require("../../middlewares/authorization")

const users = new UserModel();

const userSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'user', 'driver').required(),
    address: Joi.string().required(),
    gender: Joi.string().valid('male', 'female',).allow(null),
    avatar: Joi.string().uri().allow(null),
    phone_number: Joi.string().required(),
    driver_license: Joi.string().allow(null),
    birthdate: Joi.date().allow(null),
});

class UsersController extends BaseController {
    constructor(model) {
        super(model);
        router.get("/", this.getAll);
        router.post("/", this.validation(userSchema), authorize, checkRole(['admin']), this.checkUnique, this.encrypt, this.create);
        router.get("/:id", this.get);
        router.put("/:id", this.validation(userSchema), authorize, checkRole(['admin']), this.checkUnique, this.update);
        router.delete("/:id", this.delete);
    }
    // middleware
    checkUnique = async (req, res, next) => {
        const checkUnique = await this.model.getOne({
            where: {
                OR: [
                    {
                        email: req.body.email,
                    },
                    {
                        phone_number: req.body.phone_number,
                    },
                ],
            },
            select: {
                email: true,
                phone_number: true,
            },
        });
        if (checkUnique)
            return next(new ValidationError("email or phone number already exist"));
        next()
    };
    // Middleware to encrypt password
    encrypt = async (req, res, next) => {
        const encryptedPass = await encryptPassword(req.body.password);
        req.body.password = encryptedPass;
        next();
    }
}


new UsersController(users);
// const usersController = 

module.exports = router