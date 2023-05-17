import express from 'express'
import { getAllChats, createChat, getSingleChat, updateChat,  deleteChat} from '../controllers/chat.js'
const router = express.Router()

router.get('/', getAllChats)
router.get('/:id', getSingleChat)
router.post('/', createChat)
router.patch('/:id', updateChat)
router.delete('/:id', deleteChat)

export default router;