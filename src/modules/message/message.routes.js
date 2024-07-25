import  express  from "express";
import { addMessage, getMessage } from "./message.controller.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { addMessageSchema } from "./message.validator.js";

const messageRoutes = express.Router()



/*  A D D      M E S S A G E    */
messageRoutes.post("/",validation(addMessageSchema),addMessage)


/*  G E T     M E S S A G E     */
messageRoutes.get("/",auth,getMessage)



















export default messageRoutes