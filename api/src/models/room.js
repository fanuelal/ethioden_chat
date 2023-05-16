import dotenv from 'dotenv'
import con from '../config/database.js'
import { v4 as uuidv4 } from 'uuid';
import {passwordEncryptor} from '../helper/encrypted.js'
dotenv.config('../../.env')


const RoomModel = class{
    id 
    name
    type
    created_by
    isDeleted
    constructor(name,type , created_by, isDeleted){
        // this.id = id;
        this.name = name;
        this.type = type;
        this.created_by = created_by; 
        this.isDeleted = isDeleted;
    }

     create = async() => {
        
        const query = `INSERT INTO chats ( id, text, inRoom, roomId, reciverId, senderId) 
               VALUES ('${uuidv4()}', '${this.text}', '${this.inRoom}', '${roomId}','${this.reciverId}', '${this.senderId}'')`;
        con.query(query, (error, result, failed) => {
            if(error) throw(error)
            console.log(result.datatype)
            return result
        });
        return null;
    }

    static getAll = async () => {
           var fetchedData; 
          return new Promise((resolve, reject) => {con.query('SELECT * FROM `chats` WHERE isDeleted = false', (err, result, fields) => {
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

    static getSingle = async (chatId) => {
        console.log(chatId)
       return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM chats WHERE id='${chatId}' AND isDeleted = 'false'`, (err, result, fields) => {
         if (err) reject(err);
         resolve(result);
       });
      
   }).then((data) => {
     return data
 });
 }

     updateChat = async(userId) => {
        return new Promise((resolve, reject) => {
            con.query(`UPDATE chats SET  first_name = '${this.first_name}', 
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

    // static employeeIsAvailable = async (email, password) => {
    //     console.log(email, password)
    //     return new Promise((resolve, reject) => {
    //         con.query(`SELECT email, password, role FROM employees WHERE email='${email}'`, (err, result, fields) => {
    //          if (err) reject(err);
    //          console.log(result)
    //          resolve(result);
    //        });
          
    //    }).then((data) => {
    //      return data[0]
    //  });
    // }
}




export default RoomModel;

export const createdRoomTable = () => {
    
    con.query(`USE ${process.env.MYSQL_DB};`, (error, result, failed) => {
            if(error) throw error;
            console.log('creating table............')
            return con.query(`CREATE TABLE IF NOT EXISTS rooms(
                id VARCHAR(50) PRIMARY KEY NOT NULL, 
                name VARCHAR(50),
                type VARCHAR(50),
                created_by VARCHAR(50),
                isDeleted BOOLEAN DEFAULT false,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (created_by) REFERENCES employees(id),
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );`, (err, res, failed) => {

                if(err) throw err;
                console.log("table has been created")
                console.log(res)
                return res;
            })
    })
    
}