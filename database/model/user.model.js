import { Schema ,model } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        minLength:[3,"name is too short"],
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        minLength:[4,"password is too short"],
        maxLength:[100,"password is too long"],
    },
    verified:{
        type:Boolean,
        default:false
        }
},{
    timestamps:true
})


export const userModel = model("user",userSchema)
