import Joi from "joi";

export const addMessageSchema = Joi.object({
    messageText:Joi.string().min(30).max(300).required(),
    receivedId:Joi.string().hex().length(24).required()
})