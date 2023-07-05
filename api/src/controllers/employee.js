import dotenv from 'dotenv'
import Ably from 'ably'

import EmployeeModel from '../models/employee.js';
import {createdEmployeeTable} from '../models/employee.js';
import con from '../config/database.js'

dotenv.config({ path: '../../.env' })
const ably = new Ably.Realtime(process.env.ABLY_API_KEY);
await ably.connection.once('connected');
console.log('Connected to Ably!');

export const createEmployee = async(req, res) => {
    const body  = req.body;
    try{ 
        const existingEmployee = EmployeeModel.checkUserExsting(body.email)
        console.log(existingEmployee)
        if(existingEmployee[0]) return res.status(400).json({succes: true, data: null, message: ' Employee already exist!'})
        var employeeModel = new EmployeeModel(body.first_name, body.last_name, body.phone_num, body.email, body.password, body.department, body.role);
        employeeModel.create()
        return res.status(200).json({succes: true, data: null, message: ' Employee profile created successfuly'});
    }catch (error) {
        return res.status(400).json({succes: false, data: null, message: `Error occured ${error}`})
    }

}
export const fetchAllEmployee = async(req, res) => {
    try{
        const result = await EmployeeModel.getAll();
        return res.status(200).json({success: true, data: result, message: `your fetched data`});

    }catch(error){
        return res.status(400).json({succes: false, data: null, message: `Error occured ${error}`})
    }
}
export const fetchAllRecentEmployee = async(req, res) => {
    const currentUserId = req.params.id;
    try{
        const result = await EmployeeModel.getAllRecent(currentUserId);
        return res.status(200).json({success: true, data: result, message: `your fetched data`});
    }catch(error){
        return res.status(400).json({succes: false, data: null, message: `Error occured ${error}`})
    }
}

export const getSingleEmployee = async(req, res) => {
    const userId = req.params.id
    
    try{

        const result = await EmployeeModel.getSingle(userId);
        return res.status(200).json({success: true, data: result, message: `your fetched data`});

    }catch(error){
        return res.status(400).json({succes: false, data: null, message: `Error occured ${error}`})
    }
}

const channel = ably.channels.get('status-channels');


export const updateEmployee = async(req, res) => {
    console.log("update Employee called")

    const userId = req.params.id
    const body = req.body
    // const statusChannel = ably.channels.get('status-channels:userId');
    console.log(`isactive:${body.isActive}`)
    console.log(`password:${body.password}`)
    console.log(`password:${body.email}`)
    try{
        console.log(body.isActive);
        const fetchedEmployee = await EmployeeModel.getSingle(userId);
        // console.log(fetchAllEmployee)
        // if(fetchedEmployee == undefined) return res.status(400).json({succes: false, data: null, message: `User not found`});
        // console.log(body.isActive == undefined ? fetchedEmployee.isActive: body.isActive)
        if(fetchedEmployee == undefined) return res.status(400).json({succes: false, data: null, message: `User not found`});
        const bodyEmployee = new EmployeeModel(
            body.first_name == undefined ? fetchedEmployee.first_name: body.first_name, 
            body.last_name == undefined ? fetchedEmployee.last_name: body.last_name, 
            body.phone_num == undefined ? fetchedEmployee.phone_num: body.phone_num, 
            body.email == undefined ? fetchedEmployee.email: body.email, 
            body.password == undefined ? fetchedEmployee.password: body.password, 
            body.department == undefined ? fetchedEmployee.department: body.department, 
            body.role == undefined ? fetchedEmployee.role: body.role,
            body.isDeleted == undefined ? fetchedEmployee.isDeleted: body.isDeleted,
            body.isActive == undefined ? fetchedEmployee.isActive: body.isActive
            );
            
            bodyEmployee.updateEmployee(userId);
            const result = await EmployeeModel.getSingle(userId);
                  const channel = ably.channels.get('chat-status');
        // console.log("channel chat-status has been created")
        // channel.publish({ name: 'chat-status', data: body.isActive }); 
        
        return res.status(200).json({success: true, data: result, message: `your updated data`}); 
    } catch(error) {
        return res.status(400).json({succes: false, data: null, message: `Error occured ${error}`});
    }
}




export const deleteEmployee = async(req, res) => {
    const userId = req.params.id
    try{
        const fetchedEmployee = await EmployeeModel.getSingle(userId);
        if(fetchedEmployee[0] == undefined) return res.status(400).json({succes: false, data: null, message: `User not found`});
        const bodyEmployee = new EmployeeModel(
            fetchedEmployee[0].first_name, 
            fetchedEmployee[0].last_name, 
            fetchedEmployee[0].phone_num, 
            fetchedEmployee[0].email, 
            fetchedEmployee[0].password, 
            fetchedEmployee[0].department, 
            fetchedEmployee[0].role,
            true
            );
            bodyEmployee.updateEmployee(userId);
        return res.status(200).json({success: true, data: null, message: `Data has been deleted`});
    } catch(error) {
        return res.status(400).json({succes: false, data: null, message: `Error occured ${error}`});
    }
}