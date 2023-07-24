import dotenv from 'dotenv'
import ChatModel from '../models/chat.js';
import Ably from 'ably'
import {createdChatTable} from '../models/chat.js';

dotenv.config({ path: '../../.env' })
const ably = new Ably.Realtime(process.env.ABLY_API_KEY);
await ably.connection.once('connected');
console.log('Connected to Ably!');

export const createChat = async (req, res) => {
    const body = req.body;
    console.log(req.body)
    try {
      const chat = new ChatModel(body.text, body.inRoom, body.roomId, body.reciverId, body.senderId);
      const chatId = chat.create();
      const messageData = {
        chatId:chatId,
        text: body.text,
        inRoom: body.inRoom,
        roomId: body.roomId,
        senderId: body.senderId,
        reciverId: body.reciverId,
        created_at: new Date()
       
      };
      let channel=""
      const ids = [body.senderId, body.reciverId]
      const sortedIds =  ids.sort()
      if(body.reciverId !==null){
        channel  = ably.channels.get(`private_chat:${sortedIds[0]}${sortedIds[1]}`);
        channel.publish({ name:'private_chat', data: messageData }); 
        //  console.log(body.reciverId)
      }else{
         channel = ably.channels.get(`group_chat`);
        channel.publish({ name:'group_chat', data: messageData }); 
        //  console.log(channel)
      }
      
     
      
          //  console.log(messageData);
      return res.status(200).json({ success: true, data: chatId, message: 'Chat created successfully' });
    } catch (error) {
      throw error;
    }
  }
  

  export const getAllChats = async (req, res) => {
    const querySenderId = req.query.senderId;
    const queryReciverId = req.query.reciverId;
    
    try {
      const result = await ChatModel.getAll(querySenderId, queryReciverId);
      console.log(result);
  
      return res.status(200).json({ message: 'Fetch success', status: 200, data: result });
      
    } catch (error) {
      return res.status(400).json({ success: false, data: null, message: `Error occurred: ${error}` });
    }
  }
  export const getChannel = async (req, res) => {
    const queryRoomId = req.query.roomId;
    try {
      const result = await ChatModel.getChannelChat(queryRoomId);
      console.log(result);
      return res.status(200).json({
        message: 'Fetch success',
        status: 200,
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        data: result,
        message: `Error occurred: ${error}`,
      });
    }
  };
  
  
  export const getLastChat = async(req,res)=>{
    const querySenderId = req.query.senderId;
    const queryReciverId = req.query.reciverId;
    
    try{
const result= await ChatModel.getLast(querySenderId,queryReciverId);
console.log(result)

return res.status(200).json({message:'fetched successfully',status:200 ,data : result})
    }catch(err){
      return res.status(400).json({success:false,data:null,message:`error occured: ${err}`});
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