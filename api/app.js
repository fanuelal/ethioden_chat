import apiRoutes from './src/routes/index.js'
import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import authorize from './src/auth/authorization.js';
import { authenticate } from './src/auth/authenticate.js';
import { createdEmployeeTable } from './src/models/employee.js';
import { createdChatTable } from './src/models/chat.js'
import {createdRoomTable} from './src/models/room.js'
dotenv.config()
const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to EthioDen API')
})


app.post('/api/v1/auth', authenticate)
// authorize
app.use('/api/v1/', apiRoutes)
// sequelize.sync()
const PORT = process.env.PORT

app.listen(PORT, () => {
    createdEmployeeTable();
    createdRoomTable();
    createdChatTable();
    console.log(`server is running on ${PORT}`)
})