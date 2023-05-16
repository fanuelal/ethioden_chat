import dotenv from 'dotenv'
import ChatModel from '../models/chat.js';
import {createdChatTable} from '../models/chat.js';

dotenv.config({ path: '../../.env' })
export const createChat = async(req, res) => {
    const body = req.body
    try{
        createdChatTable()
        var chat = new ChatModel(body.text, body.inRoom, body.roomId, body.reciverId, body.senderId)
        chat.create()
        return res.status(200).json({succes: true, data: null, message: ' Chat created successfuly'});
    }catch(error){
        throw(error);
    }
}
export const getAllChats = async(req, res) => {
    try{
        createdTable();
        console.log('get all chat called')
        const result = ChatModel.getAll()
        return res.status(200).json({message: `fetch success`, status: 200, data: result});
    }catch(error){
        return res.status(400).json({succes: false, data: null, message: `Error occured ${error}`}); 
    }
} 