import dotenv from 'dotenv'
import con from '../config/database.js'
import { v4 as uuidv4 } from 'uuid';
dotenv.config('../../.env')


const RoomModel = class{
    id 
    name
    type
    created_by
    isDeleted
    constructor(name,type , created_by, isDeleted){
        this.name = name;
        this.type = type;
        this.created_by = created_by; 
        this.isDeleted = isDeleted;
    }

     create = async() => {
        
        const query = `INSERT INTO rooms ( id, name, type, created_by) 
               VALUES ('${uuidv4()}', '${this.name}', '${this.type}','${this.created_by}')`;
        con.query(query, (error, result, failed) => {
            if(error) throw(error)
            console.log(result.datatype)
            return result
        });
        return null;
    }

    static getAll = async () => {
           var fetchedData; 
          return new Promise((resolve, reject) => {con.query('SELECT * FROM `rooms` WHERE isDeleted = false', (err, result, fields) => {
            if (err) reject(err);
            resolve(result);
          });
         
      }).then((value) => {
        fetchedData = value;
        const extractedData = fetchedData.map((data)=> {
            return data
        })
        return extractedData
    })
    }

    static getSingle = async (roomId) => {
        console.log(roomId)
       return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM rooms WHERE id='${roomId}' AND isDeleted = 'false'`, (err, result, fields) => {
         if (err) reject(err);
         resolve(result);
       });
      
   }).then((data) => {
     return data
 });
 }

     updateRoom = async(roomId) => {
        return new Promise((resolve, reject) => {
            con.query(`UPDATE rooms SET  name = '${this.name}', type = '${this.type}'  WHERE id = '${roomId}'`, (error, result, fields) => {
                if(error) reject(error);
                resolve(result)
            })
        }).then((data) => {
            return data;
        })
    }

    static deleteRoom = async(roomId) => {
        console.log(roomId)
        return new Promise((resolve, reject) => {
            con.query(`UPDATE rooms SET  isDeleted = true  WHERE id = '${roomId}'`, (error, result, fields) => {
                if(error) reject(error);
                resolve(result)
            })
        }).then((data) => {
            return data[0];
        })
    }

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