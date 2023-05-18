import dotenv from 'dotenv'
import ChatModel from '../models/room.js';
import {createdChatTable} from '../models/chat.js';
import RoomModel from '../models/room.js';

dotenv.config({ path: '../../.env' })
export const createRoom = async(req, res) => {
    const body = req.body
    
    try{
        var room = new RoomModel(body.name, body.type, body.created_by)
        room.create()
        return res.status(200).json({succes: true, data: null, message: ' room created successfuly'});
    }catch(error){
        throw(error);
    }
}
export const getAllRooms = async(req, res) => {
    try{
        const result = await RoomModel.getAll()
        console.log(result)
        return res.status(200).json({message: `fetch success`, status: 200, data: result});
    }catch(error){
        return res.status(400).json({succes: false, data: null, message: `Error occured ${error}`}); 
    }

} 

export const getSingleRoom = async(req, res) => {
    const roomId = req.params.id
    try{
        const result = await RoomModel.getSingle(roomId)

        return res.status(200).json({message: `fetch success`, status: 200, data: result});
    }catch(error){
        return res.status(400).json({succes: false, data: null, message: `Error occured ${error}`}); 
    }
}

export const updateRoom = async(req, res) => {
    const roomId = req.params.id
    const body = req.body
    try{
        const RoomMode = new RoomModel(body.name, body.type)
        const result = await RoomMode.updateRoom(roomId)

        return res.status(200).json({message: `update success`, status: 200, data: null});
    }catch(error){
        return res.status(400).json({succes: false, data: null, message: `Error occured ${error}`}); 
    }
}


export const deleteRoom = async(req, res) => {
    const roomId = req.params.id
    try{
        const result = await RoomModel.deleteRoom(roomId)
        return res.status(200).json({message: `Deleted success`, status: 200, data: null});
    }catch(error){
        return res.status(400).json({succes: false, data: null, message: `Error occured ${error}`}); 
    }
}