import dotenv from "dotenv";
import con from "../config/database.js";
import { v4 as uuidv4 } from "uuid";
import { passwordEncryptor } from "../helper/encrypted.js";
dotenv.config("../../.env");

const ChatModel = class {
  id;
  text;
  inRoom;
  roomId;
  reciverId;
  senderId;
  isDeleted;
  constructor(text, inRoom, roomId, reciverId, senderId, isDeleted) {
    // this.id = id;
    this.text = text;
    this.inRoom = inRoom;
    this.roomId = roomId;
    this.reciverId = reciverId;
    this.senderId = senderId;
    this.isDeleted = isDeleted;
    this.isDeleted = isDeleted;
  }

  create = async () => {
    const chatId = uuidv4();
    let query = ``
    if(this.reciverId != null){
       query = `INSERT INTO chats ( id, text, inRoom,reciverId, senderId) 
      VALUES ('${chatId}', '${this.text}', '${this.inRoom}','${this.reciverId}', '${this.senderId}')`;

    }else if(this.roomId != null){
       query = `INSERT INTO chats ( id, text, inRoom, roomId, senderId) 
      VALUES ('${chatId}', '${this.text}', '${this.inRoom}','${this.roomId}', '${this.senderId}')`;

    }
   
    con.query(query, (error, result, failed) => {
      if (error) throw error;
      console.log(result.datatype);
      return chatId;
    });
    return null;
  };
  static getLast = async (senderId, reciverId) => {
    const query = `SELECT * FROM chats WHERE isDeleted = false AND ((senderId = '${senderId}' AND reciverId = '${reciverId}') OR (senderId = '${reciverId}' AND reciverId = '${senderId}')) ORDER BY created_at DESC LIMIT 1`;
    return new Promise((resolve, reject) => {
      con.query(query, (err, result, fields) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  };
  static getChannelChat = async (roomId) => {
    const query = `SELECT * FROM chats WHERE isDeleted = false AND inRoom = true AND roomId = '${roomId}' ORDER BY created_at`;
  
    return new Promise((resolve, reject) => {
      con.query(query, (err, result, fields) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  };
  
  
  
  
  static getAll = async (senderId, reciverId) => {
    let query = `SELECT * FROM chats WHERE isDeleted = false`;

    if (senderId && reciverId) {
      query = `SELECT * FROM chats WHERE isDeleted = false AND inRoom = false AND ((senderId = '${senderId}' AND reciverId = '${reciverId}') OR (senderId = '${reciverId}' AND reciverId = '${senderId}')) ORDER BY created_at`;
    }

    return new Promise((resolve, reject) => {
      con.query(query, (err, result, fields) => {
        if (err) reject(err);
        resolve(result);
      });
    }).then((value) => {
      return value;
    });
  };

  static getSingle = async (chatId) => {
    console.log(chatId);
    return new Promise((resolve, reject) => {
      con.query(
        `SELECT * FROM chats WHERE id='${chatId}' AND isDeleted = 'false'`,
        (err, result, fields) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    }).then((data) => {
      return data;
    });
  };

  updateChat = async (chatId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `UPDATE chats SET  text = '${this.text}'  WHERE id = '${chatId}'`,
        (error, result, fields) => {
          if (error) reject(error);
          resolve(result);
        }
      );
    }).then((data) => {
      return data[0];
    });
  };

  static deleteChat = async (chatId) => {
    console.log(chatId);
    return new Promise((resolve, reject) => {
      con.query(
        `UPDATE chats SET  isDeleted = true  WHERE id = '${chatId}'`,
        (error, result, fields) => {
          if (error) reject(error);
          resolve(result);
        }
      );
    }).then((data) => {
      return data[0];
    });
  };
};

export const createdChatTable = () => {
  con.query(`USE ${process.env.MYSQL_DB};`, (error, result, failed) => {
    if (error) throw error;
    return con.query(
      `CREATE TABLE IF NOT EXISTS chats(
                id VARCHAR(50) PRIMARY KEY NOT NULL, 
                text VARCHAR(5000),
                inRoom BOOLEAN DEFAULT false,
                roomId VARCHAR(50),
                reciverId VARCHAR(50),
                senderId VARCHAR(50),
                isDeleted BOOLEAN DEFAULT false, 
                FOREIGN KEY (roomId) REFERENCES rooms(id),
                FOREIGN KEY (reciverId) REFERENCES employees(id),
                FOREIGN KEY (senderId) REFERENCES employees(id),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );`,
      (err, res, failed) => {
        if (err) throw err;
        console.log("table has been created");
        console.log(res);
        return res;
      }
    );
  });
};

export default ChatModel;
