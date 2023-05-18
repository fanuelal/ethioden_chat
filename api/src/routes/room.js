import express from 'express'
import {  createRoom, deleteRoom, getAllRooms , getSingleRoom, updateRoom} from '../controllers/room.js'
const router = express.Router()

router.get('/', getAllRooms)
router.get('/:id', getSingleRoom)
router.post('/', createRoom)
router.patch('/:id', updateRoom)
router.delete('/:id', deleteRoom)

export default router;