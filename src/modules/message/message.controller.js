import { messageModel } from "../../../database/model/message.model.js"
import { userModel } from "../../../database/model/user.model.js"
import { handleAsynError } from "../../middleware/handleAsyncError.js"




/*  A D D      M E S S A G E    */

export const addMessage = handleAsynError(async (req,res ) =>{
    let {messageText,receivedId}=req.body
    let existUser = await userModel.findById(receivedId)
    if (!existUser) return res.json({message:"user not found"})
    
    let addedMessage = await messageModel.insertMany({messageText,receivedId})
    res.status(200).json({ message: "success", addedMessage })

})


/*  G E T     M E S S A G E     */
export const getMessage = handleAsynError(async (req,res ) =>{
    let allMessages = await messageModel.find({receivedId:req.userId})
    res.status(200).json({ message: "success", allMessages })
})
