import  express  from "express";
import { signIn, signUp ,verifyEmail } from "./user.controller.js";
import { validation } from "../../middleware/validation.js";
import { signInSchema, signUpSchema } from "./user.validator.js";
const userRoutes = express.Router()


/* S I G N      U P  */

userRoutes.post("/signUp",validation(signUpSchema),signUp)

/* S I G N      I N  */
userRoutes.post("/signIn",validation(signInSchema),signIn)


/* V E R I F Y       T O K E N    */
userRoutes.get("/verify/:token",verifyEmail)















export default userRoutes