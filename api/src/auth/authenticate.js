import dotenv from 'dotenv'
import EmployeeModel from '../models/employee.js'
import { passwordEncryptor,  passwordchecker} from '../helper/encrypted.js';
import jwt from 'jsonwebtoken'
dotenv.config({path: '../../.env'})

export const authenticate = async(req, res) =>{
    const {email, password} = req.body;
    console.log(password, email)
    if((email === undefined || password === undefined )|| (email === null || password === null )) {
        return res.status(400).json({success: false, data: null, message: `Email and password is required`})
    }
try{
     const existingEmployee = await EmployeeModel.employeeIsAvailable(email);
     const isCorrect = passwordchecker(password, existingEmployee.password);
     if(!isCorrect) return res.status(400).json({success: false, data: null, message: `Wrong email or password`})
    
    const genToken = tokenGenerator(existingEmployee)
    return res.status(200).json({success: true, data: {existingEmployee, genToken}, message: `your token has been successfully generated`})
}catch(error){
    return res.status(400).json({succes: false, data: null, message: `Error occured ${error}`})
}

}

const tokenGenerator = (employee) => {
    return jwt.sign(
        {employee},
        process.env.SERVER_KEY,
        {
            expiresIn: '1h'
        }
    )
}