import dotenv from 'dotenv'
import StatusModel from '../models/status.js';

dotenv.config({ path: '../../.env' })
export const createStatus = async(req, res) => {
    const body = req.body
    
    try{
        var status = new StatusModel(body.label, body.ends_at,  body.userId)
        status.create()
        return res.status(200).json({succes: true, data: null, message: ' Status created successfuly'});
    }catch(error){
        throw(error);
    }
}
export const getAllStatus = async(req, res) => {
    try{
        const result = await StatusModel.getAll()
        return res.status(200).json({message: `fetch success`, status: 200, data: result});
    }catch(error){
        return res.status(400).json({succes: false, data: null, message: `Error occured ${error}`}); 
    }

} 

export const getSingleStatus = async(req, res) => {
    const userId = req.params.id
    try{
        const result = await StatusModel.getSingle(userId)

        return res.status(200).json({message: `fetch success`, status: 200, data: result});
    }catch(error){
        return res.status(400).json({succes: false, data: null, message: `Error occured ${error}`}); 
    }
}



export const updateStatus = async(req, res) => {
    const statusId = req.params.id
    const body = req.body
    try{
        const statusMod = new StatusModel(body.label, body.ends_at)
        const result = await statusMod.updateStatus(statusId)

        return res.status(200).json({message: `update success`, status: 200, data: null});
    }catch(error){
        return res.status(400).json({succes: false, data: null, message: `Error occured ${error}`}); 
    }
}


export const deleteStatus = async(req, res) => {
    const statusId = req.params.id
    try{
        const result = await StatusModel.deleteStatus(statusId)
        return res.status(200).json({message: `Deleted success`, status: 200, data: null});
    }catch(error){
        return res.status(400).json({succes: false, data: null, message: `Error occured ${error}`}); 
    }
}