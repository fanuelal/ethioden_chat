import dotenv from 'dotenv'
import EmployeeModel from '../models/employee.js';
import {createdEmployeeTable} from '../models/employee.js';

import con from '../config/database.js'
dotenv.config({ path: '../../.env' })
 

export const createEmployee = async(req, res) => {
    const body  = req.body;
  
    try{
        createdTable()
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
        createdTable();
        const result = await EmployeeModel.getAll();
        return res.status(200).json({success: true, data: result, message: `your fetched data`});

    }catch(error){
        return res.status(400).json({succes: false, data: null, message: `Error occured ${error}`})
    }
}

export const getSingleEmployee = async(req, res) => {
    const userId = req.params.id
    
    try{
        createdTable();
        const result = await EmployeeModel.getSingle(userId);
        return res.status(200).json({success: true, data: result, message: `your fetched data`});

    }catch(error){
        return res.status(400).json({succes: false, data: null, message: `Error occured ${error}`})
    }
}

export const updateEmployee = async(req, res) => {
    const userId = req.params.id
    const body = req.body

    try{

        const fetchedEmployee = await EmployeeModel.getSingle(userId);
        if(fetchedEmployee[0] == undefined) return res.status(400).json({succes: false, data: null, message: `User not found`});
        const bodyEmployee = new EmployeeModel(
            body.first_name == null ? fetchedEmployee[0].first_name: body.first_name, 
            body.last_name == null ? fetchedEmployee[0].last_name: body.last_name, 
            body.phone_num == null ? fetchedEmployee[0].phone_num: body.phone_num, 
            body.email == null ? fetchedEmployee[0].email: body.email, 
            body.password == null ? fetchedEmployee[0].password: body.password, 
            body.department == null ? fetchedEmployee[0].department: body.department, 
            body.role == null ? fetchedEmployee[0].role: body.role);
            bodyEmployee.updateEmployee(userId);
            const result = await EmployeeModel.getSingle(userId);
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