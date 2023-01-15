import Conversation from "../models/Conversation.js";

const createConversation = async (req,res)=>{
        const newConversation = new Conversation({members:[req.body.senderId,req.body.receiverId]})
        try {
                const savedConversation = await newConversation.save()
                res.status(201).json(savedConversation)
        } catch (error) {
           res.status(500).send(error)     
        }
}
const getConversation = async (req,res)=>{
       
        try {
             const conversation = await Conversation({members:{$in:[req.params.userId]}})  
             res.status(201).json(conversation)
        } catch (error) {
           res.status(500).send(error)     
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