import dotenv from 'dotenv'
import con from '../config/database.js'
import { v4 as uuidv4 } from 'uuid';
dotenv.config('../../.env')
import EmployeeModel from './employee.js'

const MemberModel = class{
    roomId 
    memberId
    isLeaved
    joined_at 
    leave_at
    constructor(roomId,memberId , isLeaved, joined_at, leave_at){
        this.roomId = roomId;
        this.memberId = memberId;
        this.isLeaved = isLeaved; 
        this.joined_at = joined_at;
        this.leave_at = leave_at;
    }

        static create = async (memberList, newRoomId) => {
        const jsonArray = JSON.parse(memberList)
        const insertPromises = jsonArray.map((memberId) => {
          return new Promise((resolve, reject) => {
            const query = `INSERT INTO members (roomId, memberId, joined_at) 
                           VALUES ('${newRoomId}', '${memberId}', CURRENT_TIMESTAMP)`;
            con.query(query, (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            });
          });
        });
      
        try {
          const results = await Promise.all(insertPromises);
          console.log(results); // Array of insert results
          return results;
        } catch (error) {
          console.error(error);
          return null;
        }
      };
      
      
      static getAll = async (roomId) => {
        console.log('static getAll = asyn')
        console.log(roomId)
        try {
          const fetchedData = await new Promise((resolve, reject) => {
            con.query(`SELECT DISTINCT e.id, e.first_name, e.last_name, e.phone_num, e.email, e.department, e.isActive, e.isDeleted, e.role
            FROM employees AS e
            INNER JOIN members AS m ON m.roomId = '${roomId}' AND m.isLeaved = false;
            `, (err, result, fields) => {
              if (err) reject(err);
              resolve(result);
            });
          });
          console.log(fetchedData)
          return fetchedData;
        } catch (error) {
          throw error;
        }
      };
      
      static addMember = async (roomId, memberId) => {
        try {
          const query = `INSERT INTO members (roomId, memberId, joined_at) VALUES ('${roomId}', '${memberId}', CURRENT_TIMESTAMP)`;
      
          const result = await new Promise((resolve, reject) => {
            con.query(query, (error, result, fields) => {
              if (error) reject(error);
              resolve(result);
            });
          });
      
          return result;
        } catch (error) {
          throw error;
        }
      };
      

      static getSingle = async (roomId, memberID) => {
        try {
          const fetchedData = await new Promise((resolve, reject) => {
            con.query(`SELECT * FROM members WHERE roomId='${roomId}' AND memberId='${memberID}'`, (err, result, fields) => {
              if (err) reject(err);
              resolve(result[0]);
            });
          });
      
          return fetchedData;
        } catch (error) {
          throw error;
        }
      };
      
      
     static updateRoom = async (roomId, memberId, isLeaved) => {
        try {
          const updateQuery = `UPDATE members SET isLeaved = ${isLeaved} WHERE roomId = '${roomId}' AND memberId = '${memberId}'`;
      
          const updatedData = await new Promise((resolve, reject) => {
            con.query(updateQuery, (error, result, fields) => {
              if (error) reject(error);
              resolve(result);
            });
          });
      
          return updatedData;
        } catch (error) {
          throw error;
        }
      };

}

export default MemberModel;

export const createdMembersTable = () => {
    
    con.query(`USE ${process.env.MYSQL_DB};`, (error, result, failed) => {
            if(error) throw error;
            return con.query(`CREATE TABLE IF NOT EXISTS members(
                roomId VARCHAR(50) NOT NULL, 
                memberId VARCHAR(50),
                isLeaved BOOLEAN DEFAULT false,
                joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                leave_at DATETIME,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (roomId) REFERENCES rooms(id),
                FOREIGN KEY (memberId) REFERENCES employees(id)
            );`, (err, res, failed) => {

                if(err) throw err;
                return res;
            })
    })   
}