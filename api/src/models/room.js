import dotenv from 'dotenv'
import con from '../config/database.js'
import { v4 as uuidv4 } from 'uuid';
import MemberModel from './member.js';

dotenv.config('../../.env')
import EmployeeModel from './employee.js'

const RoomModel = class{
    id 
    name
    type
    created_by
    isDeleted
    members
    constructor(name,type , created_by, isDeleted, members){
        this.name = name;
        this.type = type;
        this.created_by = created_by; 
        this.isDeleted = isDeleted;
        this.members = members;
    }

    create = async () => {
      this.id = uuidv4()
        const query = `INSERT INTO rooms (id, name, type, created_by) 
          VALUES ('${this.id}', '${this.name}', '${this.type}', '${this.created_by}')`;
        con.query(query, async(error, result) => {
         await MemberModel.create(this.members, this.id);
          if (error) console.log(error);
          console.log(result.datatype);
          return result;
        });
        return null;
      };

      static getRoomsByUserId = async (userId, type) => {
        try {
          const query = `SELECT r.* FROM rooms r
                         INNER JOIN members m ON r.id = m.roomId
                         WHERE (m.memberId = '${userId}' OR r.created_by = '${userId}') AND r.type = '${type}'`;
          const fetchedRooms = await new Promise((resolve, reject) => {
            con.query(query, (error, result, fields) => {
              if (error) reject(error);
              resolve(result);
            });
          });
          
          const uniqueObjects = {};
          
          const filtered = fetchedRooms.filter((obj) => {
            if (!uniqueObjects[obj.id]) {
              uniqueObjects[obj.id] = true;
              return true;
            }
            return false;
          });
          return filtered;
        } catch (error) {
          throw error;
        }
      };
      
      
      static getAll = async (type, userId) => {
        try {
          const fetchedData = await new Promise((resolve, reject) => {
            con.query(`SELECT * FROM rooms WHERE isDeleted = false AND type = '${type}';`, (err, result, fields) => {
              if (err) reject(err);
              resolve(result);
            });
          });

          const extractedData = await Promise.all(fetchedData.map(async (data) => {
            const members = JSON.parse(data.members);
            const listMembers = MemberModel.getAll(data.id);
            const mapEmployeeToResponse = (employee) => {
                const { department,first_name, last_name, isActive
              ,id, role,email,  } = employee;
                return { department,first_name, last_name, isActive
              ,id,role, email};
              };
            if (members.includes(userId)) {
              const membersDetail = [];
              for (let index = 0; index < members.length; index++) {
                const member = await EmployeeModel.getSingle(members[index]);
                const mappedData = mapEmployeeToResponse(member);
                console.log(mappedData);
                membersDetail.push(mappedData);
              }
              data.membersDetail = membersDetail;
              return data;
            }
          }));
      
          return extractedData;
        } catch (error) {
          throw error;
        }
      };
      

    static getSingle = async (roomId) => {
       return new Promise((resolve, reject) => {
        con.query(`SELECT DISTINCT r.name, r.created_by, e.id, e.first_name, e.last_name, e.phone_num, e.email, e.department, e.isActive, e.isDeleted, e.role FROM employees AS e INNER JOIN members AS m ON m.memberId = e.id INNER JOIN rooms AS r ON m.roomId = r.id WHERE m.roomId = '${roomId}' AND m.isLeaved = false;
        `, (err, result, fields) => {
         if (err) reject(err);
         resolve(result);
       });
      
   }).then((data) => {
    console.log("get single room fetch from the model")
    console.log(data)
    // data.roomId = roomId;
     return data
 });
 }

     updateRoom = async(roomId) => {
        return new Promise((resolve, reject) => {
            con.query(`UPDATE rooms SET  name = '${this.name}', type = '${this.type}', members = '${JSON(this.members)}', WHERE id = '${roomId}'`, (error, result, fields) => {
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