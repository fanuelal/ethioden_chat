import dotenv from 'dotenv'
import ChatModel from '../models/room.js';
import {createdChatTable} from '../models/chat.js';
import RoomModel from '../models/room.js';

dotenv.config({ path: '../../.env' })
export const createRoom = async (req, res) => {
    const { name, type, created_by, members } = req.body;
  
    try {
      const newRoom = new RoomModel(name, type, created_by, false, members);
      await newRoom.create();
      return res.status(200).json({ success: true, data: newRoom, message: 'Room created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, data: null, message: 'Failed to create room' });
    }}
export const getAllRooms = async(req, res) => {
    const type = req.query.type;
    const userId = req.query.userId;

    try{
        const result = await RoomModel.getRoomsByUserId(userId, type);
        console.log(result)
        // console.log("result is above this")
        return res.status(200).json({message: `fetch success`, status: 200, data: result});
    }catch(error){
        return res.status(400).json({succes: false, data: null, message: `Error occured ${error}`}); 
    }
} 

export const getSingleRoom = async(req, res) => {
    const roomId = req.params.id
    try{
        const result = await RoomModel.getSingle(roomId)
        var roomDetail = {}
        roomDetail.members = result
        roomDetail.name = result[0].name
        roomDetail.id =roomId
        roomDetail.created_by = result[0].created_by
        return res.status(200).json({message: `fetch success`, status: 200, data: roomDetail});
    } catch(error){
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