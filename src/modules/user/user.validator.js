import Joi from "joi"
/* S I G N      U P        S C H E M A  */
 export const signUpSchema = Joi.object({
    name: Joi.string().min(3).max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][a-z]{3,9}$/).required(),
    rePassword: Joi.string().required().valid(Joi.ref('password'))
})




/* S I G N     I N       S C H E M A  */
export const signInSchema = Joi.object({

    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][a-z]{3,9}$/).required(),

})