import dotenv from 'dotenv'
import con from '../config/database.js'
import { v4 as uuidv4 } from 'uuid';
import {passwordEncryptor} from '../helper/encrypted.js'
dotenv.config('../../.env')


const EmployeeModel = class{
    id
    first_name
    last_name
    phone_num
    email
    password
    department
    role
    isActive
    isDeleted
    constructor(first_name, last_name, phone_num, email, password, department, role, isDeleted,isActive){
        // this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_num = phone_num;
        this.email = email;
        this.password = password;
        this.department = department;
        this.role = role;
        this.isDeleted = isDeleted;
        this.isActive = isActive;
    }

     create = async() => {
        console.log("creating ...")
        var encryptedPass = passwordEncryptor(this.password)
        const query = `INSERT INTO employees (id, first_name, last_name, phone_num, email, password, department, role) 
               VALUES ('${uuidv4()}', '${this.first_name}', '${this.last_name}', '${this.phone_num}', '${this.email}', '${encryptedPass}', '${this.department}', '${this.role}')`;
        con.query(query, (error, result, failed) => {
            if(error) throw(error)
            return result
        });
        return null;
    }

    static getAll = async () => {
           var fetchedData; 
          return new Promise((resolve, reject) => {con.query('SELECT * FROM `employees` WHERE isDeleted = false', (err, result, fields) => {
            if (err) reject(err);
            resolve(result);
          });
         
      }).then((value) => {
        fetchedData = value;
        const extractedData = fetchedData.map((data)=> {
            // console.log(data.id)
            return data
        })
        return extractedData
    })
    }

    static getSingle = async (userId) => {
        console.log(userId)
       return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM employees WHERE id='${userId}' AND isDeleted = 'false'`, (err, result, fields) => {
         if (err) reject(err);
         resolve(result[0]);
       });
      
   }).then((data) => {
     return data
 });
 }
    static checkUserExsting = async(email) => {
        // console.log(email)
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM employees WHERE email='${email}'`, (error, result, fail) => {
                if(error) reject(error)
                // console.log(result)
                resolve(result)
            });
        }).then((data) =>  {
            // console.log(data);
            return data
        });
    }
     updateEmployee = async(userId) => {
        return new Promise((resolve, reject) => {
            con.query(`UPDATE employees SET  first_name = '${this.first_name}', 
            last_name = '${this.last_name}', 
            isDeleted = '${this.isDeleted}', 
            isActive = '${this.isActive}', 
            department = '${this.department}',
            email = '${this.email}',
            role = '${this.role}' WHERE id = '${userId}'`, (error, result, fields) => {
                if(error) reject(error);
                resolve(result)
            })
        }).then((data) => {
            return data;
        })
    }

    static employeeIsAvailable = async (email) => {
        console.log(email)
        return new Promise((resolve, reject) => {
            con.query(`SELECT email, password, role FROM employees WHERE email='${email}'`, (err, result, fields) => {
             if (err) reject(err);
             console.log(result)
             resolve(result);
           });
          
       }).then((data) => {
         return data[0]
     });
    }
}


export const createdEmployeeTable = () => {
    
    con.query(`USE ${process.env.MYSQL_DB};`, (error, result, failed) => {
            if(error) throw error;
            return con.query(`CREATE TABLE IF NOT EXISTS employees(
                id VARCHAR(50) PRIMARY KEY NOT NULL, 
                first_name VARCHAR(50), 
                last_name VARCHAR(50), 
                phone_num VARCHAR(15),  
                email VARCHAR(50),
                password VARCHAR(100), 
                department VARCHAR(50), 
                isActive BOOLEAN DEFAULT true, 
                isDeleted BOOLEAN DEFAULT false, 
                lastSeen DATETIME, 
                role VARCHAR(50), 
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP);`, (err, res, failed) => {

                if(err) throw err;
                console.log(res)
                return res;
            })
    })
    
}

export default EmployeeModel;