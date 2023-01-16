import Conversation from "../models/Conversation.js";

const createConversation = async (req,res,next)=>{
        
        try {
                const newConversation = await Conversation.create({mitglieder:[req.body.senderId,req.body.empfängerId]})
                res.status(201).json(newConversation)
        } catch (error) {
           next(error)     
        }
}
const getConversation = async (req,res,next)=>{
       
        try {
             const conversation = await Conversation.findOne({members:{$in:[req.params.userId]}})  
             res.status(201).json(conversation)
        } catch (error) {
           next(error)     
        }
}

const getTwoConversation =async (req,res)=>{
        try {
                const conversation = await Conversation.findOne({members:{$all:[req.params.firstUserId,req.params.secondUserId]}})
                res.status(201).json(conversation)
        } catch (error) {
                res.status(500).send(error)
        }
}

export {createConversation,getConversation,getTwoConversation}