const Joi = require("joi");
const BaseController = require('../base');
const UserModel = require('../../models/users');
const express = require("express");
const { checkPassword, encryptPassword } = require("../../helpers/bcrypt.js");
const { createToken } = require("../../helpers/jwt.js");
const ServerError = require("../../helpers/errors/server.js");
const ValidationError = require("../../helpers/errors/validation.js"); 
const router = express.Router();

const users = new UserModel();

const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
        .message({
            "string.min": `password mus length must be least {#limit} characters long`,
            "string.pattern.base:":`Paswword must have at least 1 uppercase 
            1 lowercase , 1 number , and 1 special character(i.e. !@#$%^&*)`,
        })
});

const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()


});

class AuthController extends BaseController {
    constructor(model) {
        super(model);
        router.post("/signIn", this.validation(signInSchema), this.signIn);
        router.post("/signUp", this.validation(signUpSchema), this.signUp); 
    }

    signIn = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await this.model.getOne({
                where: {
                    email,
                }
            });
            if (!user) return next(new ValidationError("Invalid email or password"));

            const isMatch = await checkPassword(password, user.password);

            if (!isMatch) return next(new ValidationError("Invalid email or password"));

            const token = createToken({
                id: user.id,
            });
            return res.status(200).json(
                this.apiSend({
                    code: 200,
                    status: "success",
                    message: "Sign In Successfully",
                    data: {
                        user: {
                            ...user,
                            id: undefined,
                            password: undefined
                        },
                        token
                    }
                })
            );
        } catch (e) {
            next(new ServerError(e));
        }
    }

    signUp = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            // cek validasi jika ada user baru 
            const existingUser = await this.model.getOne({ where: { email } });
            if (existingUser) return next(new ValidationError("Email already in use"));

            // hashing 
            const hashedPassword = await encryptPassword(password, 10);
            const newUser = await this.model.set({ email, password: hashedPassword,role:"user" });
            // const token = createToken({ id: newUser.id });

            return res.status(201).json(
                this.apiSend({
                    code: 201,
                    status: "success",
                    message: "User created successfully",
                    data: {
                        user: {
                            ...newUser,
                            id: undefined,
                            password: undefined
                        },
                    }
                })
            );
        } catch (e) {
            next(new ServerError(e));
        }
    }
}

new AuthController(users);
module.exports = router;




// const Joi = require("joi");
// const BaseController = require('../base')
// const UserModel = require('../../models/users')
// const express = require("express");
// const { checkPassword } = require("../../helpers/bcrypt.js");
// const { createToken } = require("../../helpers/jwt.js");
// const ServerError = require("../../helpers/errors/server.js");
// const router = express.Router();

// const users = new UserModel();

// const signUpSchema = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().min(8).required()
//         .pattern(/^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#\$%\^&\*])(?=.{8,})/),
// });

// const signInSchema = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().min(8).required()
// });


// class AuthController extends BaseController {
//     constructor(model) {
//         super(model);
//         router.post("/signIn", this.validation(signInSchema), this.signIn);
//         router.post("/signUp", this.validation(authSchema), this.signUp);

//     }
//     // middleware
//     signIn = async (req, res, next) => {
//         try {
//             const { email, password } = req.body;
//             const user = await this.model.getOne({
//                 where: {
//                     email,
//                 }
//             }); if (!user) return next(new ValidationError("invalid email or password"))

//             const isMatch = await checkPassword(password, user.password);

//             if (!isMatch) return next(new ValidationError("Invalid email or password"))

//             const token = createToken({
//                 id: user.id,
//             });
//             return res.status(200).json(
//                 this.apiSend({
//                     code: 200,
//                     status: "success",
//                     message: "Sign In Succesfully ",
//                     data: {
//                         user: {
//                             ...user,
//                             id: undefined,
//                             password: undefined
//                         },
//                         token
//                     }
//                 }))
//         } catch (e) {
//             next(new ServerError(e));
//         }
//     }
// }


// new AuthController(users);
// module.exports = router