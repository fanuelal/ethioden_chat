import express from 'express'
import { getAllChats, createChat  } from '../controllers/chat.js'
const router = express.Router()

router.get('/', getAllChats)
router.post('/', createChat)


export default router;