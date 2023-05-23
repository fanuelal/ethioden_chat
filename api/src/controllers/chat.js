import dotenv from 'dotenv'
import ChatModel from '../models/chat.js';
import {createdChatTable} from '../models/chat.js';

dotenv.config({ path: '../../.env' })
export const createChat = async(req, res) => {
    const body = req.body
    
    try{
        var chat = new ChatModel(body.text, body.inRoom, body.roomId, body.reciverId, body.senderId)
        const chatId = chat.create()

        return res.status(200).json({succes: true, data: chatId, message: ' Chat created successfuly'});
    }catch(error){
        throw(error);
    }
}
export const getAllChats = async(req, res) => {
    const queryUserId = req.query.userId
    
    try{
        const result = await ChatModel.getAll(queryUserId)
        console.log(result)
        return res.status(200).json({message: `fetch success`, status: 200, data: result});
    }catch(error){
        return res.status(400).json({succes: false, data: null, message: `Error occured ${error}`}); 
    }

} 

export const getSingleChat = async(req, res) => {
    const chatId = req.params.id
    try{
        const result = await ChatModel.getSingle(chatId)

        return res.status(200).json({message: `fetch success`, status: 200, data: result});
    }catch(error){
        return res.status(400).json({succes: false, data: null, message: `Error occured ${error}`}); 
    }
}

export const updateChat = async(req, res) => {
    const chatId = req.params.id
    const body = req.body
    try{
        const chatModel = new ChatModel(body.text)
        const result = await chatModel.updateChat(chatId)

        return res.status(200).json({message: `update success`, status: 200, data: null});
    }catch(error){
        return res.status(400).json({succes: false, data: null, message: `Error occured ${error}`}); 
    }
}


export const deleteChat = async(req, res) => {
    const param = req.params.id
    try{
        const result = await ChatModel.deleteChat(param)
        return res.status(200).json({message: `Deleted success`, status: 200, data: null});
    }catch(error){
        return res.status(400).json({succes: false, data: null, message: `Error occured ${error}`}); 
    }
}