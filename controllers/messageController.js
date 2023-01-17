import Message from "../models/Message.js";

const createMessage = async (req,res,next)=>{
        try {
                const newMessage = await Message.create(req.body)
                res.status(201).json(newMessage)
        } catch (error) {
           next(error)     
        }
}
const getMessage = async (req,res,next)=>{
       
        try {
             const messages = await Message.find({conversationId:req.params.conversationId})  
             res.status(201).json(messages)
        } catch (error) {
           next(error)     
        }
}

const getTwoMessage =async (req,res)=>{
        try {
                const message = await Message.findOne({mitglieder:{$all:[req.params.firstUserId,req.params.secondUserId]}})
                res.status(201).json(message)
        } catch (error) {
                res.status(500).send(error)
        }
}

export {createMessage,getMessage,getTwoMessage}