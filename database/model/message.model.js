import { Schema ,Types,model } from "mongoose";

const messageSchema = new Schema({
    messageText:{
        type:String,
        minLength:[3,"text is too short"],
        require:true
    },
    receivedId:{
        type:Types.ObjectId,
        ref:"user"
    },
 
},{
    timestamps:true
})


export const messageModel = model("message",messageSchema)