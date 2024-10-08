import dotenv from 'dotenv'
import con from '../config/database.js'
import { v4 as uuidv4 } from 'uuid';
dotenv.config('../../.env')


const StatusModel = class{
    id
    userId
    label
    ends_at
    isDeleted
    constructor(label, ends_at, userId, isDeleted){
        this.label = label;
        this.ends_at = ends_at; 
        this.userId = userId;
        this.isDeleted = isDeleted;
    }

     create = async() => {
        
        const query = `INSERT INTO status ( id, userId, label, ends_at) 
               VALUES ('${uuidv4()}', '${this.userId}', '${this.label}','${this.ends_at}')`;
        con.query(query, (error, result, failed) => {
            if(error) throw(error)
            console.log(result.datatype)
            return result
        });
        return null;
    }

    static getAll = async () => {
           var fetchedData; 
          return new Promise((resolve, reject) => {con.query('SELECT * FROM `status` WHERE isDeleted = false', (err, result, fields) => {
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

    static getSingle = async (userID) => {
        console.log(userID)
       return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM status WHERE userId='${userID}' AND isDeleted = 'false'`, (err, result, fields) => {
         if (err) reject(err);
         resolve(result);
       });
      
   }).then((data) => {
     return data
 });
 }

     updateStatus = async(statusId) => {
        return new Promise((resolve, reject) => {
            con.query(`UPDATE status SET  label = '${this.label}', ends_at = '${this.ends_at}'  WHERE id = '${statusId}'`, (error, result, fields) => {
                if(error) reject(error);
                resolve(result)
            })
        }).then((data) => {
            return data;
        })
    }

    static deleteStatus = async(statusId) => {
        console.log(statusId)
        return new Promise((resolve, reject) => {
            con.query(`UPDATE status SET  isDeleted = true  WHERE id = '${statusId}'`, (error, result, fields) => {
                if(error) reject(error);
                resolve(result)
            })
        }).then((data) => {
            return data[0];
        })
    }

}



export default StatusModel;

export const createdStatusTable = () => {
    
    con.query(`USE ${process.env.MYSQL_DB};`, (error, result, failed) => {
            if(error) throw error;
            return con.query(`CREATE TABLE IF NOT EXISTS status(
                id VARCHAR(50) PRIMARY KEY NOT NULL, 
                userId VARCHAR(50),
                label VARCHAR(50),
                ends_at DATETIME,
                isDeleted BOOLEAN DEFAULT false,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES employees(id)
            );`, (err, res, failed) => {

                if(err) throw err;
                console.log("status tabel has been created")
                return res;
            })
    })
    
}