
import { userModel } from "../../../database/model/user.model.js"
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"
import { sendEmail } from "../../email/sendEmail.js"
import { handleAsynError } from "../../middleware/handleAsyncError.js"
import { appError } from "../../utils/appError.js"



/* S I G N      U P      */

export const signUp = handleAsynError(async (req, res, next) => {

    let { name, email, password, rePassword } = req.body
        let foundeduser = await userModel.findOne({ email })
        if (foundeduser) return next(new appError(`email already exist`, 409))

        let hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUNDES))
        let addeduser = await userModel.insertMany({ name, email, password: hashPassword })
        let verifyToken = Jwt.sign({ id: addeduser[0]._id }, process.env.VERIFY_SECRET)

        sendEmail({ email, api: `http://localhost:3000/api/v1/user/verify/${verifyToken}` })
        res.status(201).json({ message: "user added", addeduser })

})


/* S I G N      I N  */
export const signIn = handleAsynError(async (req, res, next) => {
    let { email, password } = req.body   
        let foundeduser = await userModel.findOne({ email })
        if (foundeduser) {
            if (foundeduser.verified) {
                let matched = bcrypt.compareSync(password, foundeduser.password)
                console.log(matched);
                if (matched) {
                    let token = Jwt.sign({ id: foundeduser._id }, process.env.SECRET_KEY)
                    res.status(200).json({ message: "welcome", token })
                } else {
                    next(new appError("wrong password", 400))
                }
            } else {
                next(new appError("u have to verify your email first", 401))
            }
        } else {
            next(new appError("u have to register first", 404))
        }
    
})


/* V E R I F Y       T O K E N    */


export const verifyEmail = handleAsynError((req, res) => {
    let { token } = req.params
    Jwt.verify(token, process.env.VERIFY_SECRET, async (err, decoded) => {
        if (err) return next(new appError(" token error", 401))
        let userUpdate = await userModel.findByIdAndUpdate(decoded.id, { verified: true }, { new: true })
        res.status(200).json({ message: "success", userUpdate })

    })


})